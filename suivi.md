## Suivi du projet 
1. créer un dossier avec le nom du projet 
2. se déplacer dans le dossier 
3. initialiser avec npm 
4. créer le fichier index.js (entré du projet )
5. installer yargs(pour récupérer les réponses utilisateur les parser et aussi pour les commande custom) inquirer(pour le feedback utilisateur)
6. créer un lien symbolique entre la commande lazy et le fichier index.js dans le package.json 
7. ajouter le shebang pour l'entré du script afin que le contenu de index.js s'éxecute quand node est installer partout sur l'env de la marchine 
## tree ascii du projet à ce stade : 
-- commande :tree /home/mercielbeni/lazy-commit -I 'node_modules'


├── index.js
├── package.json
├── package-lock.json
└── suivi.md

8. fix des erreurs du projet ( plus de précision dans l'historique git)
9. mise en place de la logique de génération de message de commit selon de status de git status --porcelain
10. utilisation des commandes git comme : git status --porcelain(machine-friendly),git add et git commit pour la generation de message de commit et de commit 
11. factorisation du code pour nettoyer l'index création des composants : commands et utils
11. nettoyae de l'index du projet et utilisation des nouveaux composant

