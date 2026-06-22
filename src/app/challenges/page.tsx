import Link from "next/link";
import { codingPath } from "@/lib/challenges";

const DIFFICULTY_BADGE: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Hard: "bg-red-500/10 text-red-700 dark:text-red-300",
};

export default function ChallengesPage() {
  const easy = codingPath.problems.filter((p) => p.difficulty === "Easy");
  const medium = codingPath.problems.filter((p) => p.difficulty === "Medium");
  const hard = codingPath.problems.filter((p) => p.difficulty === "Hard");

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/subjects/computer-science" className="text-sm text-muted hover:text-foreground">
        ← Computer Science
      </Link>

      <div className="mt-5 flex items-start gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{codingPath.title}</h1>
          <p className="mt-2 text-muted max-w-2xl">{codingPath.description}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: "♟",
            title: "Chess-style ratings",
            body: "Every move gets rated: Optimal, Good, Inaccurate, or Blunder — just like a chess engine grading your position.",
          },
          {
            icon: "⚡",
            title: "Live as you type",
            body: "The AI coach updates its analysis in real time, 1.5 seconds after you stop typing — no submit button needed.",
          },
          {
            icon: "🔒",
            title: "No spoilers",
            body: "The AI never reveals the solution. It nudges you toward better thinking with targeted hints.",
          },
        ].map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
            <div className="text-2xl">{p.icon}</div>
            <h3 className="mt-2 font-semibold text-sm">{p.title}</h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 flex items-center gap-4 flex-wrap text-sm text-muted">
        <span>
          <strong className="text-foreground">{codingPath.problems.length}</strong> problems
        </span>
        <span>·</span>
        <span>
          <strong className="text-emerald-600 dark:text-emerald-400">{easy.length}</strong> Easy
        </span>
        <span>
          <strong className="text-amber-600 dark:text-amber-400">{medium.length}</strong> Medium
        </span>
        <span>
          <strong className="text-red-600 dark:text-red-400">{hard.length}</strong> Hard
        </span>
        <span>·</span>
        <span>~{codingPath.estimatedHours}h estimated</span>
      </div>

      {/* Problem list */}
      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-foreground/[0.02] flex items-center gap-4 text-xs text-muted font-medium uppercase tracking-wide">
          <span className="w-8">#</span>
          <span className="flex-1">Problem</span>
          <span className="w-20 text-right">Difficulty</span>
        </div>
        <ol className="divide-y divide-border">
          {codingPath.problems.map((problem, i) => (
            <li key={problem.id}>
              <Link
                href={`/challenges/${problem.id}`}
                className="group flex items-center gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
              >
                <span className="w-8 text-sm text-muted shrink-0">{i + 1}</span>
                <span className="flex-1">
                  <span className="font-medium group-hover:text-brand transition-colors">
                    {problem.title}
                  </span>
                  <span className="block text-sm text-muted mt-0.5">{problem.summary}</span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full bg-foreground/5 text-muted px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  className={`w-20 text-right text-xs font-medium rounded-full px-2.5 py-1 shrink-0 ${DIFFICULTY_BADGE[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 text-center">
        <Link
          href={`/challenges/${codingPath.problems[0].id}`}
          className="inline-block rounded-full bg-brand text-white px-6 py-3 text-sm font-medium hover:bg-brand-ink transition-colors"
        >
          Start solving →
        </Link>
      </div>
    </div>
  );
}
