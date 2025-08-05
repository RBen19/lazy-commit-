const { execSync } = require('child_process');

function isGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

module.exports = isGitRepository;
