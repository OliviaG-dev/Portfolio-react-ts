# Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

## 🚀 À propos

Portfolio one-page d’**Olivia Gautheron** — fullstack builder : React, TypeScript, Node, Angular, Supabase et IA.

Expérience interactive en trois blocs : présentation (constellation « À propos »), galerie de projets filtrable, contact.

## 🛠️ Technologies utilisées

- **Frontend**

  - React.js
  - TypeScript
  - Vite
  - CSS moderne
  - React Router

- **Outils de développement**
  - ESLint
  - Prettier
  - pnpm

## 📂 Projets visibles

Sélection affichée dans la galerie (ordre = `src/assets/data/projects.json`). Les projets masqués restent dans le JSON avec `"hidden": true`.

### 📌 PlanMyJob

Une app intelligente qui simplifie votre recherche d’emploi grâce à des outils puissants pour candidater plus vite, mieux et plus efficacement.
**Technologies :** React, TypeScript, Supabase

### 🔮 Numora

Une expérience interactive de numérologie moderne, révélant tes énergies, cycles et chemins de vie.
**Technologies :** React, TypeScript

### 🐴 Stalloria

Un jeu de simulation d’élevage de chevaux centré sur la génétique, la gestion et les compétitions.
**Technologies :** Angular, Nx, TypeScript, Node.js

### 🎨 TerraCréa

Envie de partager vos créations artisanales, de découvrir celles des autres, de les évaluer ou même de les acheter ? Cette application est faite pour vous !
**Technologies :** TypeScript, React Native, Supabase

### 🌌 StarSnap

Chaque jour, un regard vers l’infini. Une image capturée par la NASA, un fragment d’univers livré à ton écran.
**Technologies :** React, TypeScript, Tailwind

### 🔮 TarotMind

Une app qui utilise l’IA pour interpréter les tirages de tarot et offrir des analyses claires.
**Technologies :** React, TypeScript, Node.js, IA

### 💶 Track€r

Track€r : l’app qui suit ton argent mieux que toi !!!
**Technologies :** React, TypeScript

### 🔁 SkillLoop

Une application de formation qui transforme la pratique quotidienne en compétences concrètes et mesurables.
**Technologies :** React, TypeScript

### 🎬 Pick&Play

Une app qui permet de centraliser, trier et découvrir tes films, séries et livres grâce à une interface intuitive en drag & drop.
**Technologies :** TypeScript, React

### 🗺️ MapPermis

Trace ton parcours. Maîtrise la route. Réussis ton permis. MapPermis rend la préparation simple, claire et motivante.
**Technologies :** TypeScript, React

### 🔧 RandomSims API

Une API pour RandomSims, qui permet de récupérer des défis aléatoires pour Les Sims 4.
**Technologies :** TypeScript, Node.js

### 📊 Indicium

Le tableau de bord électoral qui parle vrai. Visualise les résultats, compare les années en un clin d’œil.
**Technologies :** React, TypeScript, Tailwind

### 🜁 Linea Arcana

Une app qui révèle votre ligne de vie à travers les arcanes du Tarot de Marseille.
**Technologies :** React, TypeScript

### 🃏 DualArcana

DualArcana révèle la rencontre entre l’arcane de l’année et ton arcane personnel.
**Technologies :** React, TypeScript

### 🎲 RandomSims

Une app fun qui génère des défis aléatoires pour Les Sims 4. De quoi pimenter vos parties avec des situations inédites !
**Technologies :** React, TypeScript

### 🪐 AllZodiacs

Une app fun qui centralise instantanément les horoscopes du monde entier à partir d’une simple date de naissance !
**Technologies :** React, TypeScript

### 🎯 JobSniper

JobSniper analyse, filtre et détecte automatiquement les offres qui correspondent vraiment à ton profil.
**Technologies :** React, TypeScript

### 💎 Crystal Swipe

Swipe les situations et les émotions qui te ressemblent, et découvre les pierres qui résonnent le plus avec toi aujourd’hui. Simple, fun et inspirant !
**Technologies :** React, TypeScript

### 🚀 CVForgeAI

Votre CV, boosté par l’intelligence artificielle.
**Technologies :** React, TypeScript, Node.js, IA

### 🌿 Lumiel

Une app moderne et clé en main pour les praticiens énergétiques, conçue pour attirer des clients, gérer les rendez-vous et valoriser leur activité en toute simplicité.
**Technologies :** React, TypeScript, Supabase

### 📝 RéviPermis

Une app moderne conçue pour aider les candidats au permis à réviser efficacement les 100 questions officielles.
**Technologies :** React, TypeScript

### 🌌 Noctis

Un calendrier astrologique qui transforme l’astrologie en une expérience quotidienne simple, visuelle et intuitive.
**Technologies :** React, TypeScript

### 📚 The Dev Book

Ma bibliothèque vivante de projets.
**Technologies :** Angular, TypeScript

### Projets archivés (masqués)

Conservés dans `projects.json` avec `"hidden": true` : Booksy, LP - LOL, Portfolio, ChatBlog, Le Grimoire d’Aether, oh my food!

## ✨ Fonctionnalités

- **Présentation**

  - Intro « Fullstack builder » + constellation SVG animée
  - Cartes Presentation / Quest (easter eggs) avec fermeture ×
  - Tags ABOUT / PROJECTS / CONTACT avec tiret animé

- **Galerie de projets**

  - Cartes avec flip (hover desktop / tap mobile)
  - Filtrage par tags : React, TypeScript, Node.js, Angular, Nx, React Native, Supabase, IA, Tailwind
  - Affichage progressif (aperçu puis « voir tout »)
  - Données dans `src/assets/data/projects.json` (`hidden` pour masquer sans supprimer)

- **Modal projet**

  - Carrousel d’images + pagination (dots scrollables + compteur)
  - Images en `object-fit: contain` (pas de crop excessif)
  - Swipe mobile, navigation clavier

- **Contact**

  - Orbes (Profil, Code, Courriel, Parcours) avec reveal au scroll
  - Liens LinkedIn, GitHub, email et CV

- **Interface**
  - Design responsive (About centré sur mobile)
  - Animations et transitions soignées

## 🏗️ Structure du projet

```
src/
├── assets/
│   ├── data/           # Projets & quêtes (JSON)
│   └── images/         # Portraits, slides, icônes
├── components/
│   ├── AboutConstellation/
│   ├── Footer/
│   ├── Header/
│   ├── Modal/
│   ├── PresentationCard/
│   ├── ProgressBar/
│   └── QuestCard/
├── pages/
│   ├── Home.tsx
│   └── Home.css
├── services/           # Chargement data + interfaces
└── App.tsx
```

## 🚀 Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/OliviaG-dev/Portfolio-react-ts.git
```

2. Installez les dépendances :

```bash
pnpm install
```

3. Lancez le serveur de développement :

```bash
pnpm dev
```

## 🏗️ Build

Pour créer une version de production optimisée :

```bash
pnpm build
```

Cette commande :

- Compile et vérifie le code TypeScript
- Optimise et bundle les fichiers avec Vite
- Génère le dossier `dist/` prêt pour le déploiement

### Autres commandes utiles :

```bash
# Vérification du code (linting)
pnpm lint

# Aperçu du build en local
pnpm preview
```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📫 Contact

Pour toute question ou collaboration, n’hésitez pas à me contacter via [oliviagautherondev@gmail.com](mailto:oliviagautherondev@gmail.com) ou sur [LinkedIn](https://www.linkedin.com/in/olivia-gautheron-dev/).
