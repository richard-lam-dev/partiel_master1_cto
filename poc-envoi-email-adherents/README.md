## Gestion des Adhésions de l'Association

Ce projet est un prototype pour gérer l'envoi de mails à tous les adhérents d’un cours, d’une catégorie de cours, ou inscrits en général.

### Prérequis

- Node.js (version 12 ou supérieure)
- npm (livré avec Node.js)
- SQLite (pour la base de données locale)

### Installation

#### Installation du Backend

1. Aller dans le Répository :

   ```bash
   cd poc-envoi-email-adherents
   ```

2. Créer un fichier .env à la racine du répertoire server et ajouter les variables suivantes :

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
TEST_EMAIL1=test1@example.com
TEST_EMAIL2=test2@example.com
TEST_EMAIL3=test3@example.com
TEST_PARENTAL_CONTACT1=parent1@example.com
TEST_PARENTAL_CONTACT2=parent2@example.com
```
Remplacez your-email@gmail.com et your-email-password par vos propres informations d'authentification, ainsi que les emails de test.

3. Installer les dépendances du serveur :

```bash
npm install
```
4. Démarrer le serveur backend :
```bash
node server.js
```
Installation du Client
1. Naviguer vers le répertoire client :
```bash
cd client
```
2. Installer les dépendances du client :
```bash
npm install
```

3. Démarrer l'application client :
```bash
npm start
```
Cela exécutera l'application en mode développement. Ouvrez http://localhost:3000 pour voir l'application dans votre navigateur.
