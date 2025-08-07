const { execSync } = require('child_process');
const { getUserDefinedFolders, getFolderScope } = require("../utils/scope");
const path = require('path');
const fs = require('fs');
function generateCommitMessage(filePath) {
  const extension = filePath.split('.').pop();
  const folders = getUserDefinedFolders();
  const scope = getFolderScope(filePath, folders);
  if (
    extension === 'md' ||
    filePath.toLowerCase().includes('readme') ||
    filePath.toLowerCase().includes('docs') ||
    filePath.toLowerCase().includes('doc') 
  ) {
     return `docs(${scope}): update documentation`;
  }

  if (extension === 'css' || extension === 'scss') {
    return `style(${scope}): update styles`;
  }

  if (filePath.toLowerCase().includes('test') || filePath.toLowerCase().includes('spec')) {
    return `test(${scope}): update tests`;
  }
    if( filePath.toLowerCase().includes('config')  && scope === '' ) {
    return `config: update configuration file ${filePath}`;
  }

  try {
    const globalStatus = execSync('git status --porcelain').toString();
    const fileStatus = globalStatus.split('\n').find(line => line.includes(filePath));
    
    if (fileStatus) {
      const statusCode = fileStatus.substring(0, 2);
      if (statusCode.includes('?')) {
        return `feat(${scope}): add ${filePath}`;
      }
      if (statusCode.includes('A')) {
        return `feat(${scope}): add ${filePath}`;
      }
    }
  } catch {
    // ignore errors
  }
  if( scope === '' ) {
    return `update: update ${filePath}`;
  }
  return `update(${scope}): update ${filePath}`;

}

module.exports = generateCommitMessage;
