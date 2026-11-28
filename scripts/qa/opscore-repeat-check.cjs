/**
 * Repeat-enquiry alert rules of the OpsCore copy the demo runs (src/lib/ops-core.js), checked directly.
 * No browser, no network.   node scripts/qa/opscore-repeat-check.cjs
 */
const C = require("../../src/lib/ops-core.js");

const H = 3600 * 1000;
const T0 = Date.UTC(2026, 10, 30, 14, 0);
const cfg = {
  businessName: "Maple Home Services (fictional)",
  ownerEmail: "owner@example.com",
  timezone: "America/Toronto",
  duplicateWindowHours: 72,
  form: { services: ["Plumbing", "HVAC"], requirePostal: false, requireContactPermission: false },
};
const base = { name: "Priya Sample", email: "priya@example.com", phone: "", service: "Plumbing", urgency: "soon", contact_permission: "yes" };

let seq = 0;
const results = [];
function send(S, at, extra) {
  const before = S.outbox.length;
  const raw = { ...base, ...extra, submission_id: `t-${++seq}`, submitted_at: new Date(at).toISOString() };
  const r = C.processSubmission(S, raw, cfg, at);
  return { r, alerts: S.outbox.slice(before).map((n) => n.subject) };
}
function check(name, ok, detail) {
  results.push({ ok, name, detail });
}

const S = { leads: [], processed: {}, rejected: [], outbox: [], quotes: [], bookings: [] };
let x = send(S, T0, { message: "Kitchen tap dripping" });
check("new request: one 'New enquiry' alert", x.r.action === "created" && x.alerts.length === 1 && /^New enquiry/.test(x.alerts[0]), x.alerts);

x = send(S, T0 + 1 * H, { message: "Kitchen tap dripping" });
check("same service, same message: merged, no alert", x.r.action === "duplicate" && x.alerts.length === 0, x.alerts);

x = send(S, T0 + 2 * H, { message: "Also the bathroom sink drains slowly" });
check("same service, new message: merged + 'Repeat enquiry (possible new job)'", x.r.action === "duplicate" && x.alerts.length === 1 && /^Repeat enquiry \(possible new job\)/.test(x.alerts[0]), x.alerts);

x = send(S, T0 + 3 * H, { message: "Also the bathroom sink drains slowly" });
check("that new message again: merged, no second alert", x.r.action === "duplicate" && x.alerts.length === 0, x.alerts);

x = send(S, T0 + 4 * H, { message: "Now leaking onto the floor", urgency: "emergency" });
check("same service, becomes emergency: merged + one 'URGENT repeat enquiry' (no extra repeat alert)", x.r.action === "duplicate" && x.alerts.length === 1 && /^URGENT repeat enquiry/.test(x.alerts[0]), x.alerts);

x = send(S, T0 + 5 * H, { message: "Furnace rattling", service: "HVAC" });
check("different service: new row linked as returning customer", x.r.action === "created" && !!x.r.lead.related_lead_id && x.alerts.length === 1 && /\(returning customer, new job\)$/.test(x.alerts[0]), x.alerts);

x = send(S, T0 + 80 * H, { message: "Kitchen tap dripping again" });
check("same service after the 72-hour window: a new request", x.r.action === "created" && x.alerts.length === 1, x.alerts);

const S2 = { leads: [], processed: {}, rejected: [], outbox: [], quotes: [], bookings: [] };
send(S2, T0, { email: "", phone: "613-555-0111", message: "No heat" , service: "HVAC"});
x = send(S2, T0 + H, { email: "", phone: "(613) 555-0111", message: "Still no heat, getting cold", service: "HVAC" });
check("matched by phone only, new message: merged + repeat alert", x.r.action === "duplicate" && x.alerts.length === 1 && /^Repeat enquiry/.test(x.alerts[0]), x.alerts);

console.log(`OpsCore ${C.VERSION}`);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : "  " + JSON.stringify(r.detail)}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} pass`);
process.exit(failed ? 1 : 0);
