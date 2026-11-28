/**
 * Google Analytics 4, consent first.
 *
 * - Runs only on the production address (www.capitalsites.ca). Local builds, the netlify.app address, deploy
 *   previews and branch deploys never load it. Tests can widen the list at build time with
 *   NEXT_PUBLIC_ANALYTICS_HOSTS (comma-separated hostnames).
 * - Nothing loads from Google until the visitor chooses Allow. "Don't allow" loads nothing and sets no cookies.
 * - Advertising features are off: no Google signals, no ad personalization, ad storage denied.
 * - Events carry fixed labels only (form type, service slug, button text, demo name). Never names, email
 *   addresses, phone numbers or anything typed into a form or the demo.
 */
export const GA_ID = "G-C5722KERH0";
export const CONSENT_KEY = "cs-analytics-consent-v1";
/** Fired on window to reopen the consent choice (the footer's Cookie settings button). */
export const OPEN_CONSENT_EVENT = "cs:open-consent";

const LEAD_KEY = "cs-pending-lead";
const LEAD_TTL_MS = 30 * 60 * 1000;
const COOKIE_DAYS = 395; // about 13 months, instead of Google's default of 2 years

const HOSTS = (process.env.NEXT_PUBLIC_ANALYTICS_HOSTS || "www.capitalsites.ca")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

export type Consent = "granted" | "denied";
type Params = Record<string, string | number>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export const analyticsAllowedHere = () => typeof window !== "undefined" && HOSTS.includes(window.location.hostname);

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(v: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
}

let started = false;

/** Loads gtag.js once. Call only after the visitor has allowed analytics. */
export function startAnalytics() {
  if (!analyticsAllowedHere()) return;
  window[`ga-disable-${GA_ID}`] = false;
  if (started) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  const g = window.gtag;
  g("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  // Set globally, before config: gtag.js ignores cookie_expires when it is passed only in config.
  const fields = { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: COOKIE_DAYS * 24 * 60 * 60 };
  g("set", fields);
  g("js", new Date());
  g("config", GA_ID, fields);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Stops sending and removes the Google Analytics cookies (_ga, _ga_*). */
export function stopAnalytics() {
  window[`ga-disable-${GA_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", `; domain=${host}`, `; domain=.${host}`];
  for (let i = 1; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"))
    .forEach((n) => domains.forEach((d) => (document.cookie = `${n}=; Max-Age=0; path=/${d}`)));
}

export function track(name: string, params: Params = {}) {
  if (!started || window[`ga-disable-${GA_ID}`] || readConsent() !== "granted" || !window.gtag) return;
  window.gtag("event", name, params);
}

/* A lead counts only when the visitor reaches /thanks, which FormSubmit sends them to after accepting the
   form. The note below says which form was sent (never its contents) and lives in this tab only. */
export function rememberLead(form: string, service: string) {
  try {
    window.sessionStorage.setItem(LEAD_KEY, JSON.stringify({ form, service, at: Date.now() }));
  } catch {
    /* storage blocked: the lead simply isn't counted */
  }
}

export function pendingLead(): { form: string; service: string } | null {
  try {
    const raw = window.sessionStorage.getItem(LEAD_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { form?: unknown; service?: unknown; at?: unknown };
    if (typeof v.form !== "string" || typeof v.service !== "string" || typeof v.at !== "number" || Date.now() - v.at > LEAD_TTL_MS) {
      window.sessionStorage.removeItem(LEAD_KEY);
      return null;
    }
    return { form: v.form, service: v.service };
  } catch {
    return null;
  }
}

export function clearLead() {
  try {
    window.sessionStorage.removeItem(LEAD_KEY);
  } catch {
    /* nothing to clear */
  }
}
