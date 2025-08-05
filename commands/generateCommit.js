const { execSync } = require('child_process');
const inquirer = require('inquirer');
const isGitRepository = require('../utils/isGitRepo');
const generateCommitMessage = require('../utils/generateMessage');
const fs = require('fs');
module.exports = {
  command: 'generate-commit',
  aliases: ['gc'],
  desc: 'Generate a conventional commit message',
  handler: async () => {
    console.log('\x1b[34m%s\x1b[0m', 'Generating a conventional commit...');

    if (!isGitRepository()) {
      console.error('\x1b[31m%s\x1b[0m', 'Error: You must be in a Git repository to use this command.');
      process.exit(1);
    }

    try {
      const status = execSync('git status --porcelain').toString().trim();
      if (!status) {
        console.log('\x1b[33m%s\x1b[0m', 'No files to commit. Please stage some files first.');
        return;
      }

     const files = status
  .split('\n')
  .filter(line => line.trim() !== '')
  .map(line => line.slice(3).trim()) // slice(3) pour ignorer le code de statut + espace
  .filter(file => fs.existsSync(file)); 
      for (const file of files) {
        const suggestedMessage = generateCommitMessage(file);

        const { shouldCommit } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'shouldCommit',
            message: `Do you want to commit "${file}" with message: "${suggestedMessage}"?`,
            default: true,
          },
        ]);

        if (shouldCommit) {
          console.log('\x1b[32m%s\x1b[0m', `Committing "${file}"...`);
          execSync(`git add "${file}"`);
          execSync(`git commit -m "${suggestedMessage}"`);
          console.log('\x1b[32m%s\x1b[0m', `Successfully committed "${file}".`);
        } else {
          console.log('\x1b[33m%s\x1b[0m', `Skipping commit for "${file}".`);
        }
      }

      console.log('\x1b[32m%s\x1b[0m', 'Git repository detected. Ready to generate a commit!');
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', `An error occurred: ${error.message}`);
    }
  }
};
