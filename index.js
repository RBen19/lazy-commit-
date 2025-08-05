#!/usr/bin/env node

console.log('Script lancé !');

const yargs = require('yargs/yargs'); // instance principale de yargs
const { hideBin } = require('yargs/helpers');
const { execSync } = require('child_process');
const inquirer = require('inquirer');
console.log('\x1b[34m%s\x1b[0m', 'Bienvenue dans Lazy Commit !');

// Vérification si le répertoire est un dépôt Git
function isGitRepository() {
  try {
    console.log('Vérification si le répertoire est un dépôt Git...');
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}
// genère le commit et avant vérifie si le répertoire est un dépôt Git
yargs(hideBin(process.argv)) // retire le node du chemin du script 
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'generate-commit',
    aliases: ['gc'],
    desc: 'Generate a conventional commit message',
    handler:async (argv) => {

      console.log('\x1b[34m%s\x1b[0m', "Generating a conventional commit...");
      if (!isGitRepository()) {
        console.error('\x1b[31m%s\x1b[0m', 'Error: You must be in a Git repository to use this command.');
        process.exit(1);
      }
        try {
        // 1. On récupère la liste des fichiers modifiés
        const status = execSync('git status --porcelain').toString().trim();
        if (!status) {
          console.log('\x1b[33m%s\x1b[0m', 'No files to commit. Please stage some files first.');
          return;
        }

             const files = status
                .split('\n')
                .filter(line => line.trim() !== '') // éviter les lignes vides
                .map(line => line.slice(2).trim()); // On extrait le nom du fichier à partir de la ligne de statut

        for (const file of files) {
          // 2. On génère un message pour chaque fichier
          const suggestedMessage = generateCommitMessage(file);

          // 3. On demande à l'utilisateur de valider
          const answers = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'shouldCommit',
              message: `Do you want to commit "${file}" with message: "${suggestedMessage}"?`,
              default: true,
            },
          ]);

          if (answers.shouldCommit) {
            // 4. Si validé, on exécute les commandes Git
            console.log('\x1b[32m%s\x1b[0m', `Committing "${file}"...`);
            execSync(`git add "${file}"`);
            execSync(`git commit -m "${suggestedMessage}"`);
            console.log('\x1b[32m%s\x1b[0m', `Successfully committed "${file}".`);
          } else {
            console.log('\x1b[33m%s\x1b[0m', `Skipping commit for "${file}".`);
          }
        }

      } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `An error occurred: ${error.message}`);
      }

      

      console.log('\x1b[32m%s\x1b[0m', 'Git repository detected. Ready to generate a commit!');
    }
    
  })
  .demandCommand(1, 'Please specify a valid command.')
  .help()
  .argv;

  // Fonction pour générer un message de commit basé sur le fichier
  function generateCommitMessage(filePath) {
  // Logique simple pour le moment : on se base sur l'extension
  const extension = filePath.split('.').pop();
  if (extension === 'md' || 
    filePath.includes('README') || 
    filePath.includes('docs') || 
    filePath.includes('documentation') || 
    filePath.includes('doc') || 
    filePath.includes('readme') 
) {
    return 'docs: update documentation';
  }
  if (extension === 'css' || extension === 'scss') {
    return 'style: update styles';
  }
  if (filePath.includes('test') || filePath.includes('spec')) {
    return 'test: update tests';
  }
  const gitStatus = execSync(`git status --porcelain "${filePath}"`).toString().trim();
  if (gitStatus.startsWith('A')) {
    return `feat: add ${filePath}`;
  }
  return `refactor: update ${filePath}`;
}
