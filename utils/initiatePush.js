
const { execSync } = require('child_process');

function getPushCommand() {
  try {
    const remote = execSync('git remote -v').toString().trim();
    if (!remote) {
      return null;
    }

    const currentBranch = execSync('git branch --show-current').toString().trim();
    if (!currentBranch) {
      return null;
    }

    return `git push origin ${currentBranch}`;

  } catch (error) {
    return null;
  }
}