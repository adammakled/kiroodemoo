import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenLearn — Free education for everyone",
  description:
    "A free, open-source home for the world's best openly-licensed courses, with " +
    "spaced-repetition quizzes and an AI Socratic tutor that tests your understanding.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border bg-card/70 backdrop-blur sticky top-0 z-20">
          <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-brand text-white text-sm">◆</span>
              OpenLearn
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted">
              <Link href="/#subjects" className="hover:text-foreground transition-colors">Subjects</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <a
                href="https://github.com"
                className="rounded-full border border-border px-3 py-1.5 hover:border-brand hover:text-foreground transition-colors"
              >
                Contribute ↗
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted flex flex-wrap gap-x-8 gap-y-2 justify-between">
            <p>OpenLearn — free education for everyone. Open source, no ads, no paywalls.</p>
            <p>Course content remains under its original license, credited per resource.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
