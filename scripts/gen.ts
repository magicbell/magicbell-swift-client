import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import * as fs from "node:fs/promises";

function hasChangesInPath(path: string) {
  try {
    execSync(`git diff --quiet HEAD ${path}`, { stdio: "ignore" });
    return false;
  } catch (error) {
    return true;
  }
}

async function build() {
  await fs.rm("output", { recursive: true, force: true });
  mkdirSync("output");

  let specPath = 'output/openapi.user.json'
  execSync(
    `curl -o ${specPath} https://site.magicbell.cloud/docs/api/openapi.user.json`,
    {
      stdio: "inherit",
    }
  );

  execSync(
    `swift run \
    swift-openapi-generator generate \
    --mode types --mode client \
    --access-modifier public \
    --output-directory Sources/MagicBellClient/generated \
    ${specPath}`,
    {
      stdio: "inherit",
    }
  );

  if (!hasChangesInPath("Sources")) {
    console.log("No changes detected in output.");
    return;
  }

  // Generating Documentation
  const sourcedocsVersion = execSync("sourcedocs version", {
    stdio: "ignore",
    encoding: "utf8",
  });
  if (sourcedocsVersion !== "SourceDocs v0.0.0 MB fork") {
    // Make sure you use the fork when running the script locally:
    // https://github.com/magicbell/SourceDocs/tree/magicbell
    console.error(
      "Expected MagicBell for of SourceDocs, but got a different build."
    );
    return;
  }
  
  execSync(
    "sourcedocs generate --clean --reproducible-docs -a -t -o=documentation",
    {
      stdio: "inherit",
    }
  );
}

void build().finally(async () => {
  await fs.rm("output", { recursive: true, force: true });
});
