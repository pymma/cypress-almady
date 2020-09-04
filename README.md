# cypress-almady

*Ce depôt git contient l'arborescence des tests et configurations afin de tester
l'IHM  du projet ALMADY en utilisant l'outil Cypress*

## Setup

###Version
NodeJS : v11.0.0
Cypress : 1.0.0
npm : 6.4.0

###Lien
*Not constant yet*

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


###Obtention des Résultats des tests[After Built]
  - configuration : pour l'obtention des résulats de tests dans jenkins sous forme de rapport
    *Coté Cypress*
    + dans le fichier cypress.json ajouter le code en dessous
      *"reporter": "junit",
      "reporterOptions": {
        "mochaFile": "cypress/results/my-test-output-[hash].xml",
        "toConsole": false
        }*
    + intaller les dépendances suivantes : 
    *Coté Jenkins*


###Mise En Place des ScreenShots et Videos avec cypress

1- Mise en place des screenShots :
   - Les screenShots peuvent etre insérer dans le code n'importe où en utilisant la fonction static BasePage.Screenshot(NAME), avec NAME désignant le nom de screen
   - Pour disposer de la fonction de screenShots il faut mettre l'attribut *'SCREEN'* à *true*(qui est par défault à false),
     dans le fichier de configuration 'config.js' qui se situe dans le répertoire 'classes'
   - Les screenshots pourront être retrouvés dans le répertoire *'screenShots'*

2- Mise en place des videos[Attention les videos ne sont disponibles que si il s'agit d'un éxécution à partir du terminal Ex:*cy:run*] :
   - Pour disposer de la fonction du recording il faut mettre l'attribut *'video'* à *true*(qui est par défault à false),
     dans le fichier de configuration *'cypress.json'*
   - Les videos sont record sous un format compressé ne garantissant pas une résolution optimale de la video(la fonction de compression peut être désactivé)
   - Les vidéos pourront être retrouvés dans le répertoire *'videos'*

###Fichier config.js

Le fichier *config.js* permet de centralisé toutes les informations paramétrables tel que : 
 - La possibilité de faire des screens avec la constante *SCREEN*
 - Les identifiants du 'super admin' soit LOGIN_USERNAME et LOGIN_PASSWORD
 - Les identifiants d'un 'fleet admin' soit LOGIN_FLEET et FLEET_PASSWORD
 - Le mot de passe par défaut utiliser lors du changement de mot de passe après la création d'un compte soit DRIVER_DEFAULT_PASSWORD
 - Les identifiants d'un 'driver' soit LOGIN_NUM et DRIVER_PASSWORD
 - Les identifiants d'un 'vendor' LOGIN_VENDOR et PASSWORD_ECOMMERCE
 - Les identifiants d'un 'ecommerce vendor' LOGIN_E_VENDOR et PASSWORD_ECOMMERCE
 - L'adresse de défaut pour la section "Available trip' soit CURRENT_ADRESSE  
 /!\ Attention les identifiants des différentes profils utilisés doivent avoir les sections "% list" non vide, il s'agit d'un condition indispensable au bon fonctionnement des tests du fichiers "DifferentProfile.spec.js" 

 ###Fichier de Test

- Complement.spec.js
  Ce fichier teste les sections 'manage' et 'Order' du Super Admin.

- DifferentProfile.spec.js
  Ce fichier teste les différents profiles soit un fleet admin, un driver, un E-commerce vendor, et un vendor

- Fleet-Shipments.spec.js
  Ce fichier teste les sections 'fleet' et 'Shipment'

- Trips.spec.js
  Ce fichier teste la section 'Trips'
 
- User.spec.js
  Ce fichier teste la section 'User'

- Vendor.spec.js
  Ce fichier teste les sections 'Vendor','E-commerce Vendor' et 'company' 

