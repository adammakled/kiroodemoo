"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const STARTERS = [
  "Quiz me on this lesson",
  "Ask me to explain a concept in my own words",
  "Give me a tricky question",
];

export function Tutor({
  lessonTitle,
  lessonBody,
}: {
  lessonTitle: string;
  lessonBody: string;
}) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/tutor",
      body: { lessonTitle, lessonBody },
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[28rem] rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="grid place-items-center w-7 h-7 rounded-lg bg-accent/15 text-accent">🤖</span>
        <div>
          <p className="text-sm font-semibold leading-tight">AI Socratic Tutor</p>
          <p className="text-xs text-muted leading-tight">Tests your understanding of this lesson</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-muted">
            <p>I&apos;ll ask <em>you</em> questions instead of just answering. Pick a starter:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-brand transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { text: string }).text)
            .join("");
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                  isUser ? "bg-brand text-white" : "bg-foreground/5"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}

        {busy && messages[messages.length - 1]?.role === "user" && (
          <div className="text-xs text-muted">Tutor is thinking…</div>
        )}

        {error && (
          <div className="rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3.5 py-2 text-sm">
            The tutor isn&apos;t available right now. If you&apos;re running locally, add an{" "}
            <code className="font-mono">AI_GATEWAY_API_KEY</code> to <code className="font-mono">.env.local</code>.
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer…"
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-ink transition-colors disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
