const { execSync } = require("child_process");
const isGitRepository = require("../utils/isGitRepo");
const getPushCommand = require("../utils/initiatePush");

module.exports = {
  command: "generate-push",
  aliases: ["gp"],
  desc: "Push current branch to remote",
  handler: async () => {
    console.log("\x1b[34m%s\x1b[0m", "Preparing to push...");

    if (!isGitRepository()) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Error: You must be in a Git repository to use this command."
      );
      process.exit(1);
    }

    try {
      const pushCommand = getPushCommand();
      if (!pushCommand) {
        console.log(
          "\x1b[33m%s\x1b[0m",
          "No Git remote or branch detected. Cannot push."
        );
        return;
      }

      console.log("\x1b[34m%s\x1b[0m", `Running: ${pushCommand}`);
      execSync(pushCommand, { stdio: "inherit" });
      console.log("\x1b[32m%s\x1b[0m", "Push successful.");
    } catch (error) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `An error occurred during push: ${error.message}`
      );
    }
  },
};