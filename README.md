# cypress-onisep

*Ce depôt git contient l'arborescence des tests et configurations afin de tester
l'IHM  du projet ONISEP en utilisant l'outil Cypress*

## Setup

###Version
NodeJS : v9.9.0
Cypress : 1.0.0
npm : 5.6.0

###Lien
le lien de l'IHM de test est : "http://moa.onisep.pymma-software.net/"

## Jenkins

*Les informations données ci-dessous concernant l'utilisation de Jenkins en Local*

1- Aller à l'adresse suivante : https://www.jenkins.io/download/
2- Télécharger la version correspondante à votre distribution
3- copier le fichier téléchager du format "jenkins.war" dans la racine de votre répertoire de test
4- lancer la commande suivante depuis la racine de votre répertoire de test : java -jar jenkins.war -httpPort=8080 --enable-future-java
5- ouvrir un navigateur puis aller sur le port 8080 en localhost
6- Si c'est la première connexion, copier le mot de passe données dans le terminal de commande, sinon identifiez vous
7- Sinon entrée les informations demandées(remplit normalement lors du premier accès, voir id.txt)
8- Crée un build (projet Freestyle)
9- Configurer le projet
10- Lancer le build

###configuration
les builds sont paramétrables dans la section Configurer après avoir crée un projet

1- Dans la section général, Cliquer sur "Ce build a des paramètre"
2- Remplir les différentes cases de "Paramètre choix" :
   -- Nom  : mettre le nom d'une variable aléatoire référencant le paramètre[appelons la X]
   -- Choix : mettre dans l'ordre les différents choix selon leurs ordres d'utilisation[Chaque choix sera séparer par un retour à la ligne ]
   -- Description : correspond à un message de description sur les différents choix
3- Dans la section build,cliquer sur ajouter une étape au build, puis selectionner Executer un script shell
4- Remplir la case commande(correspondant à une commande shell. la variable X remplit précedemment peut être utilisé dans la commande shell de la facon suivante : "$nom-de-la-variable" dans notre cas ici "$X"
