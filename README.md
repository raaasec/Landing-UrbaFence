# Cercle Partenaire — Urbafence

Landing page du **Cercle Partenaire** d'Urbafence (clôtures sur béton ou muret pour les pros du bâtiment).

## Ouvrir la page

Deux façons, au choix :

- **Le plus simple :** double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.
- **Recommandé pendant que vous travaillez :** dans Cursor / VS Code, installez l'extension **« Live Server »**, puis faites un clic droit sur `index.html` → **« Open with Live Server »**. La page se recharge automatiquement à chaque modification.

> Une connexion internet est nécessaire au premier affichage : les polices (Google Fonts) et les images de démonstration (placehold.co) sont chargées en ligne.

## Où se trouve quoi

```
landing urban fence/
├── index.html          ← la page (structure + contenu)
├── css/
│   └── styles.css       ← tous les styles (couleurs, mise en page, animations)
├── js/
│   └── script.js        ← les interactions (apparitions, cartes flip, carrousel, étapes)
├── images/             ← vide pour l'instant : vos futures images
├── IMAGES.md            ← la liste des images à fournir + comment les remplacer
└── README.md            ← ce fichier
```

- **Le texte** se modifie dans `index.html`. Chaque grande partie est repérée par un commentaire en français (ex. `<!-- ====== HERO ====== -->`).
- **Les couleurs** se modifient en haut de `css/styles.css`, dans le bloc `:root` (variables `--brand-500`, etc.).
- **Les animations** sont dans `css/styles.css` (effets visuels) et `js/script.js` (comportements au scroll / clic).

## Remplacer les images

Tout est expliqué dans **`IMAGES.md`** : la liste des images, leur emplacement, ce qu'elles doivent montrer et la taille conseillée. Vous remplacez les liens un par un dans `index.html`.

## Zones réservées à la DSI

Le **haut de page (topbar)** et le **pied de page (footer)** ont été **vidés et isolés** : ils ne contiennent qu'un conteneur clairement commenté, prêt à recevoir le header / footer du site Urbafence actuel.

- Topbar → conteneur `<div id="dsi-topbar"></div>` (en haut de `index.html`)
- Footer → conteneur `<footer id="dsi-footer"></footer>` (en bas de `index.html`)

La DSI n'a qu'à coller le code existant dans ces deux conteneurs.

## Bouton « compte »

Les deux boutons principaux (hero + grand CTA) pointent vers **`https://urbafence.com/mon-compte/`** sous le libellé **« Accéder à mon compte »**. Pour changer l'URL ou le texte, cherchez `mon-compte` dans `index.html`.

## Reste à compléter

| Élément | Où | À remplacer par |
|---|---|---|
| `[LIEN_PRODUIT_URBAFENCE]` | Carrousel de motifs (lien actuel : `https://urbafence.com/`) | Les URL des pages produit, quand elles existeront |
| Images `IMG-...` | Toute la page | Vos photos (voir `IMAGES.md`) |

## Bon à savoir

- **Responsive** : la page s'adapte au mobile et à la tablette (testez en réduisant la fenêtre).
- **Accessibilité** : navigation au clavier, textes alternatifs sur les images, animations désactivées si l'utilisateur a réglé son système sur « réduire les animations ».
- **Aucune trace** de l'ancienne marque source : tout le contenu, les couleurs et les liens sont propres à Urbafence.
