#!/usr/bin/env node

console.log('Script lancé !');
const yargs = require('yargs');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

console.log('\x1b[34m%s\x1b[0m', 'Bienvenue dans Lazy Commit !');
function isGitRepository() {
  try {
    console.log('Vérification si le répertoire est un dépôt Git...');
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}
yargs()
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'generate-commit',
    aliases: ['gc'],
    desc: 'Generate a conventional commit message',
    handler: (argv) => {
      console.log('\x1b[34m%s\x1b[0m', "Generating a conventional commit...");
      if (!isGitRepository()) {
        console.error('\x1b[31m%s\x1b[0m', 'Error: You must be in a Git repository to use this command.');
        process.exit(1);
      }
      console.log('\x1b[32m%s\x1b[0m', 'Git repository detected. Ready to generate a commit!');
    }
  })
  .demandCommand(1, 'Please specify a valid command.')
  .help()
  .argv;