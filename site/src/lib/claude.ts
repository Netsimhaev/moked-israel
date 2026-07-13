import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

// Thin wrapper around the Anthropic call, mirroring lib/cardcom.ts's
// {ok, ...} discriminated-result convention and its CHATBOT_ENABLED /
// missing-key bypass checks (same shape as CARDCOM_DRY_RUN). Kept isolated
// here so the model id / provider / token cap can change in one place
// without touching the route handler or the widget.
export type ChatMessage = { role: "user" | "assistant"; content: string };

export type ChatResult = { ok: true; reply: string } | { ok: false; error: string };

// See the `claude-api` skill for current model ids before changing this —
// verified against the live model list at implementation time (2026-07-13).
const MODEL_ID = "claude-sonnet-5";
const MAX_OUTPUT_TOKENS = 400;

export async function askProductChatbot({
  systemPrompt,
  messages,
}: {
  systemPrompt: string;
  messages: ChatMessage[];
}): Promise<ChatResult> {
  if (process.env.CHATBOT_ENABLED === "false") {
    return { ok: false, error: "chatbot disabled" };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, error: "chatbot not configured" };
  }

  try {
    const result = await generateText({
      model: anthropic(MODEL_ID),
      instructions: systemPrompt,
      messages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });
    return { ok: true, reply: result.text };
  } catch (err) {
    console.error("[chat] anthropic request failed", err);
    return { ok: false, error: "chat_unavailable" };
  }
}