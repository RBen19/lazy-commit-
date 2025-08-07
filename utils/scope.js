
const fs = require('fs');
const path = require('path');
function getUserDefinedFolders() {
  try {
    const config = fs.readFileSync('lazycommit.config.json', 'utf8');
    return JSON.parse(config).folders;
  } catch {
    return null;
  }
}
function getFolderScope(filePath, folderMap) {
  const parts = filePath.split(path.sep);
  for (let i = parts.length - 2; i >= 0; i--) {
    const folder = parts[i];
    if (folderMap && folderMap[folder]) {
      return folder;
    }
  }
  return '';
}

module.exports = {
  getUserDefinedFolders,
  getFolderScope
};