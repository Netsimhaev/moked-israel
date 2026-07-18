// Shared lead-validation/storage core, extracted from api/lead/route.ts
// (2026-07-17) so the new chat submitLead tool (lib/claude.ts) can save a
// lead directly, server-side, without an internal HTTP round-trip to its
// own API route. Both call sites now share one validation rule set instead
// of duplicating the phone pattern/field sanitizing.
const MAX_FIELD_LENGTH = 300;
const PHONE_PATTERN = /^[\d\-+() ]{7,20}$/;

export function sanitizeLeadField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_FIELD_LENGTH) return undefined;
  return trimmed;
}

export type LeadInput = {
  name?: unknown;
  phone?: unknown;
  area?: unknown;
  need?: unknown;
  company?: unknown;
  role?: unknown;
  scope?: unknown;
  source?: unknown;
  updatesOptIn?: unknown;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

// TODO: forward to CRM / sales-agent pipeline instead of just logging.
export function saveLead(raw: LeadInput): LeadResult {
  const phone = sanitizeLeadField(raw.phone);
  if (!phone || !PHONE_PATTERN.test(phone)) {
    return { ok: false, error: "invalid phone" };
  }

  const lead = {
    name: sanitizeLeadField(raw.name),
    phone,
    area: sanitizeLeadField(raw.area),
    need: sanitizeLeadField(raw.need),
    company: sanitizeLeadField(raw.company),
    role: sanitizeLeadField(raw.role),
    scope: sanitizeLeadField(raw.scope),
    source: sanitizeLeadField(raw.source) ?? "unknown",
    updatesOptIn: Boolean(raw.updatesOptIn),
    at: new Date().toISOString(),
  };

  console.log("[lead]", lead);
  return { ok: true };
}
