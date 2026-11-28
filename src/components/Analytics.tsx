"use client";

/**
 * Consent choice plus Google Analytics events. Renders nothing, and never loads Google, except on the
 * production address (see src/lib/analytics.ts).
 *
 * Events: generate_lead (a form reached /thanks), click_email, cta_click (primary buttons, marked
 * data-cta="primary"), and the demo's demo_start and demo_complete (sent from MapleDemo). Page views come from
 * gtag's own page_view and its history-change page views for in-app navigation.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  OPEN_CONSENT_EVENT,
  analyticsAllowedHere,
  clearLead,
  pendingLead,
  readConsent,
  rememberLead,
  startAnalytics,
  stopAnalytics,
  storeConsent,
  track,
  type Consent,
} from "@/lib/analytics";

const where = (el: Element) => (el.closest("header, nav") ? "nav" : el.closest("footer") ? "footer" : "page");

function destination(href: string) {
  if (/^https?:/i.test(href)) {
    try {
      const u = new URL(href);
      return u.hostname === window.location.hostname ? u.pathname + u.search : u.hostname.replace(/^www\./, "");
    } catch {
      return "external";
    }
  }
  return href.split("#")[0] || "/";
}

export default function Analytics() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [focusOnOpen, setFocusOnOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!analyticsAllowedHere()) return;
    setActive(true);
    const saved = readConsent();
    setConsent(saved);
    setOpen(saved === null);
    if (saved === "granted") startAnalytics();

    const onSubmit = (e: Event) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement) || !form.dataset.leadForm || readConsent() === "denied") return;
      if (form.querySelector<HTMLInputElement>('input[name="_honey"]')?.value) return;
      const service = form.querySelector<HTMLInputElement>('input[name="service"]')?.value || form.dataset.leadForm;
      rememberLead(form.dataset.leadForm, service);
    };
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("mailto:")) track("click_email", { link_location: where(a) });
      else if (href.startsWith("tel:")) track("click_phone", { link_location: where(a) });
      else if (a.dataset.cta === "primary")
        track("cta_click", {
          cta_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
          cta_destination: destination(href),
          cta_location: where(a),
        });
    };
    const reopen = () => {
      setFocusOnOpen(true);
      setOpen(true);
    };
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  // A form was sent and FormSubmit brought the visitor here: count it once, or drop it if analytics is declined.
  useEffect(() => {
    if (!active || pathname !== "/thanks") return;
    const lead = pendingLead();
    if (!lead) return;
    if (consent === "granted") {
      track("generate_lead", { form_type: lead.form, service: lead.service });
      clearLead();
    } else if (consent === "denied") clearLead();
  }, [active, pathname, consent]);

  useEffect(() => {
    if (open && focusOnOpen) firstButton.current?.focus();
  }, [open, focusOnOpen]);

  const choose = (c: Consent) => {
    storeConsent(c);
    if (c === "granted") startAnalytics();
    else stopAnalytics();
    setConsent(c);
    setOpen(false);
    setFocusOnOpen(false);
  };

  if (!active || !open) return null;
  return (
    <div
      role="region"
      aria-label="Analytics choice"
      className="fixed z-[70] inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
    >
      <div className="bg-white ring-1 ring-line rounded-[28px] p-5 sm:p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]">
        <p className="text-[14px] leading-[1.5] text-ink-2">
          <strong className="font-semibold text-ink">Can we use Google Analytics?</strong> It shows us which pages and
          buttons get used. It never gets your name, email or anything you type, and it stays off unless you allow it.{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-3 hover:text-red">
            Privacy
          </Link>
        </p>
        {consent && (
          <p className="mt-2 text-[14px] text-ink-2">Right now it&apos;s {consent === "granted" ? "on" : "off"}.</p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button ref={firstButton} type="button" className="pill pill-sm pill-ghost" onClick={() => choose("granted")}>
            Allow
          </button>
          <button type="button" className="pill pill-sm pill-ghost" onClick={() => choose("denied")}>
            Don&apos;t allow
          </button>
        </div>
      </div>
    </div>
  );
}
