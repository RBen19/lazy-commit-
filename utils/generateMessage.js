const { execSync } = require('child_process');

function generateCommitMessage(filePath) {
  const extension = filePath.split('.').pop();

  if (
    extension === 'md' ||
    filePath.toLowerCase().includes('readme') ||
    filePath.toLowerCase().includes('docs') ||
    filePath.toLowerCase().includes('doc') 
  ) {
    return 'docs: update documentation';
  }

  if (extension === 'css' || extension === 'scss') {
    return 'style: update styles';
  }

  if (filePath.toLowerCase().includes('test') || filePath.toLowerCase().includes('spec')) {
    return 'test: update tests';
  }

  try {
    const globalStatus = execSync('git status --porcelain').toString();
    const fileStatus = globalStatus.split('\n').find(line => line.includes(filePath));
    
    if (fileStatus) {
      const statusCode = fileStatus.substring(0, 2);
      if (statusCode.includes('?')) {
        return `feat: add ${filePath}`;
      }
      if (statusCode.includes('A')) {
        return `feat: add ${filePath}`;
      }
    }
  } catch {
    // ignore errors
  }

  return `refactor: update ${filePath}`;
}

module.exports = generateCommitMessage;
