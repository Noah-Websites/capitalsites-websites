"use client";

/*
 * Maple Home Services (fictional): the CapitalSites operations demo.
 *
 * Client-only and lazy-loaded. Everything lives in memory in this component: no fetch, no XHR,
 * no form action, no storage. Inputs have no `name` attributes and every submit handler calls
 * preventDefault first, so nothing typed here can leave the browser. The workflow logic is
 * src/lib/ops-core.js, unchanged; this file only drives it and draws it.
 */

import { useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import OpsCore, {
  type BookingConfig,
  type FollowUpRules,
  type Lead,
  type OpsConfig,
  type OpsState,
  type RawEnquiry,
  type SyncState,
} from "@/lib/ops-core";

const C = OpsCore;
const TZ = "America/Toronto";
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const START = Date.parse("2026-11-30T14:00:00Z"); // Monday 9:00 a.m. in Toronto

/* ---------- fictional configuration (synthetic data, example.com addresses, delivery simulated) ---------- */

const SERVICES = ["Plumbing", "HVAC", "Electrical", "Landscaping", "General estimate"];
const BOOKING: BookingConfig = {
  timezone: TZ,
  durationMin: 60,
  bufferMin: 30,
  leadTimeHours: 12,
  horizonDays: 30,
  hours: {
    "1": [["08:00", "17:00"]],
    "2": [["08:00", "17:00"]],
    "3": [["08:00", "17:00"]],
    "4": [["08:00", "17:00"]],
    "5": [["08:00", "16:00"]],
    "6": [["09:00", "12:00"]],
  },
};
const RULES: FollowUpRules = {
  firstResponseHours: 4,
  quoteReminderDays: [3, 7],
  quoteExpiryDays: 30,
  customerFacing: false,
  approvals: { customerMessaging: false },
};
const CFG: OpsConfig = {
  businessName: "Maple Home Services (fictional)",
  ownerEmail: "owner@example.com",
  defaultOwner: "Owner",
  timezone: TZ,
  registerUrl: "https://example.com/request-list",
  firstResponseHours: 4,
  duplicateWindowHours: 72,
  form: {
    services: SERVICES,
    serviceAreaFsa: [
      "K1A", "K1B", "K1C", "K1G", "K1H", "K1J", "K1K", "K1L", "K1M", "K1N", "K1P", "K1R", "K1S", "K1T", "K1V", "K1Y",
      "K1Z", "K2A", "K2B", "K2C", "K2E", "K2G", "K2H", "K2J", "K2K", "K2L", "K2M", "K2P", "K2R", "K2S", "K2T", "K2V", "K2W",
    ],
    requirePostal: true,
    requireContactPermission: true,
    maxMessageLength: 2000,
  },
  booking: BOOKING,
  followUps: RULES,
};

type Sample = { label: string; outcome: string; raw: RawEnquiry };
const SAMPLES: Sample[] = [
  {
    label: "Plumbing request",
    outcome: "New request",
    raw: { name: "Priya Sample", email: "priya@example.com", phone: "613-555-0101", service: "Plumbing", postal_code: "K2P 1L4", urgency: "soon", message: "Kitchen tap dripping, shut-off valve stuck", contact_permission: "yes" },
  },
  {
    label: "HVAC emergency",
    outcome: "New request, 1-hour reply window",
    raw: { name: "Marc Exemple", email: "", phone: "(613) 555-0102", service: "HVAC", postal_code: "K1S 5B6", urgency: "emergency", message: "No heat, furnace not igniting", contact_permission: "yes" },
  },
  {
    label: "Electrical",
    outcome: "New request",
    raw: { name: "Dana Fictional", email: "dana@example.com", phone: "", service: "Electrical", postal_code: "K2B 7Z9", urgency: "normal", message: "Add two outdoor outlets", contact_permission: "yes" },
  },
  {
    label: "Landscaping",
    outcome: "New request",
    raw: { name: "Sam Placeholder", email: "sam@example.com", phone: "", service: "Landscaping", postal_code: "K2H 6A1", urgency: "normal", message: "Spring cleanup estimate", contact_permission: "yes" },
  },
  {
    label: "General estimate",
    outcome: "New request",
    raw: { name: "Lee Synthetic", email: "lee@example.com", phone: "613-555-0105", service: "General estimate", postal_code: "K1Y 2C3", urgency: "normal", message: "Basement bathroom estimate", contact_permission: "yes" },
  },
  {
    label: "Repeat from Priya, same job",
    outcome: "Same service within 72 hours: merges into Priya's row",
    raw: { name: "Priya Sample", email: "PRIYA@example.com", phone: "", service: "Plumbing", postal_code: "K2P 1L4", urgency: "emergency", message: "Now leaking onto the floor", contact_permission: "yes" },
  },
  {
    label: "Priya again, a different job",
    outcome: "Different service: a new row, linked as a returning customer",
    raw: { name: "Priya Sample", email: "priya@example.com", phone: "", service: "HVAC", postal_code: "K2P 1L4", urgency: "normal", message: "Furnace is making a rattling noise", contact_permission: "yes" },
  },
  {
    label: "Missing contact details",
    outcome: "Rejected",
    raw: { name: "No Contact", email: "", phone: "", service: "Plumbing", postal_code: "K2P 1L4", urgency: "normal", message: "Call me?", contact_permission: "yes" },
  },
  {
    label: "Outside the service area",
    outcome: "Rejected",
    raw: { name: "Far Away", email: "far@example.com", phone: "", service: "HVAC", postal_code: "M5V 2T6", urgency: "normal", message: "Job outside the area", contact_permission: "yes" },
  },
  {
    label: "Spam bot",
    outcome: "Filtered silently",
    raw: { name: "Buy Now", email: "bot@example.com", phone: "", service: "Plumbing", postal_code: "K2P 1L4", urgency: "normal", message: "Cheap followers, click here", contact_permission: "yes", company_website: "http://spam.example.com" },
  },
];

const ERR: Record<string, string> = {
  NAME_REQUIRED: "Please add your name.",
  NAME_TOO_LONG: "Please shorten the name.",
  CONTACT_REQUIRED: "Add an email or a phone number so we can reach you.",
  EMAIL_INVALID: "That email address looks incomplete.",
  PHONE_INVALID: "Use a 10-digit phone number, for example 613-555-0100.",
  SERVICE_INVALID: "Pick a service from the list.",
  POSTAL_INVALID: "Use a Canadian postal code, for example K2P 1L4.",
  OUTSIDE_SERVICE_AREA: "Sorry, that postal code is outside our service area.",
  POSTAL_REQUIRED: "Add your postal code so we know where the job is.",
  URGENCY_INVALID: "Pick how soon you need this.",
  MESSAGE_TOO_LONG: "Please keep the description under 2,000 characters.",
  CONTACT_PERMISSION_REQUIRED: "Tick the box so we can contact you about this request.",
  SUBMITTED_AT_INVALID: "The request time was missing.",
  SUBMISSION_ID_MISSING: "The request had no ID.",
};
const URGENCY: Record<string, string> = { normal: "No rush", soon: "This week", emergency: "Emergency" };

/* ---------- in-memory world ---------- */

type Mode = "ok" | "TRANSIENT" | "PERMISSION";
type World = {
  S: OpsState;
  now: number;
  seq: number;
  testSeq: number;
  dest: Record<string, Lead>;
  sync: SyncState;
  log: { at: number; text: string }[];
  mailMode: Mode;
  lastForm: RawEnquiry | null;
  lastCheck: string[];
};

const iso = (ms: number) => new Date(ms).toISOString();

function mailer(w: World) {
  return {
    send() {
      if (w.mailMode !== "ok") {
        const e = new Error(`simulated ${w.mailMode === "PERMISSION" ? "permission revoked" : "mail outage"}`) as Error & { code?: string };
        e.code = w.mailMode;
        throw e;
      }
      // Simulated delivery: the alert stays in the on-page outbox. Nothing is sent.
    },
  };
}

function writeLog(w: World, text: string) {
  w.log.unshift({ at: w.now, text });
  w.log = w.log.slice(0, 40);
}

/** What the 5-minute processor does in a real setup: follow-up rules, then alert delivery. */
function tick(w: World) {
  const fu = C.evaluateFollowUps(w.S, RULES, CFG, w.now);
  const d = C.dispatchNotifications(w.S, mailer(w), w.now, { maxAttempts: 5, backoffMinutes: 5 });
  w.S.lastRunAt = iso(w.now);
  return { fu, d };
}

function submit(w: World, raw: RawEnquiry) {
  raw.submission_id = raw.submission_id || `demo-${++w.seq}`;
  raw.submitted_at = iso(w.now);
  const r = C.processSubmission(w.S, raw, CFG, w.now);
  const t = tick(w);
  let msg: string;
  if (r.action === "created" && r.lead && r.lead.related_lead_id)
    msg = `Returning customer, new job: ${r.lead.customer_name} (${r.lead.service_category}) added as a new row, linked to their earlier request. Owner alert queued.`;
  else if (r.action === "created" && r.lead) msg = `New request from ${r.lead.customer_name} (${r.lead.service_category}, ${URGENCY[r.lead.urgency] ?? r.lead.urgency}) added to the list. Owner alert queued.`;
  else if (r.action === "duplicate" && r.lead)
    msg = `Repeat request from ${r.lead.customer_name} for the same service merged into their existing row; the new message is kept in the notes. No second alert${r.lead.urgency === "emergency" ? ", but it was escalated to an emergency" : ""}.`;
  else if (r.action === "rejected") msg = `Rejected: ${(r.errors ?? []).map((e) => ERR[e] ?? e).join(" ")} Logged without personal details; no alert.`;
  else if (r.action === "spam") msg = "Spam filtered: a hidden field was filled in. Dropped silently.";
  else msg = "Already received: the identical submission was ignored.";
  if (t.d.sent) msg += ` ${t.d.sent} alert${t.d.sent === 1 ? "" : "s"} delivered to the simulated outbox.`;
  if (t.d.dead) msg += ` ${t.d.dead} alert${t.d.dead === 1 ? "" : "s"} failed.`;
  writeLog(w, msg);
  return r;
}

function makeWorld(): World {
  const w: World = {
    S: { leads: [], processed: {}, rejected: [], outbox: [], quotes: [], bookings: [] },
    now: START,
    seq: 0,
    testSeq: 0,
    dest: {},
    sync: {},
    log: [],
    mailMode: "ok",
    lastForm: null,
    lastCheck: [],
  };
  w.S.lastRunAt = iso(w.now);
  // Open in a realistic working state: the first five sample requests, 11 minutes apart.
  SAMPLES.slice(0, 5).forEach((s) => {
    submit(w, { ...s.raw });
    w.now += 11 * MINUTE;
  });
  return w;
}

/* ---------- formatting ---------- */

const dateTimeFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const timeFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" });
const fmt = (t: number | string) => (t ? dateTimeFmt.format(new Date(t)) : "");
const fmtTime = (t: number | string) => timeFmt.format(new Date(t));
const money = (n: number) => `$${n.toLocaleString("en-CA")}`;
/** 6135550102 -> 613-555-0102 (display only; ops-core stores digits). */
const phone = (digits: string) => (/^\d{10}$/.test(digits) ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : digits);

/* ---------- small UI pieces in the site's language ---------- */

type Tone = "neutral" | "ok" | "warn" | "bad";
function Tag({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  const cls =
    tone === "ok" ? "status-ok" : tone === "warn" ? "status-warn" : tone === "bad" ? "status-bad" : "bg-white text-ink ring-1 ring-line";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap ${cls}`}>{children}</span>;
}

function Panel({ title, intro, children, className = "" }: { title: string; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-snow p-5 md:p-6 min-w-0 ${className}`}>
      <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{title}</h3>
      {intro && <p className="text-[14px] text-ink-2 mt-1 leading-[1.5]">{intro}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Result({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <p className={`mt-4 rounded-xl px-4 py-3 text-[15px] leading-[1.45] ${tone === "neutral" ? "bg-white ring-1 ring-line" : `status-${tone}`}`}>
      {children}
    </p>
  );
}

const leadTone = (s: string): Tone => (s === "New" ? "warn" : s === "Won" ? "ok" : s === "Lost" ? "bad" : "neutral");
const LEAD_STATUSES = ["New", "Contacted", "Booked", "Quoted", "Won", "Lost"];

/* ---------- the demo ---------- */

const TABS = [
  { id: "enquiry", label: "Enquiry form" },
  { id: "requests", label: "Requests and alerts" },
  { id: "schedule", label: "Scheduling" },
  { id: "quotes", label: "Quotes" },
  { id: "health", label: "Sync and health" },
] as const;
type TabId = (typeof TABS)[number]["id"];

type FormState = { name: string; service: string; email: string; phone: string; postal: string; urgency: string; message: string; ok: boolean };
const START_FORM: FormState = {
  name: "Jordan Example",
  service: "Electrical",
  email: "jordan@example.com",
  phone: "",
  postal: "K1S 5B6",
  urgency: "soon",
  message: "Replace a breaker panel in a detached garage",
  ok: true,
};

export default function MapleDemo() {
  const [world, setWorld] = useState<World>(() => makeWorld());
  const [, setVersion] = useState(0);
  const [tab, setTab] = useState<TabId>("enquiry");
  const [announce, setAnnounce] = useState("");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const w = world;
  const S = w.S;

  const refresh = (message?: string) => {
    if (message) setAnnounce(message);
    setVersion((v) => v + 1);
  };

  /* ----- enquiry form ----- */
  const [form, setForm] = useState<FormState>(START_FORM);
  const [formResult, setFormResult] = useState<{ tone: Tone; text: string } | null>(null);
  const raw = (): RawEnquiry => ({
    name: form.name,
    email: form.email,
    phone: form.phone,
    service: form.service,
    postal_code: form.postal,
    urgency: form.urgency,
    message: form.message,
    contact_permission: form.ok ? "yes" : "no",
  });
  const showResult = (r: ReturnType<typeof submit>) => {
    if (r.action === "created" && r.lead)
      setFormResult({
        tone: "ok",
        text: `Thanks, ${r.lead.customer_name.split(" ")[0]}. Your request was received. (Owner's view: a new row in the list${r.lead.related_lead_id ? ", linked to this customer's earlier request" : ""} and an alert in the outbox.)`,
      });
    else if (r.action === "duplicate") setFormResult({ tone: "neutral", text: "Thanks, we already have your request and added this to it. (Owner's view: same service within 72 hours, so it merged into the same row and the message was kept in the notes.)" });
    else if (r.action === "ignored") setFormResult({ tone: "neutral", text: "Already received. (Owner's view: the identical submission was ignored.)" });
    else if (r.action === "spam") setFormResult({ tone: "ok", text: "Thanks, your request was received. (Owner's view: spam was dropped silently.)" });
    else setFormResult({ tone: "bad", text: (r.errors ?? []).map((e) => ERR[e] ?? e).join(" ") });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // nothing is ever submitted anywhere
    const data = raw();
    const r = submit(w, data);
    w.lastForm = data;
    showResult(r);
    refresh(w.log[0]?.text);
  };
  const resubmit = () => {
    if (!w.lastForm) {
      setFormResult({ tone: "neutral", text: "Send the form once first." });
      return;
    }
    const r = submit(w, { ...w.lastForm });
    showResult(r);
    refresh(w.log[0]?.text);
  };
  const runSample = (s: Sample) => {
    submit(w, { ...s.raw });
    refresh(w.log[0]?.text);
  };

  /* ----- clock ----- */
  const advance = (minutes: number, label: string) => {
    w.now += minutes * MINUTE;
    const t = tick(w);
    const bits: string[] = [];
    if (t.fu.reminders.length) bits.push(`${t.fu.reminders.length} reminder${t.fu.reminders.length === 1 ? "" : "s"} due`);
    if (t.fu.expired.length) bits.push(`${t.fu.expired.length} quote${t.fu.expired.length === 1 ? "" : "s"} expired`);
    if (t.d.sent) bits.push(`${t.d.sent} alert${t.d.sent === 1 ? "" : "s"} delivered to the simulated outbox`);
    if (t.d.dead) bits.push(`${t.d.dead} alert${t.d.dead === 1 ? "" : "s"} failed`);
    writeLog(w, `Clock moved ${label}: ${bits.length ? bits.join(", ") : "nothing due"}.`);
    w.lastCheck = [
      `Checked: ${fmt(w.now)}`,
      `Reminders due: ${t.fu.reminders.length ? t.fu.reminders.map(describeKey).join("; ") : "none"}`,
      `Expired: ${t.fu.expired.length ? t.fu.expired.join(", ") : "none"}`,
      `Stopped: ${t.fu.suppressed.length ? t.fu.suppressed.map((s) => `${s.id} (${describeReason(s.reason)})`).join("; ") : "none"}`,
    ];
    refresh(w.log[0].text);
  };
  const reset = () => {
    const fresh = makeWorld();
    setWorld(fresh);
    setForm(START_FORM);
    setFormResult(null);
    setBookResult(null);
    setQuoteResult(null);
    setSyncResult(null);
    setSyncMode("ok");
    setAnnounce("Demo reset. The five sample requests are loaded again.");
  };

  /* ----- register ----- */
  const setStatus = (L: Lead, next: string) => {
    const r = C.setLeadStatus(L, next, w.now);
    writeLog(w, r.ok ? `${L.customer_name}: status changed to ${next}.` : `Not allowed: ${L.status} to ${next}.`);
    refresh(w.log[0].text);
  };
  const setOptOut = (L: Lead, on: boolean) => {
    L.opt_out = on;
    L.updated_at = iso(w.now);
    writeLog(w, on ? `${L.customer_name} opted out: follow-up reminders stop.` : `${L.customer_name}: opt-out removed.`);
    refresh(w.log[0].text);
  };

  /* ----- booking ----- */
  const openLeads = S.leads.filter((L) => L.status !== "Won" && L.status !== "Lost");
  const [bookLead, setBookLead] = useState("");
  const bookLeadId = openLeads.some((L) => L.lead_id === bookLead) ? bookLead : openLeads[0]?.lead_id ?? "";
  const days = Array.from({ length: 10 }, (_, i) => {
    const date = C.formatLocal(w.now + (i + 1) * DAY, TZ).slice(0, 10);
    return { date, label: dayFmt.format(new Date(Date.parse(`${date}T17:00:00Z`))) };
  });
  const [day, setDay] = useState("");
  const dayValue = days.some((d) => d.date === day) ? day : days[0].date;
  const [y, m, d] = dayValue.split("-").map(Number);
  const from = C.localToUtcMs(y, m, d, 0, 0, TZ);
  const allSlots = C.listSlots(BOOKING, [], from, 1, 30, w.now);
  const freeSlots = new Set(C.listSlots(BOOKING, S.bookings, from, 1, 30, w.now));
  const [bookResult, setBookResult] = useState<{ tone: Tone; text: string } | null>(null);
  const bookSlot = (slot: string) => {
    if (!bookLeadId) {
      setBookResult({ tone: "neutral", text: "Add a request first." });
      return;
    }
    const r = C.book(BOOKING, S.bookings, { start: slot, lead_id: bookLeadId }, w.now);
    if (r.ok && r.booking) {
      const L = S.leads.find((l) => l.lead_id === bookLeadId);
      if (L && (L.status === "New" || L.status === "Contacted")) C.setLeadStatus(L, "Booked", w.now);
      setBookResult({ tone: "ok", text: `Booked ${fmt(r.booking.start)} for ${L?.customer_name ?? "the customer"}.` });
      writeLog(w, `Visit booked on ${fmt(r.booking.start)} for ${L?.customer_name ?? "the customer"}.`);
    } else {
      setBookResult({ tone: "bad", text: r.error === "CONFLICT" ? "Not booked: that time overlaps another visit or its travel buffer." : `Not booked: ${r.error}.` });
      writeLog(w, `Booking blocked: ${r.error === "CONFLICT" ? "conflict with another visit" : r.error}.`);
    }
    refresh(w.log[0].text);
  };
  const doubleBook = () => {
    const first = S.bookings.find((b) => b.status === "Confirmed");
    if (!first) {
      setBookResult({ tone: "neutral", text: "Book one visit first." });
      return;
    }
    const r = C.book(BOOKING, S.bookings, { start: Date.parse(first.start) + 30 * MINUTE, lead_id: bookLeadId }, w.now);
    setBookResult({
      tone: "bad",
      text: r.ok ? "Booked." : `Blocked: that time overlaps the ${fmt(first.start)} visit. The calendar never double-books.`,
    });
    writeLog(w, `Double-booking attempt blocked (${r.error ?? "ok"}).`);
    refresh(w.log[0].text);
  };
  const cancel = (id: string) => {
    const b = S.bookings.find((x) => x.booking_id === id);
    C.cancelBooking(S.bookings, id, w.now);
    writeLog(w, `Visit cancelled${b ? ` (${fmt(b.start)})` : ""}: the time is free again.`);
    setBookResult({ tone: "neutral", text: "Cancelled. That time is free again." });
    refresh(w.log[0].text);
  };

  /* ----- quotes ----- */
  const quotable = S.leads.filter((L) => L.status !== "Won" && L.status !== "Lost" && !L.quote_id);
  const [quoteLead, setQuoteLead] = useState("");
  const quoteLeadId = quotable.some((L) => L.lead_id === quoteLead) ? quoteLead : quotable[0]?.lead_id ?? "";
  const [amount, setAmount] = useState("1850");
  const [quoteResult, setQuoteResult] = useState<{ tone: Tone; text: string } | null>(null);
  const createQuote = () => {
    const L = S.leads.find((l) => l.lead_id === quoteLeadId);
    if (!L) {
      setQuoteResult({ tone: "neutral", text: "Every open request already has a quote. Add a request first." });
      return;
    }
    const r = C.createQuote(S.quotes, L, Number(amount), w.now);
    if (!r.ok || !r.quote) {
      setQuoteResult({ tone: "bad", text: "Enter an amount above zero." });
      return;
    }
    if (L.status === "New") C.setLeadStatus(L, "Contacted", w.now);
    C.setQuoteStatus(r.quote, L, "Sent", w.now);
    setQuoteResult({ tone: "ok", text: `Quote for ${L.customer_name} recorded as sent. Move the clock +3 days to see the owner's reminder.` });
    writeLog(w, `Quote of ${money(r.quote.amount)} recorded as sent to ${L.customer_name} (the owner sends the quote, not the system).`);
    refresh(w.log[0].text);
  };
  const decide = (qid: string, next: "Accepted" | "Declined") => {
    const q = S.quotes.find((x) => x.quote_id === qid);
    if (!q) return;
    const L = S.leads.find((l) => l.lead_id === q.lead_id);
    C.setQuoteStatus(q, L, next, w.now);
    writeLog(w, `Quote for ${L?.customer_name ?? q.lead_id} marked ${next}: follow-up reminders stop.`);
    refresh(w.log[0].text);
  };

  /* ----- sync and health ----- */
  const [syncMode, setSyncMode] = useState<Mode>("ok");
  const [syncResult, setSyncResult] = useState<{ tone: Tone; text: string } | null>(null);
  const runSync = () => {
    const adapter = {
      upsert(key: string, record: Lead) {
        if (syncMode !== "ok") {
          const e = new Error("simulated") as Error & { code?: string };
          e.code = syncMode;
          throw e;
        }
        w.dest[key] = JSON.parse(JSON.stringify(record)) as Lead; // the stand-in second app, in memory
      },
    };
    const r = C.syncRecords(S.leads, "lead_id", adapter, w.sync, w.now);
    const waiting = w.sync.queue?.length ?? 0;
    setSyncResult({
      tone: r.halted ? "bad" : r.failed ? "warn" : "ok",
      text: `Pushed ${r.pushed}, unchanged ${r.unchanged}, failed ${r.failed}.${r.halted ? " Stopped: access was revoked. The owner is alerted; fix access, then run it again." : ""}${waiting ? ` Waiting to retry: ${waiting}.` : ""}`,
    });
    writeLog(w, `Sync: pushed ${r.pushed}, unchanged ${r.unchanged}, failed ${r.failed}${r.halted ? " (stopped)" : ""}.`);
    refresh(w.log[0].text);
  };
  const setMailMode = (m: Mode) => {
    w.mailMode = m;
    refresh();
  };
  const testAlert = () => {
    w.testSeq += 1;
    C.queueNotification(
      w.S,
      `TEST:${w.testSeq}`,
      {
        to: CFG.ownerEmail ?? "owner@example.com",
        subject: "Test alert from the system health check",
        body: "This is a test alert. In a real setup it arrives in your own inbox.",
        audience: "internal",
      },
      w.now,
    );
    const d = C.dispatchNotifications(w.S, mailer(w), w.now, { maxAttempts: 5, backoffMinutes: 5 });
    w.S.lastRunAt = iso(w.now);
    writeLog(w, d.sent ? "Test alert delivered to the simulated outbox." : d.dead ? "Test alert failed: the alert channel is down." : "Test alert waiting to retry.");
    refresh(w.log[0].text);
  };
  const deliver = () => {
    const d = C.dispatchNotifications(w.S, mailer(w), w.now, { maxAttempts: 5, backoffMinutes: 5 });
    w.S.lastRunAt = iso(w.now);
    writeLog(w, `Alerts: delivered ${d.sent}, retrying ${d.retrying}, failed ${d.dead}.`);
    refresh(w.log[0].text);
  };
  const retryFailed = () => {
    const n = C.requeueDead(w.S, w.now);
    const d = C.dispatchNotifications(w.S, mailer(w), w.now, { maxAttempts: 5, backoffMinutes: 5 });
    w.S.lastRunAt = iso(w.now);
    writeLog(w, `${n} failed alert${n === 1 ? "" : "s"} retried: delivered ${d.sent}, failed ${d.dead}.`);
    refresh(w.log[0].text);
  };
  const health = C.healthReport(S, w.now, { heartbeatStaleMinutes: 30 });

  /* ----- tabs (keyboard: arrows, Home, End) ----- */
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next].id);
    const el = tabRefs.current[TABS[next].id];
    el?.focus();
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const leadName = (id: string) => S.leads.find((l) => l.lead_id === id)?.customer_name ?? id;

  return (
    <div className="card-tile bg-white ring-1 ring-line p-3 sm:p-6 md:p-8" data-testid="maple-demo">
      {/* Header and simulated clock */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="px-2 pt-2 sm:p-0">
          <h2 className="headline text-[32px] md:text-[36px]">Maple Home Services (fictional)</h2>
          <p className="text-[15px] text-ink-2 mt-1">
            A made-up home-service business with five sample requests already in. Move the clock to see what happens over days.
          </p>
        </div>
        <div className="rounded-2xl bg-snow px-4 py-3 w-full sm:w-auto" role="group" aria-label="Simulated clock">
          <p className="text-[13px] text-ink-2">
            Simulated time (Toronto) ·{" "}
            <span className="font-semibold text-ink tabular" data-testid="demo-clock">
              {fmt(w.now)}
            </span>
          </p>
          <div className="mt-2 grid grid-cols-4 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
            <button type="button" className="pill pill-sm pill-ghost demo-clock-btn" onClick={() => advance(60, "+1 hour")}>
              +1 hour
            </button>
            <button type="button" className="pill pill-sm pill-ghost demo-clock-btn" onClick={() => advance(24 * 60, "+1 day")}>
              +1 day
            </button>
            <button type="button" className="pill pill-sm pill-ghost demo-clock-btn" onClick={() => advance(3 * 24 * 60, "+3 days")}>
              +3 days
            </button>
            <button type="button" className="pill pill-sm demo-quiet demo-clock-btn" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Demo views"
        onKeyDown={onTabKey}
        className="demo-tabs mt-6 -mx-3 px-3 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible"
      >
        {TABS.map((t, i) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`demo-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`demo-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={(e) => {
                setTab(t.id);
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
              }}
              className={`demo-tab flex-none inline-flex items-center gap-2 min-h-10 rounded-full px-4 text-[15px] font-medium whitespace-nowrap transition-colors ${
                selected ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink"
              }`}
            >
              <span className={`tabular text-[13px] ${selected ? "text-white/90" : "text-ink-2"}`} aria-hidden>
                {i + 1}
              </span>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 1. Enquiry form */}
      <div role="tabpanel" id="demo-panel-enquiry" aria-labelledby="demo-tab-enquiry" hidden={tab !== "enquiry"} className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Panel
          title="Request an estimate"
          intro="The customer's view of the request form on Maple Home Services' website (fictional)."
        >
          <p className="rounded-xl bg-white ring-1 ring-line px-4 py-3 text-[14px] text-ink leading-[1.45]">
            <span className="font-semibold">Use made-up details.</span> Nothing you type leaves this page.
          </p>
          <form onSubmit={onSubmit} noValidate className="mt-4 grid gap-4 sm:grid-cols-2" data-testid="demo-form">
            <Field label="Name" id="d-name">
              <input id="d-name" className="field field-sm" autoComplete="off" placeholder="Made-up name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Service needed" id="d-service">
              <select id="d-service" className="field field-sm field-select" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Email" id="d-email">
              <input id="d-email" type="email" className="field field-sm" autoComplete="off" placeholder="name@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Phone" id="d-phone">
              <input id="d-phone" type="tel" className="field field-sm" autoComplete="off" placeholder="613-555-0100" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Postal code" id="d-postal">
              <input id="d-postal" className="field field-sm" autoComplete="off" placeholder="K2P 1L4" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} />
            </Field>
            <Field label="How soon" id="d-urgency">
              <select id="d-urgency" className="field field-sm field-select" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}>
                <option value="normal">No rush</option>
                <option value="soon">This week</option>
                <option value="emergency">Emergency, today</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Describe the job" id="d-message">
                <textarea id="d-message" rows={3} className="field field-sm resize-none leading-[1.5]" autoComplete="off" placeholder="Made-up details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </Field>
            </div>
            <label className="sm:col-span-2 flex items-center gap-3 text-[15px] text-ink cursor-pointer">
              <input type="checkbox" className="w-5 h-5 flex-none demo-check" checked={form.ok} onChange={(e) => setForm({ ...form, ok: e.target.checked })} />
              OK to contact me about this request
            </label>
            <div className="sm:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="pill pill-sm pill-red">
                Send request
              </button>
              <button type="button" className="pill pill-sm pill-ghost" onClick={resubmit}>
                Send the same form again
              </button>
            </div>
          </form>
          {formResult && <Result tone={formResult.tone}>{formResult.text}</Result>}
        </Panel>
        <div className="grid gap-4 content-start min-w-0">
          <Panel title="Sample requests" intro="Synthetic requests with example.com addresses. The first five are already in the list.">
            <ul className="divide-y divide-line border-y border-line">
              {SAMPLES.map((s) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => runSample(s)}
                    className="demo-sample group w-full text-left py-2.5 flex flex-wrap items-baseline justify-between gap-x-4"
                  >
                    <span className="text-[15px] font-semibold text-ink group-hover:text-red group-hover:underline underline-offset-3 transition-colors">
                      {s.label}
                    </span>
                    <span className="text-[13px] text-ink-2">{s.outcome}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="What the system did" intro="Up to six recent events, newest first.">
            {/* Whole entries only: no scroll area to cut an entry in half. */}
            <ol className="divide-y divide-line border-y border-line text-[14px] leading-[1.45]" aria-label="System log, newest first" data-testid="demo-log">
              {w.log.slice(0, 6).map((l, i) => (
                <li key={`${l.at}-${i}`} className="py-2.5">
                  <span className="block text-[12px] text-ink-2 tabular">{fmt(l.at)}</span>
                  {l.text}
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>

      {/* 2. Requests and alerts */}
      <div role="tabpanel" id="demo-panel-requests" aria-labelledby="demo-tab-requests" hidden={tab !== "requests"} className="mt-6 grid gap-4">
        <Panel
          title="Estimate requests"
          intro="The owner's list: one row per job. When the same customer (matched by email or phone) asks for the same service within 72 hours, it merges into their open row and the new message is kept in the notes. A different service gets its own row, linked as a returning customer. Change a status the way the owner would. In a real setup this list lives in your Google Sheet or job software."
        >
          {/* md and up: table */}
          <div className="hidden md:block overflow-x-auto rounded-xl bg-white ring-1 ring-line" data-testid="register-table">
            <table className="w-full text-left text-[14px] tabular">
              <caption className="sr-only">Estimate requests for Maple Home Services (fictional)</caption>
              <thead>
                <tr className="border-b border-line text-[13px] text-ink-2">
                  <th scope="col" className="py-2.5 px-3 font-semibold">Customer</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Service</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Status</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Reply by</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Repeats</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Opted out</th>
                  <th scope="col" className="py-2.5 px-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {S.leads.map((L) => {
                  const overdue = L.status === "New" && L.next_action_at && Date.parse(L.next_action_at) < w.now;
                  return (
                    <tr key={L.lead_id} className="border-b border-line last:border-b-0 align-top" data-testid="register-row">
                      <th scope="row" className="py-3 px-3 font-normal">
                        <span className="block font-semibold text-ink">{L.customer_name}</span>
                        {L.related_lead_id && (
                          <span className="block mt-1" data-testid="returning-tag">
                            <Tag>Returning customer, new job</Tag>
                          </span>
                        )}
                        <span className="block text-[13px] text-ink-2">{L.email || phone(L.phone)}</span>
                      </th>
                      <td className="py-3 px-3">
                        {L.service_category}
                        <span className="block mt-1">{L.urgency === "emergency" ? <Tag tone="bad">Emergency</Tag> : <span className="text-[13px] text-ink-2">{URGENCY[L.urgency]}</span>}</span>
                      </td>
                      <td className="py-3 px-3">
                        <select aria-label={`Status for ${L.customer_name}`} className="field field-sm field-compact field-select w-[132px]" value={L.status} onChange={(e) => setStatus(L, e.target.value)}>
                          {LEAD_STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {L.next_action_at ? (
                          <>
                            {overdue && <Tag tone="bad">Overdue</Tag>} <span className="block text-[13px] mt-1">{fmt(L.next_action_at)}</span>
                          </>
                        ) : (
                          <span className="text-ink-2">Done</span>
                        )}
                      </td>
                      <td className="py-3 px-3">{L.duplicate_count}</td>
                      <td className="py-3 px-3">
                        <input type="checkbox" className="w-5 h-5 demo-check" aria-label={`${L.customer_name} opted out`} checked={L.opt_out} onChange={(e) => setOptOut(L, e.target.checked)} />
                      </td>
                      <td className="py-3 px-3 text-[13px] text-ink-2 min-w-[180px]">{L.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* below md: one card per request */}
          <ul className="md:hidden grid gap-3" data-testid="register-cards">
            {S.leads.map((L) => {
              const overdue = L.status === "New" && L.next_action_at && Date.parse(L.next_action_at) < w.now;
              return (
                <li key={L.lead_id} className="rounded-xl bg-white ring-1 ring-line p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[16px] font-semibold text-ink">{L.customer_name}</span>
                    {L.related_lead_id && <Tag>Returning customer, new job</Tag>}
                    <Tag tone={leadTone(L.status)}>{L.status}</Tag>
                    {L.urgency === "emergency" && <Tag tone="bad">Emergency</Tag>}
                    {overdue && <Tag tone="bad">Overdue</Tag>}
                  </div>
                  <p className="text-[14px] text-ink-2 mt-1">
                    {L.service_category} · {L.email || phone(L.phone)}
                  </p>
                  {L.next_action_at && <p className="text-[14px] text-ink-2 mt-1">Reply by {fmt(L.next_action_at)}</p>}
                  {L.duplicate_count > 0 && <p className="text-[14px] text-ink-2 mt-1">Repeat requests: {L.duplicate_count}</p>}
                  {L.notes && <p className="text-[13px] text-ink-2 mt-1">{L.notes}</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <label className="text-[14px] font-medium text-ink flex items-center gap-2">
                      Status
                      <select className="field field-sm field-select w-[150px]" value={L.status} onChange={(e) => setStatus(L, e.target.value)}>
                        {LEAD_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-[14px] font-medium text-ink flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 demo-check" checked={L.opt_out} onChange={(e) => setOptOut(L, e.target.checked)} />
                      Opted out
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel
            title="Owner alerts (simulated outbox)"
            intro="Alerts go to the owner, never to the customer. Here they stay on this page. In a real setup they're emailed to you; they aren't instant, because new requests are checked every 5 minutes."
          >
            {S.outbox.length === 0 ? (
              <p className="text-[14px] text-ink-2">No alerts yet.</p>
            ) : (
              <ul className="grid gap-2 max-h-[420px] overflow-auto" tabIndex={0} aria-label="Owner alerts, newest first" data-testid="demo-outbox">
                {S.outbox
                  .slice()
                  .reverse()
                  .map((n) => (
                    <li key={n.key} className="rounded-xl bg-white ring-1 ring-line px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag tone={n.status === "sent" ? "ok" : n.status === "dead" ? "bad" : "warn"}>
                          {n.status === "sent" ? "Delivered (simulated)" : n.status === "dead" ? "Failed" : "Waiting"}
                        </Tag>
                        <span className="text-[14px] font-semibold text-ink">{n.subject}</span>
                      </div>
                      <details className="mt-1.5">
                        <summary className="text-[13px] text-ink-2 cursor-pointer w-fit">To {n.to}{n.last_error ? ` · last error: ${n.last_error}` : ""}</summary>
                        <p className="mt-2 whitespace-pre-wrap text-[13px] leading-[1.5] text-ink">{n.body}</p>
                      </details>
                    </li>
                  ))}
              </ul>
            )}
          </Panel>
          <Panel title="Rejected or filtered" intro="Logged without personal details. No alert is sent for these.">
            {S.rejected.length === 0 ? (
              <p className="text-[14px] text-ink-2">Nothing rejected yet. Try “Missing contact details” or “Outside the service area” on the first tab.</p>
            ) : (
              <ul className="grid gap-2" data-testid="demo-rejected">
                {S.rejected.map((x, i) => (
                  <li key={`${x.at}-${i}`} className="rounded-xl bg-white ring-1 ring-line px-4 py-3 text-[14px]">
                    <span className="block text-[12px] text-ink-2 tabular">{fmt(x.at)}</span>
                    {x.errors.map((e) => ERR[e] ?? e).join(" ")}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>

      {/* 3. Scheduling */}
      <div role="tabpanel" id="demo-panel-schedule" aria-labelledby="demo-tab-schedule" hidden={tab !== "schedule"} className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel
          title="Book a visit"
          intro="60-minute visits with a 30-minute travel buffer and 12 hours' notice. Monday to Friday 8 a.m. to 5 p.m. (Friday until 4), Saturday 9 a.m. to noon."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="For" id="d-book-lead">
              <select id="d-book-lead" className="field field-sm field-select" value={bookLeadId} onChange={(e) => setBookLead(e.target.value)}>
                {openLeads.length ? (
                  openLeads.map((L) => (
                    <option key={L.lead_id} value={L.lead_id}>
                      {L.customer_name} · {L.service_category}
                    </option>
                  ))
                ) : (
                  <option value="">No open requests</option>
                )}
              </select>
            </Field>
            <Field label="Day" id="d-book-day">
              <select id="d-book-day" className="field field-sm field-select" value={dayValue} onChange={(e) => setDay(e.target.value)}>
                {days.map((dd) => (
                  <option key={dd.date} value={dd.date}>
                    {dd.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" data-testid="demo-slots">
            {allSlots.length === 0 && <p className="text-[14px] text-ink-2">Closed this day.</p>}
            {allSlots.map((s) => {
              const taken = !freeSlots.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => bookSlot(s)}
                  aria-disabled={taken || undefined}
                  aria-label={`${fmtTime(s)}${taken ? ", taken" : ""}`}
                  className={`pill pill-sm tabular px-2 sm:px-4 ${taken ? "demo-slot-taken" : "demo-slot"}`}
                >
                  {fmtTime(s)}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <button type="button" className="pill pill-sm pill-ghost" onClick={doubleBook}>
              Try to double-book the first visit
            </button>
          </div>
          {bookResult && <Result tone={bookResult.tone}>{bookResult.text}</Result>}
        </Panel>
        <Panel title="Calendar">
          {S.bookings.length === 0 ? (
            <p className="text-[14px] text-ink-2">No visits booked. Pick a time on the left.</p>
          ) : (
            <ul className="grid gap-2" data-testid="demo-bookings">
              {S.bookings.map((b) => (
                <li key={b.booking_id} className="rounded-xl bg-white ring-1 ring-line px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink tabular">{fmt(b.start)}</p>
                    <p className="text-[14px] text-ink-2">{leadName(b.lead_id)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag tone={b.status === "Confirmed" ? "ok" : "neutral"}>{b.status}</Tag>
                    {b.status === "Confirmed" && (
                      <button type="button" className="pill pill-sm pill-ghost" onClick={() => cancel(b.booking_id)} aria-label={`Cancel the visit on ${fmt(b.start)}`}>
                        Cancel
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* 4. Quotes */}
      <div role="tabpanel" id="demo-panel-quotes" aria-labelledby="demo-tab-quotes" hidden={tab !== "quotes"} className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Quotes" intro="Record a quote you've sent. The system tracks it and reminds the owner, not the customer.">
          <div className="grid gap-4 sm:grid-cols-[1fr_140px_auto] sm:items-end">
            <Field label="Customer" id="d-quote-lead">
              <select id="d-quote-lead" className="field field-sm field-select" value={quoteLeadId} onChange={(e) => setQuoteLead(e.target.value)}>
                {quotable.length ? (
                  quotable.map((L) => (
                    <option key={L.lead_id} value={L.lead_id}>
                      {L.customer_name} · {L.service_category}
                    </option>
                  ))
                ) : (
                  <option value="">No requests without a quote</option>
                )}
              </select>
            </Field>
            <Field label="Amount (made up)" id="d-quote-amount">
              <input id="d-quote-amount" type="number" min={1} step={1} inputMode="numeric" className="field field-sm tabular" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <button type="button" className="pill pill-sm pill-red" onClick={createQuote}>
              Record as sent
            </button>
          </div>
          {quoteResult && <Result tone={quoteResult.tone}>{quoteResult.text}</Result>}
          <ul className="mt-4 grid gap-2" data-testid="demo-quotes">
            {S.quotes.length === 0 && <li className="text-[14px] text-ink-2">No quotes yet.</li>}
            {S.quotes.map((q) => (
              <li key={q.quote_id} className="rounded-xl bg-white ring-1 ring-line px-4 py-3" data-testid="quote-row">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[15px] font-semibold text-ink">
                    {leadName(q.lead_id)} · <span className="tabular">{money(q.amount)}</span>
                  </span>
                  <Tag tone={q.status === "Accepted" ? "ok" : q.status === "Sent" ? "warn" : q.status === "Draft" ? "neutral" : "bad"}>{q.status}</Tag>
                </div>
                <p className="text-[13px] text-ink-2 mt-1 tabular">
                  Sent {fmt(q.sent_at)} · Reminders:{" "}
                  <span data-testid="quote-reminders">{q.reminders.length ? q.reminders.map((k) => `day ${k.split(":")[0].replace("FU_QUOTE_D", "")}`).join(", ") : "none yet"}</span>
                </p>
                {q.status === "Sent" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className="pill pill-sm pill-ghost" onClick={() => decide(q.quote_id, "Accepted")}>
                      Mark accepted
                    </button>
                    <button type="button" className="pill pill-sm demo-quiet" onClick={() => decide(q.quote_id, "Declined")}>
                      Mark declined
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Panel>
        <div className="grid gap-4 content-start min-w-0">
          <Panel title="Follow-up rules">
            <dl className="grid gap-3 text-[14px] leading-[1.45]">
              {[
                ["First reply", "Owner reminder 4 hours after a request (1 hour for emergencies) if its status is still New."],
                ["Open quote", "Owner reminder on day 3 and day 7."],
                ["Expiry", "Quote marked Expired at day 30."],
                ["Stops when", "The quote is accepted, declined or expired, the request is won or lost, or the customer opted out."],
                ["Customer messages", "Off. Reminders go to the owner only; the system refuses to message customers."],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
          <Panel title="Last check">
            {w.lastCheck.length ? (
              <ul className="grid gap-1.5 text-[14px] text-ink-2 leading-[1.5]" data-testid="demo-last-check">
                {w.lastCheck.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[14px] text-ink-2 leading-[1.5]" data-testid="demo-last-check">
                Move the simulated clock to run the follow-up check.
              </p>
            )}
          </Panel>
        </div>
      </div>

      {/* 5. Sync and health */}
      <div role="tabpanel" id="demo-panel-health" aria-labelledby="demo-tab-health" hidden={tab !== "health"} className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel
          title="Sync to a second app (simulated)"
          intro="Pushes changed requests one way to a stand-in for a second app, such as job-management software. A real integration uses that app's own connection and your account; we confirm your tools are supported before quoting."
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <Field label="Second app" id="d-sync-mode">
              <select id="d-sync-mode" className="field field-sm field-select" value={syncMode} onChange={(e) => setSyncMode(e.target.value as Mode)}>
                <option value="ok">Working</option>
                <option value="TRANSIENT">Connection down</option>
                <option value="PERMISSION">Access revoked</option>
              </select>
            </Field>
            <button type="button" className="pill pill-sm pill-red" onClick={runSync}>
              Run sync
            </button>
          </div>
          <p className="text-[13px] text-ink-2 mt-3 leading-[1.45]">
            Only new or changed requests are pushed. To see revoked access stop the sync, change a status on the Requests
            tab first, then run it again.
          </p>
          {syncResult && <Result tone={syncResult.tone}>{syncResult.text}</Result>}
          <h4 className="text-[15px] font-semibold mt-5">The second app&apos;s copy</h4>
          <ul className="mt-2 grid gap-2" data-testid="demo-dest">
            {Object.keys(w.dest).length === 0 && <li className="text-[14px] text-ink-2">Nothing synced yet.</li>}
            {Object.entries(w.dest).map(([k, r]) => (
              <li key={k} className="rounded-xl bg-white ring-1 ring-line px-4 py-2.5 text-[14px] flex flex-wrap justify-between gap-2">
                <span className="font-semibold text-ink">{r.customer_name}</span>
                <span className="text-ink-2">
                  {r.status} · synced {fmt(r.updated_at)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="System health" intro="Checks that requests are processed and alerts are getting through.">
          <div className="flex items-center gap-3" data-testid="demo-health">
            <span className={`w-3.5 h-3.5 rounded-full flex-none status-dot-${health.level.toLowerCase()}`} aria-hidden />
            <p className="text-[19px] font-semibold text-ink">
              {health.level === "GREEN" ? "Green: everything is working" : health.level === "AMBER" ? "Amber: something needs attention" : "Red: something is broken"}
            </p>
          </div>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[14px]">
            {[
              ["Requests", health.counts.leads],
              ["Alerts waiting", health.counts.pending],
              ["Alerts failed", health.counts.dead],
              ["Overdue replies", health.counts.overdue],
              ["Rejected", health.counts.rejected],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-xl bg-white ring-1 ring-line px-3 py-2">
                <dt className="text-[12px] text-ink-2">{k}</dt>
                <dd className="text-[19px] font-semibold tabular">{v}</dd>
              </div>
            ))}
          </dl>
          {health.issues.length > 0 && (
            <ul className="mt-3 grid gap-2">
              {health.issues.map((i) => (
                <li key={i.code} className="text-[14px] flex flex-wrap items-center gap-2">
                  <Tag tone={i.level === "RED" ? "bad" : "warn"}>{i.level === "RED" ? "Red" : "Amber"}</Tag>
                  {i.detail}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <Field label="Alert email (simulated)" id="d-mail-mode">
              <select id="d-mail-mode" className="field field-sm field-select" value={w.mailMode} onChange={(e) => setMailMode(e.target.value as Mode)}>
                <option value="ok">Working</option>
                <option value="TRANSIENT">Mail outage</option>
                <option value="PERMISSION">Permission revoked</option>
              </select>
            </Field>
            <button type="button" className="pill pill-sm pill-red" onClick={testAlert}>
              Send a test alert
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="pill pill-sm pill-ghost" onClick={deliver}>
              Deliver waiting alerts
            </button>
            <button type="button" className="pill pill-sm pill-ghost" onClick={retryFailed}>
              Retry failed alerts
            </button>
          </div>
          <p className="text-[13px] text-ink-2 mt-3 leading-[1.45]">
            To see an outage: set the alert email to “Permission revoked” and send a test alert. To recover: set it back to
            “Working” and retry failed alerts.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

function describeKey(key: string) {
  const [kind, id] = key.split(":");
  if (kind.startsWith("FU_QUOTE_D")) return `day ${kind.replace("FU_QUOTE_D", "")} quote reminder (${id})`;
  if (kind === "FU_FIRST_RESPONSE") return `first reply overdue (${id})`;
  return key;
}

function describeReason(reason: string) {
  const map: Record<string, string> = {
    OPT_OUT: "customer opted out",
    QUOTE_ACCEPTED: "quote accepted",
    QUOTE_DECLINED: "quote declined",
    QUOTE_EXPIRED: "quote expired",
    QUOTE_DRAFT: "quote not sent",
    LEAD_CLOSED: "request won or lost",
  };
  return map[reason] ?? reason;
}
