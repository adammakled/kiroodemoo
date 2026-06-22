import Link from "next/link";

export const metadata = { title: "About — OpenLearn" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-3xl font-bold tracking-tight">About OpenLearn</h1>
      <div className="mt-6 space-y-5 text-[15px] leading-7 text-foreground/90">
        <p>
          OpenLearn exists because a high-quality education shouldn&apos;t depend on where you were
          born or what you can pay. The world&apos;s best universities and educators already publish
          extraordinary material for free — it&apos;s just scattered, unsequenced, and passive.
        </p>
        <p>We do three things with it:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Centralize &amp; curate.</strong> We gather openly-licensed courses and arrange
            them into clear learning paths, so you know exactly what to study next.
          </li>
          <li>
            <strong>Make it active.</strong> Every lesson has a spaced-repetition quiz, so what you
            learn actually sticks.
          </li>
          <li>
            <strong>Give you a tutor.</strong> An AI Socratic tutor — grounded in the lesson — tests
            your understanding by asking you questions, not just answering them.
          </li>
        </ul>
        <p>
          We host only material whose license permits it (like Creative Commons), and we credit
          every source. Everything else we link to. The project is open source — anyone can add a
          subject, improve a path, or fix a quiz.
        </p>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-medium">Our principles</p>
          <p className="mt-1 text-sm text-muted">
            Free forever · No ads · No paywalls · No account required to start · Open source ·
            Accessible by design · Built for low bandwidth.
          </p>
        </div>
        <Link href="/" className="inline-block text-brand font-medium">
          ← Back home
        </Link>
      </div>
    </div>
  );
}
