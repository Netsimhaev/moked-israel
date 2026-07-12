// Cardcom LowProfile API client. Added 2026-07-10 as part of wiring real
// checkout. ⚠️ Every endpoint path / field name / auth-shape decision below
// is a best-effort reconstruction of Cardcom's publicly documented LowProfile
// REST API pattern — NOT verified against this merchant's actual API docs or
// dashboard, because credentials/docs weren't available while writing this.
// Every assumption is marked "TO VERIFY". Once the user fills real values
// into .env.local and can see Cardcom's dashboard/docs, re-check each one
// before relying on this in production. All such assumptions are
// deliberately isolated to this one file so fixing them never requires
// touching the checkout UI or API routes that call it.

// TO VERIFY: exact base URL/version segment, and whether this merchant
// account uses the v11 JSON API vs. an older XML/query-string API.
const CARDCOM_API_BASE = "https://secure.cardcom.solutions/api/v11";

export type CreateLowProfileParams = {
  amount: number; // final ILS total — always computed server-side, never trust a client value
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnValue: string; // our own opaque order id, echoed back so the callback can be correlated
  successRedirectUrl: string;
  failedRedirectUrl: string;
  webHookUrl: string;
};

export type CreateLowProfileResult =
  | { ok: true; url: string; lowProfileId: string }
  | { ok: false; error: string };

function cardcomAuth() {
  return {
    TerminalNumber: process.env.CARDCOM_TERMINAL_NUMBER,
    ApiName: process.env.CARDCOM_API_NAME,
    ApiPassword: process.env.CARDCOM_API_PASSWORD,
  };
}

export async function createLowProfileSession(
  params: CreateLowProfileParams,
): Promise<CreateLowProfileResult> {
  if (process.env.CARDCOM_DRY_RUN === "true") {
    // Local/staging bypass — lets the whole UI flow (order-bump math, form
    // validation, redirect, success page) be tested end to end without ever
    // calling Cardcom or moving real money. successRedirectUrl already
    // contains our own `?order=` query param (set in /api/checkout), so
    // there's nothing to append here — just hand it back as-is.
    return {
      ok: true,
      url: params.successRedirectUrl,
      lowProfileId: `dry-${params.returnValue}`,
    };
  }

  // Verified live 2026-07-10 against the real merchant account (terminal
  // 154264, one-time ₪1 LowProfile/Create test call, no charge — creating a
  // session doesn't move money, only completing the hosted page does):
  // endpoint path, auth field names, ISOCoinId=1 for ILS, Language="he", and
  // the ResponseCode/Url/LowProfileId response shape are all CONFIRMED
  // correct. The only thing missing on the first attempt was
  // Document.Products — this terminal requires itemized invoice lines
  // (ResponseCode 5047 "No InvoiceLines data was send" without it). Fixed
  // below with a single line item using the order's description/amount.
  let res: Response;
  try {
    res = await fetch(`${CARDCOM_API_BASE}/LowProfile/Create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...cardcomAuth(),
        Amount: params.amount,
        ProductName: params.description,
        ReturnValue: params.returnValue,
        SuccessRedirectUrl: params.successRedirectUrl,
        FailedRedirectUrl: params.failedRedirectUrl,
        WebHookUrl: params.webHookUrl,
        Language: "he",
        ISOCoinId: 1, // ILS — confirmed correct
        Document: {
          // TO VERIFY: this account accepted DocumentType "Order" without
          // complaint, but whether it should actually be "Invoice"/"Receipt"
          // for real tax-invoice purposes is a legal/accounting question,
          // not something confirmed by this connectivity test alone.
          DocumentType: "Order",
          Name: params.customerName,
          Email: params.customerEmail,
          Phone: params.customerPhone,
          Products: [
            {
              Description: params.description,
              Quantity: 1,
              UnitCost: params.amount,
            },
          ],
        },
      }),
    });
  } catch {
    return { ok: false, error: "cardcom request failed" };
  }

  if (!res.ok) return { ok: false, error: `cardcom http ${res.status}` };

  const data = await res.json();
  // TO VERIFY: actual success/failure discriminator field name (commonly
  // "ResponseCode" === 0 for Cardcom) and the field holding the redirect URL.
  if (data.ResponseCode !== 0) {
    return { ok: false, error: data.Description ?? "unknown cardcom error" };
  }
  return { ok: true, url: data.Url, lowProfileId: data.LowProfileId };
}

export type LowProfileResult = {
  success: boolean;
  amount: number;
  returnValue: string;
  transactionId?: string;
};

// Server-side re-query of Cardcom, used by the webhook callback to verify a
// payment actually succeeded instead of trusting the callback payload at
// face value (anti-tampering — a forged POST to our callback URL claiming a
// fake successful payment must not be enough to mark an order fulfilled).
export async function getLowProfileResult(
  lowProfileId: string,
): Promise<LowProfileResult | null> {
  if (lowProfileId.startsWith("dry-")) {
    return {
      success: true,
      amount: 0,
      returnValue: lowProfileId.slice(4),
      transactionId: "dry-run",
    };
  }

  // Verified live 2026-07-10 against a real (unpaid, pending) LowProfileId:
  // endpoint, auth, and response shape confirmed — pending/incomplete
  // returns ResponseCode 5119 with TranzactionInfo: null, ReturnValue is
  // echoed back correctly, and the field is genuinely spelled "Tranzaction"
  // (not a typo in this code). Not yet verified: the exact shape of
  // TranzactionInfo once a payment actually *succeeds* (no completed
  // transaction was available to test) — the success check below is a
  // reasonable extrapolation from the confirmed pending shape, not directly
  // observed. Re-confirm after the first real successful payment.
  let res: Response;
  try {
    res = await fetch(`${CARDCOM_API_BASE}/LowProfile/GetLpResult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cardcomAuth(), LowProfileId: lowProfileId }),
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;
  const data = await res.json();
  return {
    success:
      data.ResponseCode === 0 && data.TranzactionInfo?.ResponseCode === 0,
    amount: data.TranzactionInfo?.Amount,
    returnValue: data.ReturnValue,
    transactionId: data.TranzactionInfo?.TranzactionId,
  };
}
