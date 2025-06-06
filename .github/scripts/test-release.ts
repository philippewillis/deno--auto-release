#!/usr/bin/env deno run --allow-read --allow-write --allow-run --allow-env

/**
 * Test script for the auto-release functionality
 * This simulates a PR merge with conventional commits
 */

const testCommits = [
  "feat(auth): add OAuth2 authentication support",
  "fix(api): resolve timeout issue in user endpoint",
  "docs: update README with new installation steps",
  "feat!: migrate to new API structure\n\nBREAKING CHANGE: API endpoints have changed",
  "chore: update dependencies",
];

async function testRelease(bumpType: "major" | "minor" | "patch") {
  console.log(`\n🧪 Testing ${bumpType} release...`);

  const commitsJson = JSON.stringify(testCommits);

  const command = new Deno.Command("deno", {
    args: [
      "run",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      "--allow-env",
      "./tools/release.ts",
      "--bump-type",
      bumpType,
      "--pr-number",
      "123",
      "--pr-title",
      `Test ${bumpType} release`,
      "--commits",
      commitsJson,
    ],
  });

  const { code, stdout, stderr } = await command.output();

  if (code === 0) {
    console.log("✅ Release test successful!");
    console.log(new TextDecoder().decode(stdout));
  } else {
    console.log("❌ Release test failed!");
    console.error(new TextDecoder().decode(stderr));
  }

  return code === 0;
}

async function main() {
  const args = Deno.args;
  const bumpType = (args[0] as "major" | "minor" | "patch") || "patch";

  if (!["major", "minor", "patch"].includes(bumpType)) {
    console.log("Usage: deno run test-release.ts [major|minor|patch]");
    console.log("Example: deno run test-release.ts minor");
    return;
  }

  console.log("🚀 Testing auto-release functionality");
  console.log("Sample commits to be processed:");
  testCommits.forEach((commit, i) => {
    console.log(`  ${i + 1}. ${commit.split("\n")[0]}`);
  });

  await testRelease(bumpType);

  console.log("\n📁 Check these files for results:");
  console.log("  - deno.json (updated version)");
  console.log("  - CHANGELOG.md (new changelog entry)");
  console.log("  - RELEASE_NOTES.md (release notes)");
}

if (import.meta.main) {
  main().catch(console.error);
}
