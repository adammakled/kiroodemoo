import React from "react";

// Tiny renderer: paragraphs separated by blank lines, with **bold** and `code`.
// Enough for our authored lesson bodies without pulling in a markdown lib.
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return tokens.map((tok, i) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-foreground">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith("`") && tok.endsWith("`")) {
      return (
        <code
          key={`${keyBase}-${i}`}
          className="rounded bg-foreground/8 px-1.5 py-0.5 font-mono text-[0.85em]"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyBase}-${i}`}>{tok}</React.Fragment>;
  });
}

export function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="space-y-4 text-[15px] leading-7 text-foreground/90">
      {paragraphs.map((p, i) => (
        <p key={i}>{renderInline(p, `p${i}`)}</p>
      ))}
    </div>
  );
}
