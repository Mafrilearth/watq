import fs from "node:fs";
import path from "node:path";

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error("\x1b[31m[WATQ HOOK ERROR]\x1b[0m No commit message file path provided.");
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), commitMsgFile);

if (!fs.existsSync(resolvedPath)) {
  console.error(`\x1b[31m[WATQ HOOK ERROR]\x1b[0m File not found: ${resolvedPath}`);
  process.exit(1);
}

const rawMessage = fs.readFileSync(resolvedPath, "utf-8").trim();

// Skip automated merge and revert commits
if (
  rawMessage.startsWith("Merge branch") ||
  rawMessage.startsWith("Merge remote-tracking branch")
) {
  process.exit(0);
}

// Conventional Commits standard pattern
const conventionalCommitRegex =
  /^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\([a-zA-Z0-9_\-\/.]+\))?: .+/;

if (!conventionalCommitRegex.test(rawMessage)) {
  console.error("\n\x1b[31m[WATQ COMMIT POLICY REJECTED]\x1b[0m");
  console.error(`Received message: "\x1b[37m${rawMessage}\x1b[0m"`);
  console.error("\n\x1b[33mRequired format:\x1b[0m <type>(<scope>): <subject>");
  console.error(
    "\x1b[36mValid types:\x1b[0m    feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert",
  );
  console.error(
    "\x1b[36mExamples:\x1b[0m       feat(assess): implement psychometric dimension scoring",
  );
  console.error("                fix(web): resolve hydration mismatch in dark mode");
  console.error("                chore(tooling): configure Lefthook and Biome hooks\n");
  process.exit(1);
}

process.exit(0);
