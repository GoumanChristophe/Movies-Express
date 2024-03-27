# Movies-Express

Ce projet est une application web développée avec Express.js qui permet aux utilisateurs de visualiser, ajouter et modifier des informations sur les films. Elle utilise MongoDB pour le stockage des données et implémente l'authentification JWT pour sécuriser certaines routes.

## Démarrage

Ces instructions vous aideront à configurer le projet sur votre machine locale à des fins de développement et de test.

### Prérequis

- Node.js
- npm
- MongoDB

### Installation

Clonez le dépôt et installez les dépendances.

## Configuration
Créez un fichier config.js dans le répertoire racine avec les informations suivantes pour configurer votre base de données MongoDB :

const db = {
    user: 'votre_nom_utilisateur',
    password: 'votre_mot_de_passe'
};
exports.db = db;

### Lancement de l'application

 - node app.js
 - Accédez à http://localhost:3000 pour voir l'application en action.

## Fonctionnalités

 - Affichage des films
 - Ajout de nouveaux films
 - Modification des informations des films existants
 - Authentification et autorisation avec JWT
### Construit Avec : 

 - Express.js - Le framework web utilisé
 - MongoDB - Base de données
 - Mongoose - ODM pour MongoDB
 - JWT - Pour l'authentification

### Auteurs
Gouman Christophe 

### Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
