import Link from "next/link";
import { subjects } from "@/lib/curriculum";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-glow">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 text-center">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-brand-ink bg-brand/10 rounded-full px-3 py-1 mb-5">
            Open source · Free forever
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.05]">
            The world&apos;s best education, <span className="text-brand">free for everyone</span>.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl mx-auto">
            We bring together the best openly-licensed courses, sequence them into clear learning
            paths, and add spaced-repetition quizzes and an AI tutor that tests your understanding —
            so you actually remember what you learn.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/learn/computer-science/cs50-intro/scratch"
              className="rounded-full bg-brand text-white px-6 py-3 font-medium hover:bg-brand-ink transition-colors"
            >
              Start with CS50 →
            </Link>
            <Link
              href="#subjects"
              className="rounded-full border border-border px-6 py-3 font-medium hover:border-brand transition-colors"
            >
              Browse subjects
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 grid sm:grid-cols-3 gap-4 -mt-4">
        {[
          {
            icon: "🧭",
            title: "Curated paths",
            body: "Not a pile of links — a sequenced journey through the best free material, in the right order.",
          },
          {
            icon: "🤖",
            title: "AI Socratic tutor",
            body: "An assistant that asks you questions and grades your explanations, grounded in the lesson itself.",
          },
          {
            icon: "🔁",
            title: "Spaced repetition",
            body: "Quizzes scheduled by the science of memory, so knowledge sticks instead of fading.",
          },
        ].map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
            <div className="text-2xl">{p.icon}</div>
            <h3 className="mt-2 font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </section>

      {/* Subjects */}
      <section id="subjects" className="mx-auto max-w-6xl px-5 mt-16 scroll-mt-20">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
          <p className="text-sm text-muted">More added as the community contributes paths.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const available = s.paths.length > 0;
            const inner = (
              <div
                className={`h-full rounded-2xl border bg-card p-5 transition-colors ${
                  available ? "border-border hover:border-brand" : "border-border opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{s.emoji}</span>
                  {available ? (
                    <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-2.5 py-1">
                      {s.paths.length} path{s.paths.length > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-muted bg-foreground/5 rounded-full px-2.5 py-1">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                {!available && (
                  <p className="mt-3 text-xs text-brand">Help build this — contribute a path ↗</p>
                )}
              </div>
            );
            return available ? (
              <Link key={s.slug} href={`/subjects/${s.slug}`}>
                {inner}
              </Link>
            ) : (
              <div key={s.slug}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-5 mt-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Education is a right, not a product</h2>
        <p className="mt-3 text-muted">
          Great learning material already exists — it&apos;s just scattered and passive. OpenLearn
          centralizes openly-licensed courses, credits every source, and is built in the open so
          anyone can improve it. No ads. No paywalls. No accounts required to start.
        </p>
      </section>
    </div>
  );
}
