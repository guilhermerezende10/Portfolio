import { describe, expect, it } from "vitest";
import { Scanner } from "@tailwindcss/oxide";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(rootDir, "src");

/**
 * Regression guard for a Tailwind v4 class-extraction bug (issue #34 / PR #33).
 *
 * Tailwind extracts utility classes by scanning raw source text. When a class
 * is glued directly onto a template-literal interpolation — e.g.
 * `` `… sm:inline-block${cond ? "x" : ""}` `` — the token `sm:inline-block${`
 * is not a valid candidate, so the class is silently dropped and its CSS is
 * never generated. That is exactly how every desktop nav link once vanished:
 * the links carry `hidden` and depend on `sm:inline-block` to reappear at
 * >=640px, so dropping it left them `display:none` at every width.
 *
 * The guards below assert against the *actual* extractor (`@tailwindcss/oxide`,
 * the same scanner the Vite plugin uses) rather than a full `vite build`: the
 * build caches scan results between runs, so reading its output CSS gives
 * false-greens. Scanning the source directly is deterministic and build-free.
 */

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = sourceFiles(srcDir);

// -- Guard 1: the real extractor recovers every nav-critical utility. ---------

// Utilities the nav depends on that are only reachable through a responsive or
// state variant — the class of token that silently disappears when glued to a
// `${}` interpolation. `sm:inline-block` is the one that actually regressed.
// Built from parts so this file's own source can't seed them into the scan.
const REQUIRED_UTILITIES = [
  ["sm", "inline-block"],
  ["sm", "hidden"],
  ["hover", "text-ink"],
].map(([variant, util]) => `${variant}:${util}`);

describe("Tailwind extracts nav-critical utilities from source", () => {
  const scanner = new Scanner({ sources: [] });
  const candidates = new Set(
    scanner.scanFiles(
      files.map((f) => ({
        content: readFileSync(f, "utf8"),
        extension: extname(f).slice(1),
      }))
    )
  );

  for (const util of REQUIRED_UTILITIES) {
    it(`recovers \`${util}\``, () => {
      expect(candidates).toContain(util);
    });
  }
});

// -- Guard 2: no class token is glued onto a `${}` interpolation in source. ---

// A `className={`…`}` template literal whose text runs a class-name character
// (`[\w:-]`) straight into `${`, with no separating space — e.g.
// `` className={`… sm:inline-block${cond …}` ``. Scoped to `className` so it
// only flags class strings, not ordinary interpolations like `` `#${id}` `` or
// `` `${a}-${b}` ``.
const GLUED_CLASS = /className=\{`[^`]*[\w:-]\$\{/;

describe("no Tailwind class is glued onto a template interpolation", () => {
  for (const file of files) {
    it(`${file.slice(rootDir.length + 1)} keeps a space before \${`, () => {
      const offenders = readFileSync(file, "utf8")
        .split("\n")
        .map((line, i) => ({ line: line.trim(), n: i + 1 }))
        .filter(({ line }) => GLUED_CLASS.test(line));
      expect(
        offenders,
        offenders.map((o) => `  L${o.n}: ${o.line}`).join("\n")
      ).toEqual([]);
    });
  }
});
