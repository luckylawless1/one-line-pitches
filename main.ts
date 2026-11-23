// A Day of One-Line Pitches — u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
// The entry is one original sentence (max 240 chars) that would convince a
// friend who has never coded to let an AI agent build their first app idea.
// The program writes that sentence to /output/entry.txt (UTF-8, 1-240 chars).

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Your app idea is already good enough — describe it in plain words on make.fun, let an AI agent build the first version while you watch, and keep the one you love without writing a single line of code.";

function main(): void {
  // Validate the entry before writing: one non-empty line, 1-240 chars,
  // exactly one sentence. The "make.fun" in the text holds a period that is
  // not a sentence end, so only punctuation followed by space or end counts.
  const text = LINE.trim();
  if (text.length === 0) {
    throw new Error("entry sentence must not be empty or whitespace-only");
  }
  if (text.length > 240) {
    throw new Error(`entry sentence is ${text.length} chars, over the 240-char limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const sentenceEnds = text.match(/[.!?](?=\s|$)/g) ?? [];
  if (sentenceEnds.length !== 1) {
    throw new Error(`entry must be exactly one sentence, found ${sentenceEnds.length} sentence ends`);
  }
  // The grader mounts /output: create it if missing, never remove it.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
}

main();
