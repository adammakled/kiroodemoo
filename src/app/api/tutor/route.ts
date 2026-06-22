import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 30;

interface TutorBody {
  messages: UIMessage[];
  lessonTitle?: string;
  lessonBody?: string;
}

// Direct Anthropic provider — reads ANTHROPIC_API_KEY from the environment.
// (Swap to a Vercel AI Gateway "provider/model" string here if you'd rather
// route through the gateway.)
const MODEL = process.env.TUTOR_MODEL ?? "claude-haiku-4-5";

function systemPrompt(title?: string, body?: string): string {
  return [
    "You are OpenLearn's Socratic tutor. Your goal is to TEST and DEEPEN the learner's",
    "understanding, not to lecture. Prefer asking one focused question at a time. When the",
    "learner answers, give brief, specific feedback, then probe further or move on.",
    "Use the Feynman technique: ask them to explain ideas in their own words.",
    "Keep replies short (2-4 sentences). Be warm and encouraging.",
    "",
    "IMPORTANT: Ground everything in the lesson material below. If the learner asks something",
    "outside it, you may answer briefly but steer back to the lesson. Do not invent facts.",
    "",
    `# Current lesson: ${title ?? "(none)"}`,
    body ?? "",
  ].join("\n");
}

export async function POST(req: Request) {
  // Fail gracefully if no credential is configured, so local dev without a key
  // shows a helpful message instead of a 500.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "AI tutor isn't configured. Set ANTHROPIC_API_KEY in .env.local to enable " +
          "the Socratic tutor.",
      },
      { status: 503 },
    );
  }

  let payload: TutorBody;
  try {
    payload = (await req.json()) as TutorBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = streamText({
    model: anthropic(MODEL),
    system: systemPrompt(payload.lessonTitle, payload.lessonBody),
    messages: await convertToModelMessages(payload.messages ?? []),
  });

  return result.toUIMessageStreamResponse();
}
