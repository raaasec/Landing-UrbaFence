# Email d'invitation — Cercle Partenaire Urbafence (Zoho CRM)

Email HTML autonome, à coller dans un **modèle d'email Zoho CRM** et envoyé en **mass email
depuis le module Contacts** (⚠️ **pas** Zoho Campaigns).

Fichiers :
- `invitation-cercle-partenaire.html` — **version d'envoi** (placeholders + URLs absolues).
- `preview-local.html` — **aperçu navigateur uniquement** (images via `../images/`, ne pas envoyer).
- `README.md` — ce document.

HTML tables + CSS inline + un `<style>` dans le `<head>` (resets + responsive). **Aucun JS, aucune CSS externe, aucune dépendance à la landing.**

---

## 0. Où coller le HTML dans Zoho CRM

`Zoho CRM → Setup → Customization → Templates → Email → (module) Contacts → Nouveau modèle → Insert HTML / Code view`
→ coller **tout** le contenu de `invitation-cercle-partenaire.html`, puis enregistrer et **prévisualiser**.

Puis : module **Contacts → sélectionner les contacts → Send Email / Mass Email → choisir ce modèle**.

> Vérifs Zoho CRM :
> - Après collage, l'éditeur peut reformater le code : **toujours prévisualiser** et faire un **envoi test à soi-même**.
> - Les champs de fusion CRM utilisent la syntaxe `${Contacts.First Name}` (déjà en place). C'est la syntaxe **CRM**, différente de Campaigns.
> - Le `<style>`/media query est conservé par Zoho CRM, mais le **responsive dépend du client mail** du destinataire (Gmail, Apple Mail le gèrent ; Outlook desktop non → le layout reste lisible en pleine largeur).

---

## 1. Rôle du mail

- Présenter rapidement **Urbafence** (clôture occultante en tôle perforée, sur mesure, Dampere).
- Présenter le **Cercle Partenaire** (conditions dédiées, configurateur, prix bloqués, support technique).
- Conduire vers la **landing** (CTA principal).
- Manifestation d'intérêt **sobre** : répondre simplement au mail (pas de « OK » répété, pas de formulaire).
- Galerie de **3 cas d'usage** en bas (liens vers le blog).

---

## 2. Placeholders restants à remplacer (avant envoi)

> ✅ **Les images sont déjà en URLs absolues** (site Vercel déployé) — plus aucun placeholder d'image.
> Il ne reste que des **liens/texte** à compléter :

| Placeholder | Remplacer par |
|---|---|
| `[LIEN_LANDING_A_REMPLACER]` | URL de la landing « Cercle Partenaire » (apparaît sur les 2 CTA — 4 occurrences avec les variantes Outlook) |
| `[ADRESSE_POSTALE_A_REMPLACER]` | Adresse postale complète de l'expéditeur (Dampere) |
| `[LIEN_DESINSCRIPTION_A_REMPLACER]` | Lien de désinscription |
| `[LIEN_CONFIDENTIALITE_A_REMPLACER]` | URL de la politique de confidentialité (recommandé RGPD ; sinon retirer ce lien du footer) |

> Le `[LIEN_LANDING_A_REMPLACER]` peut être renseigné avec `https://landing-urba-fence.vercel.app/`.
> Les 3 images de galerie pointent déjà vers `https://urbafence.com/blog/` (lien en dur, à conserver).

---

## 2 bis. Images utilisées dans l'email

Toutes les images sont servies en **URL absolue https** depuis le site Vercel déployé
(`https://landing-urba-fence.vercel.app/images/…`). **Aucun chemin relatif** dans le mail.

| Rôle | URL |
|---|---|
| Logo Urbafence | `https://landing-urba-fence.vercel.app/images/URBA_FENCE_FOND.svg` |
| Hero / école | `https://landing-urba-fence.vercel.app/images/cours-ecole-securite-visuelle-urbafence.jpg` |
| Galerie 1 — Écoles & collectivités | `https://landing-urba-fence.vercel.app/images/ecole-urbafence-2.jpg` |
| Galerie 2 — Locaux techniques | `https://landing-urba-fence.vercel.app/images/local-velo-urbafence.png` |
| Galerie 3 — Sites exposés | `https://landing-urba-fence.vercel.app/images/gendarmerie-urbafence.jpg` |

URLs disponibles si tu veux changer les visuels de galerie :
- Local poubelle : `https://landing-urba-fence.vercel.app/images/local-poubelle-urbafence.png`
- Santé / hôpital : `https://landing-urba-fence.vercel.app/images/hopitaux-urbafence.jpg`
- Long linéaire / hors centre-ville : `https://landing-urba-fence.vercel.app/images/hors-ville-urbafence.png`
- Fond CTA (si besoin) : `https://landing-urba-fence.vercel.app/images/cta-fond.jpg`

> ⚠️ **Logo en `.svg`** : le SVG **ne s'affiche pas** dans la plupart des clients mail
> (Gmail le bloque, Outlook ne le rend pas). Pour un rendu fiable du logo,
> **héberger une version PNG** (ex. `URBA_FENCE_FOND.png`, fond clair, ~240 px) et remplacer
> l'URL du logo dans le `<img>` du header. À défaut, le texte `alt="Urbafence — une solution Dampere"`
> s'affichera à la place. Les autres images (`.jpg` / `.png`) sont, elles, bien compatibles.

---

## 3. Images : hébergement (point clé)

Dans un email, **les chemins locaux ne fonctionnent pas** (`images/x.jpg`, `../images/x.jpg`, `/images/x.jpg`) :
la boîte mail du destinataire n'a pas accès à ton disque ni au dépôt.

➡️ **C'est déjà réglé** : les images sont servies en **URL absolue https** depuis le site déployé
sur Vercel (`https://landing-urba-fence.vercel.app/images/…` — voir §2 bis). Ce sont des URLs
**publiques et directes vers le fichier image**, donc compatibles Gmail / Outlook / Apple Mail.

- ✅ Correct : `https://landing-urba-fence.vercel.app/images/cours-ecole-securite-visuelle-urbafence.jpg`
- ❌ Incorrect : `images/ecole.jpg` · `../images/ecole.jpg` · `/images/ecole.jpg` · lien vers une page

Optionnel : si tu préfères servir les images depuis **urbafence.com**, ré-héberge-les là-bas et
remplace simplement le préfixe d'URL — la structure du mail reste identique.

Tailles déjà optimisées côté dépôt (hero ~0,5 Mo, galerie ~0,3 Mo). Toujours : `alt` (présent),
`width` défini, `display:block`. Le mail reste lisible **si les images ne chargent pas**
(alt + texte porteur du message).

---

## 4. Variable Zoho CRM (personnalisation)

- `${Contacts.First Name}` — utilisée dans le titre.
- **Fallback prénom vide** : définir une valeur par défaut sur le champ de fusion dans Zoho,
  ou utiliser un titre **sans prénom** : `Découvrez le Cercle Partenaire Urbafence.`
  (retirer `${Contacts.First Name}, ` et veiller à ne pas laisser de virgule orpheline).

Autres variables possibles : `${Contacts.Last Name}`, `${Accounts.Account Name}`, `${Contacts.Company}`, `${Contacts.Email}`.

---

## 5. Objets d'email proposés

1. `${Contacts.First Name}, découvrez le Cercle Partenaire Urbafence`
2. `Invitation au Cercle Partenaire Urbafence`
3. `Vos conditions partenaires Urbafence`
4. `Proposez l'occultation sur mesure plus facilement`
5. `Cercle Partenaire Urbafence : conditions dédiées et configurateur`

## 6. Préheaders proposés (≤ ~110 car.)
1. `Clôtures occultantes en tôle perforée, conditions dédiées et configurateur en ligne.`
2. `Découvrez le programme partenaire pensé pour vos projets d'occultation.`
3. `Compte existant ou non, nous vous orientons vers le bon accès.`
> Un préheader par défaut est déjà inclus (bloc invisible en haut du HTML).

---

## 7. RGPD / délivrabilité

Footer déjà câblé : « Urbafence · une solution Dampere » + adresse, raison de l'envoi, désinscription, confidentialité.
À vérifier :
- **Base légale** B2B (intérêt légitime, contacts pertinents) ; tenir à jour et **respecter les désinscriptions**.
- **SPF / DKIM / DMARC** sur le domaine d'envoi.
- Adapter la phrase « raison de l'envoi » à la base réelle (ne pas prétendre un consentement non vérifié).
- Vocabulaire anti-spam : éviter urgent, gratuit, offre exceptionnelle, dernière chance, garantie absolue… Ne pas écrire « conforme Vigipirate » / « sécurité garantie ».
- Bon ratio texte/images, peu de liens, `alt` présents.

---

## 8. Version texte brut (champ « version texte » Zoho si disponible)

```
Bonjour ${Contacts.First Name},

Nous vous présentons le Cercle Partenaire Urbafence, un programme pensé pour les
professionnels qui souhaitent proposer plus facilement nos clôtures occultantes
en tôle perforée.

Urbafence est une solution Dampere fabriquée sur mesure pour les projets où il faut
limiter les vues directes, préserver l'intimité et soigner le rendu architectural.

Le Cercle vous donne accès à des conditions dédiées, un configurateur en ligne,
des prix bloqués pendant la validation du chantier et un support technique dédié.

Découvrez la page dédiée :
[LIEN_LANDING_A_REMPLACER]

Si le principe vous intéresse, vous pouvez simplement répondre à ce mail.
Compte existant ou non, nous vous orienterons vers le bon accès.

Conditions valables 1 an · 3 commandes pour conserver vos avantages ·
projets éligibles à partir de 1 500 €.

Bien à vous,
L'équipe Urbafence

—
Urbafence · une solution Dampere
[ADRESSE_POSTALE_A_REMPLACER]
Se désinscrire : [LIEN_DESINSCRIPTION_A_REMPLACER]
```

---

## 9. Checklist avant envoi

- [ ] Images : URLs absolues Vercel déjà en place — vérifier qu'elles **s'affichent** (site déployé en ligne).
- [ ] **Logo** : remplacer le `.svg` par un **`.png` hébergé** (le SVG ne s'affiche pas en mail). Voir §2 bis.
- [ ] Placeholders **liens/texte** remplacés : `[LIEN_LANDING…]`, `[ADRESSE_POSTALE…]`, `[LIEN_DESINSCRIPTION…]`, `[LIEN_CONFIDENTIALITE…]`.
- [ ] `[LIEN_LANDING_A_REMPLACER]` → landing déployée (testé).
- [ ] HTML collé dans le modèle Zoho CRM (Insert HTML) **+ prévisualisé**.
- [ ] Variable `${Contacts.First Name}` valide + fallback prénom.
- [ ] Objet + préheader choisis.
- [ ] Désinscription fonctionnelle.
- [ ] SPF / DKIM / DMARC OK.
- [ ] **Envoi test à soi-même** + relecture (orthographe, fusion, rendu).

## 10. Clients à tester
Gmail (desktop web + app mobile) · Outlook (desktop + web) · Apple Mail / iPhone.
Points d'attention : **boutons** (VML Outlook), **stack 1 colonne** mobile (cases + galerie),
fond uni Outlook, **emojis d'icônes** (sinon remplacer par de petites images hébergées).
