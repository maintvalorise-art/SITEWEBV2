# Valorise Maroc — Site Palettes

Site statique (HTML / CSS / JS, sans build). Configurateur 3D (Three.js via cdnjs), bilingue FR / EN.

## Structure
```
index.html        page unique
css/style.css     styles
js/pallet3d.js    palette 3D (assemblage animé, rotation à la souris / au doigt)
js/app.js         traductions EN, configurateur, courbe NIMP 15, formulaire devis
assets/           logos, photos (extraites de la brochure)
vercel.json       cache des images
```

## Mise en ligne (GitHub + Vercel)
1. GitHub → New repository → `valorise-palettes` → Create.
2. « uploading an existing file » → glisser TOUT le contenu du dossier (pas le dossier lui-même) → Commit.
3. vercel.com → Add New → Project → Import le repo → Framework Preset : **Other** → Deploy.
4. Domaine : Vercel → Project → Settings → Domains → ajouter `valorisemaroc.ma` puis mettre les DNS indiqués chez le registrar.

Chaque commit sur GitHub redéploie automatiquement.

## Modifier
- Textes FR : directement dans `index.html`. Textes EN : objet `EN` dans `js/app.js` (même clé `data-i18n`).
- Numéro WhatsApp / e-mail du formulaire : `WA` et `MAIL` dans `js/app.js`.
- Photos : remplacer les fichiers dans `assets/` en gardant le même nom.

## Formulaire devis
Pas de serveur : le bouton prépare le message et ouvre WhatsApp (+212 6 66 28 52 39) ou l'e-mail (info@valorise.ma).
