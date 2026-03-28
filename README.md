# 🏨 Oubangui Hôtel — Menu Digital

Menu digital moderne pour le Restaurant de l'Oubangui Hôtel.
**Stack : Bun · Vite · React 18 · Tailwind CSS 3 · React Router v6**

---

## 📁 Structure du projet

```
oubangui-hotel-menu/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Barre de navigation + recherche
│   │   ├── ItemRow.jsx       # Ligne d'un plat avec prix
│   │   ├── QRCode.jsx        # Générateur QR code SVG
│   │   └── QRModal.jsx       # Modal QR code (popup)
│   ├── data/
│   │   └── menu.js           # Tous les plats (108 plats, 16 catégories)
│   ├── pages/
│   │   ├── MenuPage.jsx      # Page menu principale
│   │   └── AfichePage.jsx    # Affiche imprimable QR code
│   ├── App.jsx               # Routeur principal
│   ├── index.css             # Tailwind + styles globaux
│   └── main.jsx              # Point d'entrée React
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
└── .gitignore
```

---

## 🚀 Installation & Lancement

### Prérequis
- **Bun** installé : `curl -fsSL https://bun.sh/install | bash`

### Commandes

```bash
# 1. Installer les dépendances
bun install

# 2. Lancer en développement
bun dev
# → http://localhost:5173

# 3. Build pour production
bun run build

# 4. Prévisualiser le build
bun run preview
```

---

## ☁️ Déploiement sur Vercel

### Option A — Via CLI (recommandé)

```bash
# Installer Vercel CLI
bun add -g vercel

# Déployer (première fois)
vercel

# Répondre aux questions :
# - Set up and deploy? → Y
# - Which scope? → votre compte
# - Link to existing project? → N
# - Project name? → oubangui-hotel-menu
# - Directory? → ./  (laisser vide)
# - Override build settings? → N

# Déployer en production
vercel --prod
```

### Option B — Via GitHub (déploiement automatique)

1. Créer un dépôt GitHub :
```bash
git init
git add .
git commit -m "feat: menu digital Oubangui Hôtel"
git remote add origin https://github.com/VOTRE-USERNAME/oubangui-hotel-menu.git
git push -u origin main
```

2. Aller sur [vercel.com](https://vercel.com) → **New Project** → Importer votre repo

3. Vercel détecte Vite automatiquement. Cliquer **Deploy**.

4. Votre site est en ligne ! URL exemple : `https://oubangui-hotel-menu.vercel.app`

### Option C — Drag & Drop

```bash
bun run build
```
Glisser le dossier `dist/` sur [vercel.com/new](https://vercel.com/new).

---

## 🌐 Pages disponibles

| Route | Description |
|---|---|
| `/` | Menu complet (toutes catégories, recherche) |
| `/affiche` | Affiche imprimable avec QR Code |

---

## ✏️ Personnalisation

### Changer l'URL du QR Code
Dans `src/components/QRCode.jsx` et `src/pages/AfichePage.jsx` :
```
oubanguihotel.com/menu  →  votre-url-reelle.com/menu
```

### Ajouter / modifier un plat
Dans `src/data/menu.js` :
```js
{ name: "Nouveau Plat", price: 5000, desc: "Description courte du plat" },
```
Prix `null` = affiché "Inclus".

### Ajouter une catégorie
```js
"Nouvelle Catégorie": {
  icon: "🍽️",
  color: "#1d4ed8",
  bg: "#eff6ff",
  border: "#bfdbfe",
  tag: "Étiquette",
  items: [ ... ],
},
```

### Modifier les couleurs de l'hôtel
Dans `tailwind.config.js`, la palette `hotel` correspond aux teintes bleues.
Remplacer par vos couleurs personnalisées.

---

## 📋 Contenu du menu

| Catégorie | Plats |
|---|---|
| Entrées Froides | 5 |
| Entrées Chaudes | 4 |
| Potages | 3 |
| Volailles | 6 |
| Poissons | 12 |
| Bœuf | 7 |
| Agneau | 3 |
| Porc | 3 |
| Abats | 5 |
| Plats Régionaux | 10 |
| Pâtes | 5 |
| Omelettes | 7 |
| Sandwichs | 10 |
| Garnitures | 10 |
| Desserts | 6 |
| Carte des Vins | 9 |
| **Total** | **105** |

---

## ✅ Fonctionnalités

- 🔍 Recherche en temps réel dans tous les plats et descriptions
- 📂 Navigation par catégories (sidebar desktop, onglets scrollables mobile)
- 📱 QR Code SVG généré côté client (aucune librairie externe)
- 🖨️ Affiche imprimable avec fond dégradé et QR Code
- ⌨️ Fermeture modal au clavier (Échap)
- 🔗 Routing SPA avec React Router v6
- 📐 Design responsive (mobile-first)
- ⚡ Build ultra-rapide avec Bun + Vite

---

## 🛠️ Tech Stack

| Outil | Version | Rôle |
|---|---|---|
| Bun | latest | Runtime + package manager |
| Vite | 5.x | Bundler + dev server |
| React | 18.x | UI framework |
| React Router | 6.x | Routing SPA |
| Tailwind CSS | 3.x | Styles utilitaires |
| Framer Motion | 11.x | Animations (optionnel) |

---

*Oubangui Hôtel · Restaurant · Bangui, République Centrafricaine*
*Excellence & Tradition*
