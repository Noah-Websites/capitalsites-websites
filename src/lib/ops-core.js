/*
 * CapitalSites Ops Core v0.1 (2026-11-26)
 * Shared, dependency-free logic for the Digital Operations modules:
 *   LC-01 Lead Capture, BK-01 Booking, QF-01 Quote Follow-up, IN-01 Integration, MC-01 Monitoring.
 * Pure functions over plain objects/arrays so the same file runs in:
 *   - Node (tests), - the browser (demo), - Google Apps Script V8 (client install).
 * No network calls, no AI at runtime, no customer-facing messaging.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OpsCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VERSION = '0.2.0';
  var TZ_DEFAULT = 'America/Toronto';

  // ---------- small utilities ----------
  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  function iso(d) { return new Date(d).toISOString(); }
  function ms(d) { return typeof d === 'number' ? d : new Date(d).getTime(); }
  function trim(s) { return (s === null || s === undefined) ? '' : String(s).replace(/\s+/g, ' ').trim(); }
  var HOUR = 3600000, DAY = 86400000;

  // ---------- time zone helpers (DST-safe, Intl only) ----------
  function tzOffsetMs(dateMs, tz) {
    var f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    var p = {};
    f.formatToParts(new Date(dateMs)).forEach(function (x) { p[x.type] = x.value; });
    var asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
    return asUtc - Math.floor(dateMs / 1000) * 1000;
  }
  function localToUtcMs(y, m, d, hh, mm, tz) {
    var guess = Date.UTC(y, m - 1, d, hh, mm);
    var t = guess - tzOffsetMs(guess, tz);
    var t2 = guess - tzOffsetMs(t, tz);
    return t2;
  }
  function localParts(dateMs, tz) {
    var f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23', weekday: 'short', year: 'numeric', month: '2-digit',
      day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
    var p = {};
    f.formatToParts(new Date(dateMs)).forEach(function (x) { p[x.type] = x.value; });
    var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
    return { y: +p.year, m: +p.month, d: +p.day, hh: +p.hour % 24, mm: +p.minute, wd: wd };
  }
  function formatLocal(dateMs, tz) {
    var p = localParts(ms(dateMs), tz || TZ_DEFAULT);
    function z(n) { return (n < 10 ? '0' : '') + n; }
    return p.y + '-' + z(p.m) + '-' + z(p.d) + ' ' + z(p.hh) + ':' + z(p.mm);
  }

  // ---------- LC: enquiry normalisation and validation ----------
  var EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[A-Za-z]{2,}$/;
  var POSTAL_RE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  function normalizePhone(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 11 && digits.charAt(0) === '1') digits = digits.slice(1);
    if (digits.length !== 10) return null;
    if (/^[01]/.test(digits) || /^\d{3}[01]/.test(digits)) return null; // NANP area/exchange rules
    return digits;
  }
  function normalizeEmail(raw) {
    var e = trim(raw).toLowerCase();
    return EMAIL_RE.test(e) ? e : null;
  }

  /**
   * Validate one raw enquiry against a form config.
   * Returns { ok, errors[], spam, value } where value is the normalised enquiry.
   */
  function validateEnquiry(raw, cfg) {
    cfg = cfg || {};
    var errors = [];
    raw = raw || {};
    var services = cfg.services || [];
    var maxMsg = cfg.maxMessageLength || 2000;
    var v = {
      submission_id: trim(raw.submission_id),
      submitted_at: (raw.submitted_at && !isNaN(ms(raw.submitted_at))) ? iso(raw.submitted_at) : null,
      source: trim(raw.source) || 'web_form',
      customer_name: trim(raw.name),
      email: null,
      phone: null,
      preferred_contact: trim(raw.preferred_contact).toLowerCase() || 'either',
      service_category: trim(raw.service),
      postal_code: trim(raw.postal_code).toUpperCase(),
      urgency: trim(raw.urgency).toLowerCase() || 'normal',
      message: trim(raw.message),
      contact_permission: raw.contact_permission === true || String(raw.contact_permission).toLowerCase() === 'yes'
    };
    // Honeypot: real people never fill a hidden field.
    if (trim(raw.company_website)) return { ok: false, spam: true, errors: ['SPAM_HONEYPOT'], value: v };
    if (!v.submitted_at) errors.push('SUBMITTED_AT_INVALID');
    if (!v.customer_name || v.customer_name.length < 2) errors.push('NAME_REQUIRED');
    if (v.customer_name.length > 120) errors.push('NAME_TOO_LONG');
    var emailRaw = trim(raw.email), phoneRaw = trim(raw.phone);
    if (emailRaw) { v.email = normalizeEmail(emailRaw); if (!v.email) errors.push('EMAIL_INVALID'); }
    if (phoneRaw) { v.phone = normalizePhone(phoneRaw); if (!v.phone) errors.push('PHONE_INVALID'); }
    if (!emailRaw && !phoneRaw) errors.push('CONTACT_REQUIRED');
    if (v.preferred_contact === 'email' && !v.email && emailRaw === '') errors.push('EMAIL_REQUIRED_FOR_PREFERENCE');
    if (v.preferred_contact === 'phone' && !v.phone && phoneRaw === '') errors.push('PHONE_REQUIRED_FOR_PREFERENCE');
    if (services.length && services.indexOf(v.service_category) === -1) errors.push('SERVICE_INVALID');
    if (v.postal_code) {
      if (!POSTAL_RE.test(v.postal_code)) errors.push('POSTAL_INVALID');
      else if (cfg.serviceAreaFsa && cfg.serviceAreaFsa.length &&
               cfg.serviceAreaFsa.indexOf(v.postal_code.slice(0, 3)) === -1) errors.push('OUTSIDE_SERVICE_AREA');
    } else if (cfg.requirePostal) errors.push('POSTAL_REQUIRED');
    if (['normal', 'soon', 'emergency'].indexOf(v.urgency) === -1) errors.push('URGENCY_INVALID');
    if (v.message.length > maxMsg) errors.push('MESSAGE_TOO_LONG');
    if (cfg.requireContactPermission && !v.contact_permission) errors.push('CONTACT_PERMISSION_REQUIRED');
    return { ok: errors.length === 0, spam: false, errors: errors, value: v };
  }

  // ---------- LC: lead records, duplicates, idempotency ----------
  var LEAD_FIELDS = ['lead_id', 'created_at_utc', 'source', 'submission_id', 'customer_name', 'email', 'phone',
    'preferred_contact', 'service_category', 'postal_code', 'urgency', 'message', 'status', 'assigned_owner',
    'last_contact_at', 'next_action', 'next_action_at', 'quote_id', 'quote_status', 'opt_out', 'duplicate_count',
    'related_lead_id', 'notes', 'updated_at', 'error_state'];
  var LEAD_STATUSES = ['New', 'Contacted', 'Booked', 'Quoted', 'Won', 'Lost', 'Rejected'];
  var OPEN_STATUSES = ['New', 'Contacted', 'Booked', 'Quoted'];

  function makeLeadId(v) {
    var basis = v.submission_id || ((v.email || '') + '|' + (v.phone || '') + '|' + v.submitted_at);
    var d = new Date(v.submitted_at || Date.now()).toISOString().slice(0, 10).replace(/-/g, '');
    return 'L-' + d + '-' + fnv1a(basis);
  }

  /**
   * Same customer = same email OR phone, on an OPEN lead, inside the window.
   * Duplicate = same customer AND same service (merged; nothing is discarded: the new message is kept in notes).
   * Related   = same customer, DIFFERENT service (a legitimate new job: a new lead is created and linked).
   */
  function sameCustomer(L, v, w, t) {
    if (OPEN_STATUSES.indexOf(L.status) === -1) return false;
    var same = (v.email && L.email === v.email) || (v.phone && L.phone === v.phone);
    return !!same && Math.abs(t - ms(L.created_at_utc)) <= w;
  }
  function findDuplicate(leads, v, windowHours) {
    var w = (windowHours || 72) * HOUR, t = ms(v.submitted_at);
    for (var i = leads.length - 1; i >= 0; i--) {
      var L = leads[i];
      if (sameCustomer(L, v, w, t) && L.service_category === v.service_category) return L;
    }
    return null;
  }
  function findRelated(leads, v, windowHours) {
    var w = (windowHours || 72) * HOUR, t = ms(v.submitted_at);
    for (var i = leads.length - 1; i >= 0; i--) if (sameCustomer(leads[i], v, w, t)) return leads[i];
    return null;
  }

  /**
   * Process one raw submission into the register. Mutates `state` (leads, processed, rejected, outbox).
   * state = { leads: [], processed: {submissionId: leadId|'REJECTED'|'SPAM'}, rejected: [], outbox: [] }
   * Returns { action: 'created'|'duplicate'|'rejected'|'spam'|'ignored', lead, errors }
   */
  function processSubmission(state, raw, cfg, nowMs) {
    cfg = cfg || {};
    var now = nowMs || Date.now();
    state.leads = state.leads || []; state.processed = state.processed || {};
    state.rejected = state.rejected || []; state.outbox = state.outbox || [];
    var sid = trim(raw && raw.submission_id);
    if (!sid) {
      state.rejected.push({ at: iso(now), errors: ['SUBMISSION_ID_MISSING'], raw: redact(raw) });
      return { action: 'rejected', errors: ['SUBMISSION_ID_MISSING'] };
    }
    if (state.processed[sid]) return { action: 'ignored', reason: 'ALREADY_PROCESSED', lead_id: state.processed[sid] };

    var res = validateEnquiry(raw, cfg.form);
    if (res.spam) { state.processed[sid] = 'SPAM'; return { action: 'spam', errors: res.errors }; }
    if (!res.ok) {
      state.processed[sid] = 'REJECTED';
      state.rejected.push({ at: iso(now), submission_id: sid, errors: res.errors, raw: redact(raw) });
      return { action: 'rejected', errors: res.errors };
    }
    var v = res.value;
    var dup = findDuplicate(state.leads, v, cfg.duplicateWindowHours);
    if (dup) {
      dup.duplicate_count = (dup.duplicate_count || 0) + 1;
      dup.notes = (dup.notes ? dup.notes + ' | ' : '') + 'Repeat enquiry ' + formatLocal(ms(v.submitted_at), cfg.timezone) +
        (v.message ? ': ' + v.message.slice(0, 1000) : '') + (v.phone && v.phone !== dup.phone ? ' (new phone ' + v.phone + ')' : '') +
        (v.email && v.email !== dup.email ? ' (new email ' + v.email + ')' : '');
      if (v.urgency === 'emergency' && dup.urgency !== 'emergency') {
        dup.urgency = 'emergency';
        queueNotification(state, 'LEAD_ESCALATED:' + dup.lead_id, ownerAlert(dup, cfg, 'escalated'), now);
      }
      dup.updated_at = iso(now);
      state.processed[sid] = dup.lead_id;
      return { action: 'duplicate', lead: dup };
    }
    var lead = {};
    LEAD_FIELDS.forEach(function (f) { lead[f] = ''; });
    lead.lead_id = makeLeadId(v);
    lead.created_at_utc = v.submitted_at;
    lead.source = v.source; lead.submission_id = sid;
    lead.customer_name = v.customer_name; lead.email = v.email || ''; lead.phone = v.phone || '';
    lead.preferred_contact = v.preferred_contact; lead.service_category = v.service_category;
    lead.postal_code = v.postal_code; lead.urgency = v.urgency; lead.message = v.message;
    lead.status = 'New'; lead.assigned_owner = cfg.defaultOwner || 'Owner';
    lead.next_action = 'First response';
    lead.next_action_at = iso(ms(v.submitted_at) + (v.urgency === 'emergency' ? 1 : (cfg.firstResponseHours || 4)) * HOUR);
    lead.opt_out = false; lead.duplicate_count = 0; lead.updated_at = iso(now);
    var rel = findRelated(state.leads, v, cfg.duplicateWindowHours);
    if (rel) { lead.related_lead_id = rel.lead_id; lead.notes = 'Same customer as ' + rel.lead_id + ' (' + rel.service_category + '); separate job'; }
    state.leads.push(lead);
    state.processed[sid] = lead.lead_id;
    queueNotification(state, 'LEAD_NEW:' + lead.lead_id, ownerAlert(lead, cfg, 'new'), now);
    return { action: 'created', lead: lead };
  }

  function redact(raw) {
    if (!raw) return raw;
    var o = {};
    Object.keys(raw).forEach(function (k) {
      o[k] = (k === 'email' || k === 'phone' || k === 'name' || k === 'message') ? (raw[k] ? '[redacted]' : '') : raw[k];
    });
    return o;
  }

  // Internal owner alert only: never addressed to the customer.
  function ownerAlert(lead, cfg, kind) {
    var tz = cfg.timezone || TZ_DEFAULT;
    var subj = (kind === 'escalated' ? 'URGENT repeat enquiry: ' : (lead.urgency === 'emergency' ? 'EMERGENCY enquiry: ' : 'New enquiry: ')) +
      lead.service_category + ' - ' + lead.customer_name + (lead.related_lead_id ? ' (returning customer, new job)' : '');
    var body = [
      (cfg.businessName || 'Your business') + ' - internal lead alert (do not forward to the customer)',
      'Lead: ' + lead.lead_id,
      'Received: ' + formatLocal(ms(lead.created_at_utc), tz) + ' (' + tz + ')',
      'Service: ' + lead.service_category + '   Urgency: ' + lead.urgency,
      'Name: ' + lead.customer_name,
      'Phone: ' + (lead.phone || '-') + '   Email: ' + (lead.email || '-') + '   Prefers: ' + lead.preferred_contact,
      'Postal code: ' + (lead.postal_code || '-'),
      'Message: ' + (lead.message || '-'),
      'Respond by: ' + formatLocal(ms(lead.next_action_at), tz),
      'Open the lead register: ' + (cfg.registerUrl || '(register link)')
    ].join('\n');
    return { to: cfg.ownerEmail || 'owner@example.com', subject: subj, body: body, audience: 'internal' };
  }

  // ---------- Notifications: queue, idempotency, retry, dead-letter ----------
  function queueNotification(state, key, msg, nowMs) {
    state.outbox = state.outbox || [];
    for (var i = 0; i < state.outbox.length; i++) if (state.outbox[i].key === key) return state.outbox[i];
    if (msg.audience !== 'internal') throw new Error('CUSTOMER_MESSAGING_NOT_APPROVED');
    var n = { key: key, to: msg.to, subject: msg.subject, body: msg.body, audience: msg.audience,
      status: 'pending', attempts: 0, next_attempt_at: iso(nowMs), last_error: '', created_at: iso(nowMs), sent_at: '' };
    state.outbox.push(n);
    return n;
  }

  /**
   * Try to deliver pending notifications through `adapter.send(msg)`.
   * adapter.send throws {code:'TRANSIENT'|'PERMISSION'|'QUOTA'|...}. Mock adapters are used in demos.
   */
  function dispatchNotifications(state, adapter, nowMs, policy) {
    policy = policy || {};
    var maxAttempts = policy.maxAttempts || 5, baseMin = policy.backoffMinutes || 5;
    var report = { sent: 0, retrying: 0, dead: 0, skipped: 0, alerts: [] };
    (state.outbox || []).forEach(function (n) {
      if (n.status !== 'pending') { report.skipped++; return; }
      if (ms(n.next_attempt_at) > nowMs) { report.skipped++; return; }
      n.attempts++;
      try {
        adapter.send({ to: n.to, subject: n.subject, body: n.body, key: n.key });
        n.status = 'sent'; n.sent_at = iso(nowMs); n.last_error = ''; report.sent++;
      } catch (e) {
        var code = (e && e.code) || 'TRANSIENT';
        n.last_error = code + ': ' + ((e && e.message) || '');
        if (code === 'PERMISSION' || code === 'AUTH' || n.attempts >= maxAttempts) {
          n.status = 'dead'; report.dead++;
          report.alerts.push({ level: 'RED', key: n.key, error: n.last_error });
        } else if (code === 'QUOTA') {
          n.next_attempt_at = iso(nowMs + 6 * HOUR); report.retrying++;
          report.alerts.push({ level: 'AMBER', key: n.key, error: n.last_error });
        } else {
          n.next_attempt_at = iso(nowMs + baseMin * Math.pow(2, n.attempts - 1) * 60000); report.retrying++;
        }
      }
    });
    return report;
  }
  function requeueDead(state, nowMs) {
    var c = 0;
    (state.outbox || []).forEach(function (n) {
      if (n.status === 'dead') { n.status = 'pending'; n.attempts = 0; n.next_attempt_at = iso(nowMs); c++; }
    });
    return c;
  }

  // ---------- Lead and quote status tracking ----------
  var QUOTE_STATUSES = ['Draft', 'Sent', 'Accepted', 'Declined', 'Expired'];
  var LEAD_TRANSITIONS = {
    New: ['Contacted', 'Booked', 'Quoted', 'Lost'], Contacted: ['Booked', 'Quoted', 'Lost'],
    Booked: ['Quoted', 'Won', 'Lost'], Quoted: ['Won', 'Lost', 'Booked'], Won: [], Lost: ['Contacted'], Rejected: []
  };
  function setLeadStatus(lead, next, nowMs, note) {
    if (LEAD_STATUSES.indexOf(next) === -1) return { ok: false, error: 'STATUS_UNKNOWN' };
    if (lead.status === next) return { ok: true, unchanged: true };
    if ((LEAD_TRANSITIONS[lead.status] || []).indexOf(next) === -1) return { ok: false, error: 'TRANSITION_NOT_ALLOWED', from: lead.status, to: next };
    lead.status = next; lead.updated_at = iso(nowMs);
    if (next === 'Contacted') { lead.last_contact_at = iso(nowMs); lead.next_action = 'Book visit or send quote'; lead.next_action_at = iso(nowMs + 2 * DAY); }
    if (next === 'Won' || next === 'Lost') { lead.next_action = ''; lead.next_action_at = ''; }
    if (note) lead.notes = (lead.notes ? lead.notes + ' | ' : '') + note;
    return { ok: true };
  }
  var QUOTE_TRANSITIONS = { Draft: ['Sent'], Sent: ['Accepted', 'Declined', 'Expired'], Accepted: [], Declined: [], Expired: ['Sent'] };
  function createQuote(quotes, lead, amount, nowMs) {
    if (!(amount > 0)) return { ok: false, error: 'AMOUNT_INVALID' };
    var q = { quote_id: 'Q-' + fnv1a(lead.lead_id + '|' + quotes.length), lead_id: lead.lead_id, amount: Math.round(amount * 100) / 100,
      status: 'Draft', created_at: iso(nowMs), sent_at: '', decided_at: '', reminders: [] };
    quotes.push(q); lead.quote_id = q.quote_id; lead.quote_status = 'Draft';
    return { ok: true, quote: q };
  }
  function setQuoteStatus(quote, lead, next, nowMs) {
    if (QUOTE_STATUSES.indexOf(next) === -1) return { ok: false, error: 'STATUS_UNKNOWN' };
    if ((QUOTE_TRANSITIONS[quote.status] || []).indexOf(next) === -1) return { ok: false, error: 'TRANSITION_NOT_ALLOWED', from: quote.status, to: next };
    quote.status = next;
    if (next === 'Sent') { quote.sent_at = iso(nowMs); if (lead && OPEN_STATUSES.indexOf(lead.status) !== -1) setLeadStatus(lead, 'Quoted', nowMs); }
    if (next === 'Accepted' || next === 'Declined' || next === 'Expired') quote.decided_at = iso(nowMs);
    if (lead) {
      lead.quote_status = next; lead.updated_at = iso(nowMs);
      if (next === 'Accepted') setLeadStatus(lead, 'Won', nowMs);
      if (next === 'Declined') setLeadStatus(lead, 'Lost', nowMs, 'Quote declined');
    }
    return { ok: true };
  }

  // ---------- QF: follow-up rules with suppression (owner-only reminders) ----------
  var DEFAULT_RULES = {
    firstResponseHours: 4, quoteReminderDays: [3, 7], quoteExpiryDays: 30,
    customerFacing: false, approvals: { customerMessaging: false }
  };
  /**
   * Evaluate follow-ups. Returns { reminders: [...], expired: [quote_id], suppressed: [{id, reason}] }.
   * Reminders are queued as INTERNAL owner notifications. Customer-facing sequences are blocked
   * unless rules.approvals.customerMessaging === true (separate compliance + owner sign-off).
   */
  function evaluateFollowUps(state, rules, cfg, nowMs) {
    rules = rules || DEFAULT_RULES; cfg = cfg || {};
    if (rules.customerFacing && !(rules.approvals && rules.approvals.customerMessaging)) {
      throw new Error('CUSTOMER_MESSAGING_NOT_APPROVED');
    }
    var out = { reminders: [], expired: [], suppressed: [] };
    var leadsById = {};
    (state.leads || []).forEach(function (L) { leadsById[L.lead_id] = L; });
    // 1. New leads with no first response.
    (state.leads || []).forEach(function (L) {
      if (L.status !== 'New') return;
      if (L.opt_out === true) { out.suppressed.push({ id: L.lead_id, reason: 'OPT_OUT' }); return; }
      if (L.next_action_at && ms(L.next_action_at) <= nowMs) {
        var n = queueNotification(state, 'FU_FIRST_RESPONSE:' + L.lead_id, {
          to: cfg.ownerEmail || 'owner@example.com', audience: 'internal',
          subject: 'Overdue: no reply yet to ' + L.customer_name + ' (' + L.service_category + ')',
          body: 'Lead ' + L.lead_id + ' has had no first response. Call or email them, then set status to Contacted.'
        }, nowMs);
        out.reminders.push(n.key);
      }
    });
    // 2. Sent quotes: remind on day N, expire after expiryDays; suppress closed or opted-out.
    (state.quotes || []).forEach(function (q) {
      var L = leadsById[q.lead_id];
      if (q.status === 'Accepted' || q.status === 'Declined' || q.status === 'Expired' || q.status === 'Draft') {
        out.suppressed.push({ id: q.quote_id, reason: 'QUOTE_' + q.status.toUpperCase() }); return;
      }
      if (L && L.opt_out === true) { out.suppressed.push({ id: q.quote_id, reason: 'OPT_OUT' }); return; }
      if (L && (L.status === 'Won' || L.status === 'Lost')) { out.suppressed.push({ id: q.quote_id, reason: 'LEAD_CLOSED' }); return; }
      var age = (nowMs - ms(q.sent_at)) / DAY;
      if (age >= rules.quoteExpiryDays) {
        setQuoteStatus(q, L, 'Expired', nowMs); out.expired.push(q.quote_id); return;
      }
      rules.quoteReminderDays.forEach(function (d) {
        if (age >= d) {
          var key = 'FU_QUOTE_D' + d + ':' + q.quote_id;
          var n = queueNotification(state, key, {
            to: cfg.ownerEmail || 'owner@example.com', audience: 'internal',
            subject: 'Quote follow-up due (day ' + d + '): ' + (L ? L.customer_name : q.lead_id) + ' $' + q.amount,
            body: 'Quote ' + q.quote_id + ' was sent ' + Math.floor(age) + ' days ago with no decision recorded. Check in with the customer yourself, then mark it Accepted, Declined or leave it Sent.'
          }, nowMs);
          if (q.reminders.indexOf(key) === -1) q.reminders.push(key);
          out.reminders.push(n.key);
        }
      });
    });
    return out;
  }

  // ---------- BK: booking with conflict detection, cancellation, DST ----------
  /**
   * cfg: { timezone, durationMin, bufferMin, leadTimeHours, horizonDays,
   *        hours: { '1': [['08:00','17:00']], ... } (0=Sun) }
   */
  function hm(s) { var p = s.split(':'); return { h: +p[0], m: +p[1] }; }
  function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }
  function activeBookings(bookings) { return (bookings || []).filter(function (b) { return b.status === 'Confirmed'; }); }

  function isWithinHours(cfg, startMs, endMs) {
    var tz = cfg.timezone || TZ_DEFAULT;
    var p = localParts(startMs, tz);
    var wins = (cfg.hours || {})[String(p.wd)] || [];
    for (var i = 0; i < wins.length; i++) {
      var a = hm(wins[i][0]), b = hm(wins[i][1]);
      var ws = localToUtcMs(p.y, p.m, p.d, a.h, a.m, tz), we = localToUtcMs(p.y, p.m, p.d, b.h, b.m, tz);
      if (startMs >= ws && endMs <= we) return true;
    }
    return false;
  }
  function listSlots(cfg, bookings, fromMs, days, stepMin, nowMs) {
    var tz = cfg.timezone || TZ_DEFAULT, step = (stepMin || cfg.durationMin) * 60000, dur = cfg.durationMin * 60000;
    var earliest = (nowMs === undefined ? fromMs : nowMs) + (cfg.leadTimeHours || 0) * HOUR, out = [];
    var start = localParts(fromMs, tz);
    for (var i = 0; i < (days || 7); i++) {
      var dayUtcNoon = localToUtcMs(start.y, start.m, start.d, 12, 0, tz) + i * DAY;
      var p = localParts(dayUtcNoon, tz);
      var wins = (cfg.hours || {})[String(p.wd)] || [];
      wins.forEach(function (w) {
        var a = hm(w[0]), b = hm(w[1]);
        var ws = localToUtcMs(p.y, p.m, p.d, a.h, a.m, tz), we = localToUtcMs(p.y, p.m, p.d, b.h, b.m, tz);
        for (var t = ws; t + dur <= we; t += step) {
          if (t < earliest) continue;
          if (!conflictFor(cfg, bookings, t, t + dur)) out.push(iso(t));
        }
      });
    }
    return out;
  }
  function conflictFor(cfg, bookings, s, e, ignoreId) {
    var buf = (cfg.bufferMin || 0) * 60000;
    var act = activeBookings(bookings);
    for (var i = 0; i < act.length; i++) {
      if (ignoreId && act[i].booking_id === ignoreId) continue;
      if (overlaps(s - buf, e + buf, ms(act[i].start), ms(act[i].end))) return act[i];
    }
    return null;
  }
  function book(cfg, bookings, req, nowMs) {
    var s = ms(req.start);
    if (isNaN(s)) return { ok: false, error: 'START_INVALID' };
    var e = s + cfg.durationMin * 60000;
    if (s < nowMs + (cfg.leadTimeHours || 0) * HOUR) return { ok: false, error: 'TOO_SOON_OR_PAST' };
    if (cfg.horizonDays && s > nowMs + cfg.horizonDays * DAY) return { ok: false, error: 'TOO_FAR_AHEAD' };
    if (!isWithinHours(cfg, s, e)) return { ok: false, error: 'OUTSIDE_BUSINESS_HOURS' };
    var c = conflictFor(cfg, bookings, s, e, req.replacing);
    if (c) return { ok: false, error: 'CONFLICT', with: c.booking_id };
    var b = { booking_id: 'B-' + fnv1a((req.lead_id || '') + '|' + s + '|' + bookings.length), lead_id: req.lead_id || '',
      start: iso(s), end: iso(e), status: 'Confirmed', created_at: iso(nowMs), cancelled_at: '', note: req.note || '' };
    bookings.push(b);
    return { ok: true, booking: b };
  }
  function cancelBooking(bookings, id, nowMs) {
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].booking_id === id) {
        if (bookings[i].status === 'Cancelled') return { ok: true, unchanged: true };
        bookings[i].status = 'Cancelled'; bookings[i].cancelled_at = iso(nowMs); return { ok: true, booking: bookings[i] };
      }
    }
    return { ok: false, error: 'NOT_FOUND' };
  }
  function reschedule(cfg, bookings, id, newStart, nowMs) {
    var old = null;
    for (var i = 0; i < bookings.length; i++) if (bookings[i].booking_id === id) old = bookings[i];
    if (!old || old.status !== 'Confirmed') return { ok: false, error: 'NOT_FOUND_OR_NOT_ACTIVE' };
    var r = book(cfg, bookings, { start: newStart, lead_id: old.lead_id, replacing: id, note: 'Rescheduled from ' + old.start }, nowMs);
    if (!r.ok) return r; // old booking untouched on failure (atomic)
    cancelBooking(bookings, id, nowMs);
    return { ok: true, booking: r.booking, cancelled: id };
  }

  // ---------- IN: one-direction sync with idempotent upsert, retry, recovery ----------
  /**
   * Push changed records to a destination adapter: adapter.upsert(key, record) throws {code}.
   * syncState: { lastSynced: {key: updated_at}, queue: [key], errors: [] }
   */
  function syncRecords(records, keyField, adapter, syncState, nowMs, mapFn) {
    syncState.lastSynced = syncState.lastSynced || {}; syncState.queue = syncState.queue || []; syncState.errors = syncState.errors || [];
    var report = { pushed: 0, unchanged: 0, failed: 0, halted: false, alerts: [] };
    for (var i = 0; i < records.length; i++) {
      var r = records[i], k = r[keyField];
      if (!k) { report.failed++; report.alerts.push({ level: 'AMBER', error: 'MISSING_KEY' }); continue; }
      if (syncState.lastSynced[k] && syncState.lastSynced[k] >= r.updated_at && syncState.queue.indexOf(k) === -1) { report.unchanged++; continue; }
      try {
        adapter.upsert(k, mapFn ? mapFn(r) : r);
        syncState.lastSynced[k] = r.updated_at; report.pushed++;
        var qi = syncState.queue.indexOf(k); if (qi !== -1) syncState.queue.splice(qi, 1);
      } catch (e) {
        var code = (e && e.code) || 'TRANSIENT';
        report.failed++;
        if (syncState.queue.indexOf(k) === -1) syncState.queue.push(k);
        syncState.errors.push({ at: iso(nowMs), key: k, code: code });
        if (code === 'PERMISSION' || code === 'AUTH') {
          report.halted = true; report.alerts.push({ level: 'RED', error: code + ' - destination access revoked or wrong; sync stopped' });
          break; // don't hammer a destination we can't write to
        }
        if (code === 'VALIDATION') report.alerts.push({ level: 'AMBER', key: k, error: 'Destination rejected record (field mapping)' });
      }
    }
    return report;
  }

  // ---------- MC: health / monitoring ----------
  function healthReport(state, nowMs, opts) {
    opts = opts || {};
    var staleMin = opts.heartbeatStaleMinutes || 30;
    var issues = [];
    var lastRun = state.lastRunAt ? ms(state.lastRunAt) : 0;
    if (!lastRun || nowMs - lastRun > staleMin * 60000) issues.push({ level: 'RED', code: 'PROCESSOR_STALE', detail: 'Processor has not run in ' + staleMin + '+ minutes' });
    var dead = (state.outbox || []).filter(function (n) { return n.status === 'dead'; }).length;
    var pending = (state.outbox || []).filter(function (n) { return n.status === 'pending'; }).length;
    if (dead) issues.push({ level: 'RED', code: 'NOTIFICATIONS_FAILED', detail: dead + ' alert(s) could not be delivered' });
    if (pending > (opts.pendingWarn || 5)) issues.push({ level: 'AMBER', code: 'NOTIFICATION_BACKLOG', detail: pending + ' pending' });
    var overdue = (state.leads || []).filter(function (L) { return L.status === 'New' && L.next_action_at && ms(L.next_action_at) < nowMs; }).length;
    if (overdue) issues.push({ level: 'AMBER', code: 'LEADS_OVERDUE', detail: overdue + ' new lead(s) past response time' });
    var errs = (state.leads || []).filter(function (L) { return L.error_state; }).length;
    if (errs) issues.push({ level: 'AMBER', code: 'LEAD_ERRORS', detail: errs + ' lead(s) flagged' });
    var level = issues.some(function (i) { return i.level === 'RED'; }) ? 'RED' : (issues.length ? 'AMBER' : 'GREEN');
    return { level: level, issues: issues, counts: { leads: (state.leads || []).length, pending: pending, dead: dead, overdue: overdue,
      rejected: (state.rejected || []).length } };
  }

  return {
    VERSION: VERSION, LEAD_FIELDS: LEAD_FIELDS, LEAD_STATUSES: LEAD_STATUSES, QUOTE_STATUSES: QUOTE_STATUSES, DEFAULT_RULES: DEFAULT_RULES,
    fnv1a: fnv1a, tzOffsetMs: tzOffsetMs, localToUtcMs: localToUtcMs, formatLocal: formatLocal,
    normalizePhone: normalizePhone, normalizeEmail: normalizeEmail, validateEnquiry: validateEnquiry,
    processSubmission: processSubmission, findDuplicate: findDuplicate, findRelated: findRelated, queueNotification: queueNotification,
    dispatchNotifications: dispatchNotifications, requeueDead: requeueDead,
    setLeadStatus: setLeadStatus, createQuote: createQuote, setQuoteStatus: setQuoteStatus, evaluateFollowUps: evaluateFollowUps,
    listSlots: listSlots, book: book, cancelBooking: cancelBooking, reschedule: reschedule, isWithinHours: isWithinHours,
    syncRecords: syncRecords, healthReport: healthReport
  };
});
