/**
 * Types for src/lib/ops-core.js (CapitalSites Ops Core v0.2.0, "OpsCore.gs (v0.2)" from the Digital Ops Kit,
 * as described in the CapitalSites Readiness Pack v0.2). The JavaScript file is kept byte-for-byte as supplied
 * (its header comment still reads v0.1; VERSION is 0.2.0); this file only describes it.
 */

export type HealthLevel = "GREEN" | "AMBER" | "RED";

export interface Lead {
  lead_id: string;
  created_at_utc: string;
  source: string;
  submission_id: string;
  customer_name: string;
  email: string;
  phone: string;
  preferred_contact: string;
  service_category: string;
  postal_code: string;
  urgency: string;
  message: string;
  status: string;
  assigned_owner: string;
  last_contact_at: string;
  next_action: string;
  next_action_at: string;
  quote_id: string;
  quote_status: string;
  opt_out: boolean;
  duplicate_count: number;
  /** v0.2: same customer, different service within the window = a new lead linked to this one. */
  related_lead_id: string;
  notes: string;
  updated_at: string;
  error_state: string;
}

export interface OpsNotification {
  key: string;
  to: string;
  subject: string;
  body: string;
  audience: string;
  status: "pending" | "sent" | "dead";
  attempts: number;
  next_attempt_at: string;
  last_error: string;
  created_at: string;
  sent_at: string;
}

export interface Quote {
  quote_id: string;
  lead_id: string;
  amount: number;
  status: string;
  created_at: string;
  sent_at: string;
  decided_at: string;
  reminders: string[];
}

export interface Booking {
  booking_id: string;
  lead_id: string;
  start: string;
  end: string;
  status: "Confirmed" | "Cancelled";
  created_at: string;
  cancelled_at: string;
  note: string;
}

export interface RejectedEntry {
  at: string;
  submission_id?: string;
  errors: string[];
  raw: Record<string, unknown>;
}

export interface OpsState {
  leads: Lead[];
  processed: Record<string, string>;
  rejected: RejectedEntry[];
  outbox: OpsNotification[];
  quotes: Quote[];
  bookings: Booking[];
  lastRunAt?: string;
}

export interface RawEnquiry {
  submission_id?: string;
  submitted_at?: string;
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferred_contact?: string;
  service?: string;
  postal_code?: string;
  urgency?: string;
  message?: string;
  contact_permission?: string | boolean;
  company_website?: string;
}

export interface FormConfig {
  services?: string[];
  serviceAreaFsa?: string[];
  requirePostal?: boolean;
  requireContactPermission?: boolean;
  maxMessageLength?: number;
}

export interface BookingConfig {
  timezone?: string;
  durationMin: number;
  bufferMin?: number;
  leadTimeHours?: number;
  horizonDays?: number;
  hours: Record<string, [string, string][]>;
}

export interface FollowUpRules {
  firstResponseHours?: number;
  quoteReminderDays: number[];
  quoteExpiryDays: number;
  customerFacing?: boolean;
  approvals?: { customerMessaging?: boolean };
}

export interface OpsConfig {
  businessName?: string;
  ownerEmail?: string;
  defaultOwner?: string;
  timezone?: string;
  registerUrl?: string;
  firstResponseHours?: number;
  duplicateWindowHours?: number;
  form?: FormConfig;
  booking?: BookingConfig;
  followUps?: FollowUpRules;
}

export interface SyncState {
  lastSynced?: Record<string, string>;
  queue?: string[];
  errors?: { at: string; key: string; code: string }[];
}

export interface Alert {
  level: string;
  key?: string;
  code?: string;
  error?: string;
  detail?: string;
}

declare const OpsCore: {
  VERSION: string;
  LEAD_STATUSES: string[];
  QUOTE_STATUSES: string[];
  DEFAULT_RULES: FollowUpRules;
  formatLocal(dateMs: number | string, tz?: string): string;
  localToUtcMs(y: number, m: number, d: number, hh: number, mm: number, tz: string): number;
  validateEnquiry(raw: RawEnquiry, cfg?: FormConfig): { ok: boolean; spam: boolean; errors: string[] };
  processSubmission(
    state: OpsState,
    raw: RawEnquiry,
    cfg: OpsConfig,
    nowMs: number,
  ): { action: "created" | "duplicate" | "rejected" | "spam" | "ignored"; lead?: Lead; errors?: string[]; reason?: string; lead_id?: string };
  /** Same customer (email or phone) on an open lead, same service, inside the window. */
  findDuplicate(leads: Lead[], v: { email?: string; phone?: string; service_category: string; submitted_at: string }, windowHours?: number): Lead | null;
  /** Same customer on an open lead inside the window, any service (v0.2 returning-customer link). */
  findRelated(leads: Lead[], v: { email?: string; phone?: string; submitted_at: string }, windowHours?: number): Lead | null;
  queueNotification(
    state: OpsState,
    key: string,
    msg: { to: string; subject: string; body: string; audience: "internal" },
    nowMs: number,
  ): OpsNotification;
  dispatchNotifications(
    state: OpsState,
    adapter: { send(msg: { to: string; subject: string; body: string; key: string }): void },
    nowMs: number,
    policy?: { maxAttempts?: number; backoffMinutes?: number },
  ): { sent: number; retrying: number; dead: number; skipped: number; alerts: Alert[] };
  requeueDead(state: OpsState, nowMs: number): number;
  setLeadStatus(lead: Lead, next: string, nowMs: number, note?: string): { ok: boolean; unchanged?: boolean; error?: string };
  createQuote(quotes: Quote[], lead: Lead, amount: number, nowMs: number): { ok: boolean; quote?: Quote; error?: string };
  setQuoteStatus(quote: Quote, lead: Lead | undefined, next: string, nowMs: number): { ok: boolean; error?: string };
  evaluateFollowUps(
    state: OpsState,
    rules: FollowUpRules,
    cfg: OpsConfig,
    nowMs: number,
  ): { reminders: string[]; expired: string[]; suppressed: { id: string; reason: string }[] };
  listSlots(cfg: BookingConfig, bookings: Booking[], fromMs: number, days?: number, stepMin?: number, nowMs?: number): string[];
  book(
    cfg: BookingConfig,
    bookings: Booking[],
    req: { start: string | number; lead_id?: string; replacing?: string; note?: string },
    nowMs: number,
  ): { ok: boolean; booking?: Booking; error?: string; with?: string };
  cancelBooking(bookings: Booking[], id: string, nowMs: number): { ok: boolean; unchanged?: boolean; booking?: Booking; error?: string };
  syncRecords<T extends object>(
    records: T[],
    keyField: string,
    adapter: { upsert(key: string, record: T): void },
    syncState: SyncState,
    nowMs: number,
  ): { pushed: number; unchanged: number; failed: number; halted: boolean; alerts: Alert[] };
  healthReport(
    state: OpsState,
    nowMs: number,
    opts?: { heartbeatStaleMinutes?: number; pendingWarn?: number },
  ): {
    level: HealthLevel;
    issues: { level: string; code: string; detail: string }[];
    counts: { leads: number; pending: number; dead: number; overdue: number; rejected: number };
  };
};

export default OpsCore;
