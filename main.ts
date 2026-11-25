// The 3AM Fridge Text — u-deysumbrella-the-3am-fridge-text-4c3e721d
//
// A smart fridge texts its owner at 3am. The gag: the appliances gossip
// behind the owner's back, and the punchline lands on the leftovers —
// a fresh angle that avoids the obvious milk / ice / door-left-open jokes.
//
// The entry is a single literal, written out verbatim. No files are read,
// no network, no clock, no randomness: the same bytes come out every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The message, exactly as the fridge sends it (126 chars, one line).
const FRIDGE_TEXT =
  "3am. The ice maker and I have been talking. " +
  "We think you should go to bed. " +
  "The leftovers will still be disappointing tomorrow.";

function gate(text: string): void {
  // The sealed scorer accepts 1-140 UTF-8 characters, one line, non-blank.
  // Read back: the literal above is 126 chars, one line — inside the gate.
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} chars, gate needs 1-140`);
  }
  if (text.trim().length === 0 || text.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  gate(FRIDGE_TEXT);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), FRIDGE_TEXT, "utf8");
}

main();
