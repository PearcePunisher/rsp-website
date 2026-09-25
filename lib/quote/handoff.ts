// Hands a finished estimate from /quote to the /contact form via sessionStorage.
// The contact form only reads it when it arrives with ?from=estimate.

export const ESTIMATE_HANDOFF_KEY = "rsp:estimate-handoff";
export const ESTIMATE_HANDOFF_PARAM = "estimate";

export type EstimateHandoff = {
  message: string;
  budget: string; // matches a <option value> in the contact form's budget select
};

export function budgetBucket(total: number): string {
  if (total < 2000) return "<2k";
  if (total < 5000) return "<2-5k";
  if (total < 10000) return "<5-10k";
  if (total < 25000) return "10-25k";
  if (total < 50000) return "25-50k";
  return ">50k";
}

export function saveEstimateHandoff(handoff: EstimateHandoff) {
  try {
    sessionStorage.setItem(ESTIMATE_HANDOFF_KEY, JSON.stringify(handoff));
  } catch {}
}

export function readEstimateHandoff(): EstimateHandoff | null {
  try {
    const raw = sessionStorage.getItem(ESTIMATE_HANDOFF_KEY);
    return raw ? (JSON.parse(raw) as EstimateHandoff) : null;
  } catch {
    return null;
  }
}
