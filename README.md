# SERTSHAPP — prototype mobile Expo

Ce projet est un prototype d'interface React Native / Expo. Il n'est pas encore un réseau social opérationnel : les comptes réels, la synchronisation des publications, les conversations, le stockage cloud et les notifications restent à développer et sécuriser.

## Générer un APK Android avec Expo EAS Build

Le profil `preview` est configuré pour produire un fichier APK installable directement sur Android.

### Prérequis
- Un compte Expo : https://expo.dev/signup
- Un dépôt GitHub contenant les fichiers de ce dossier à sa racine.

### Compilation cloud depuis le tableau de bord Expo
1. Créer un compte sur Expo et un dépôt GitHub.
2. Téléverser à la racine du dépôt les fichiers `App.js`, `package.json`, `app.json`, `eas.json` et `README.md`.
3. Dans Expo, créer/ouvrir un projet et connecter le dépôt GitHub via les paramètres GitHub du projet.
4. Dans la page Builds, choisir **Build from GitHub**, sélectionner la branche, la plateforme **Android** et le profil **preview**.
5. Une fois le build terminé, ouvrir le lien de l'artefact APK sur le téléphone Android, télécharger le fichier puis l'ouvrir pour installer l'application.

Documentation officielle : https://docs.expo.dev/build-reference/apk/ et https://docs.expo.dev/building-from-github/.

## Lancer avec un terminal (si disponible)
```bash
npm install
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

## Fonctionnalités du prototype
- Identité visuelle bleu et blanc SERTSHAPP.
- Écrans de démonstration : connexion, accueil, messages, publication, alertes et profil.
- Publications locales de démonstration.

## À construire avant un lancement public
- Authentification réelle par téléphone/e-mail et vérification des numéros.
- Base de données, stockage des médias et règles de sécurité.
- Messagerie temps réel, notifications et appels audio/vidéo.
- Modération, signalement, blocage, confidentialité et sauvegardes.
- Tests sur appareils Android/iOS, politique de confidentialité et préparation des stores.
