import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getSubject, subjects } from "@/lib/curriculum";
import { Prose } from "@/components/Prose";
import { Quiz } from "@/components/Quiz";
import { Tutor } from "@/components/Tutor";
import { ColumbusGlobe } from "@/components/ColumbusGlobe";

export function generateStaticParams() {
  return subjects.flatMap((s) =>
    s.paths.flatMap((p) =>
      p.lessons.map((l) => ({ subject: s.slug, path: p.slug, lessonId: l.id })),
    ),
  );
}

const KIND_ICON: Record<string, string> = {
  video: "▶️",
  reading: "📖",
  exercise: "🧩",
  notes: "📝",
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; path: string; lessonId: string }>;
}) {
  const { subject: subjectSlug, path: pathSlug, lessonId } = await params;
  const subject = getSubject(subjectSlug);
  const data = getLesson(subjectSlug, pathSlug, lessonId);
  if (!subject || !data) notFound();
  const { path, lesson, index, prev, next } = data;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* breadcrumb */}
      <div className="text-sm text-muted flex items-center gap-2 flex-wrap">
        <Link href={`/subjects/${subject.slug}`} className="hover:text-foreground">
          {subject.emoji} {subject.name}
        </Link>
        <span>/</span>
        <span>{path.title}</span>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* main column */}
        <article>
          <p className="text-sm text-brand font-medium">
            Lesson {index + 1} of {path.lessons.length}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-2 text-muted">{lesson.summary}</p>

          <div className="mt-6">
            <Prose text={lesson.body} />
          </div>

          {/* resources */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Course material</h2>
            <p className="text-sm text-muted">
              Taught by {path.provider}. Licensed {path.license} — credited per resource.
            </p>
            <div className="mt-3 space-y-2">
              {lesson.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-brand transition-colors"
                >
                  <span className="text-lg">{KIND_ICON[r.kind] ?? "🔗"}</span>
                  <span className="flex-1">
                    <span className="font-medium group-hover:text-brand transition-colors">
                      {r.title} ↗
                    </span>
                    <span className="block text-xs text-muted mt-0.5">
                      {r.attribution} · {r.license}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* quiz */}
          <section className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold">Check & remember</h2>
              <span className="text-xs text-accent bg-accent/10 rounded-full px-2.5 py-1">
                Spaced repetition
              </span>
            </div>
            <p className="text-sm text-muted mb-5">
              Answered questions are scheduled for review at the moment you&apos;re about to forget
              them — saved on this device.
            </p>
            <Quiz questions={lesson.quiz} />
          </section>

          {/* nav */}
          <nav className="mt-8 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                href={`/learn/${subject.slug}/${path.slug}/${prev.id}`}
                className="rounded-full border border-border px-4 py-2 text-sm hover:border-brand transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/learn/${subject.slug}/${path.slug}/${next.id}`}
                className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-ink transition-colors"
              >
                {next.title} →
              </Link>
            ) : (
              <Link
                href={`/subjects/${subject.slug}`}
                className="rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-brand-ink transition-colors"
              >
                Finish path ✓
              </Link>
            )}
          </nav>
        </article>

        {/* tutor / explorer sidebar */}
        <aside className="lg:sticky lg:top-20 space-y-4">
          {subjectSlug === "history" && path.slug === "columbus-voyages" && (
            <ColumbusGlobe activeLessonId={lessonId} />
          )}
          <Tutor lessonTitle={lesson.title} lessonBody={lesson.body} />
          <p className="text-xs text-muted px-1">
            The tutor is grounded in this lesson&apos;s material to keep answers accurate.
          </p>
        </aside>
      </div>
    </div>
  );
}
