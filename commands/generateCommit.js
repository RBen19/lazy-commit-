const { execSync } = require('child_process');
const inquirer = require('inquirer');
const isGitRepository = require('../utils/isGitRepo');
const generateCommitMessage = require('../utils/generateMessage');
const getPushCommand = require('../utils/initiatePush');
const fs = require('fs');
module.exports = {
  command: 'generate-commit',
  aliases: ['gc'],
  desc: 'Generate a conventional commit message',
  builder: (yargs) => {
      yargs.option('push', {
        alias: '-p',
        describe: 'Push the commit immediately after creation',
        type: 'boolean',
        default: false,
      });
    },
  handler: async () => {
    console.log('\x1b[34m%s\x1b[0m', 'Generating a conventional commit...');

    if (!isGitRepository()) {
      console.error('\x1b[31m%s\x1b[0m', 'Error: You must be in a Git repository to use this command.');
      process.exit(1);
    }

    try {
         const pushCommand = getPushCommand;
      if (!pushCommand && (argv.push || await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Aucun remote n\'a été détecté. Le push ne sera pas possible. Continuer ?',
        default: true
      }]).then(answers => answers.confirm))) {
        // Si l'utilisateur a forcé le push ou souhaite continuer sans remote, on l'avertit
        if(argv.push) {
          console.log('\x1b[33m%s\x1b[0m', 'Attention : Aucun remote détecté, la commande --push sera ignorée.');
        }
      }
      const status = execSync('git status --porcelain').toString().trim();
      if (!status) {
        console.log('\x1b[33m%s\x1b[0m', 'No files to commit. Please stage some files first.');
        return;
      }

        const files = status
  .split('\n')
  .filter(line => line.trim() !== '')
  .map(line => {
    // Extrait le nom du fichier après le code de statut
    const match = line.match(/^[ MADRCU?!]{1,2}\s+(.*)$/);
    return match ? match[1] : null;
  })
  .filter(file => file); // garde tous les fichiers listés
   let committedFiles = 0;
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
            committedFiles++;
        } else {
          console.log('\x1b[33m%s\x1b[0m', `Skipping commit for "${file}".`);
        }
      }
       


           if (committedFiles > 0) {
          if (pushCommand) {
            let shouldPush = argv.push;
            if (!shouldPush) {
              const pushAnswers = await inquirer.prompt([
                {
                  type: 'confirm',
                  name: 'shouldPush',
                  message: `Voulez-vous pousser les commits vers le dépôt distant avec la commande "${pushCommand}" ?`,
                  default: false,
                },
              ]);
              shouldPush = pushAnswers.shouldPush;
            }

            if (shouldPush) {
              console.log('\x1b[34m%s\x1b[0m', 'Push en cours...');
              execSync(pushCommand);
              console.log('\x1b[32m%s\x1b[0m', 'Push réussi.');
            } else {
              console.log('\x1b[33m%s\x1b[0m', 'Push ignoré. Les commits sont sauvegardés localement.');
            }
          } else {
            console.log('\x1b[33m%s\x1b[0m', 'Aucun dépôt distant (remote) n\'a été détecté. Le push est ignoré.');
          }
        }

      console.log('\x1b[32m%s\x1b[0m', 'Git repository detected. Ready to generate a commit!');
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', `An error occurred: ${error.message}`);
    }
  }
};
