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

## 2. Placeholders à remplacer (avant envoi)

| Placeholder | Remplacer par |
|---|---|
| `[URL_LOGO_ABSOLUE_A_REMPLACER]` | URL **https directe** du logo Urbafence (~240 px de large) |
| `[URL_IMAGE_ECOLE_ABSOLUE_A_REMPLACER]` | URL https directe de l'image hero (cour d'école), ~1168 px |
| `[URL_GALERIE_1_A_REMPLACER]` | Galerie 1 — Écoles & collectivités |
| `[URL_GALERIE_2_A_REMPLACER]` | Galerie 2 — Locaux techniques |
| `[URL_GALERIE_3_A_REMPLACER]` | Galerie 3 — Sites exposés |
| `[LIEN_LANDING_A_REMPLACER]` | URL de la landing « Cercle Partenaire » (apparaît sur les 2 CTA) |
| `[ADRESSE_POSTALE_A_REMPLACER]` | Adresse postale complète de l'expéditeur (Dampere) |
| `[LIEN_DESINSCRIPTION_A_REMPLACER]` | Lien de désinscription |
| `[LIEN_CONFIDENTIALITE_A_REMPLACER]` | URL de la politique de confidentialité (recommandé RGPD ; sinon retirer ce lien du footer) |

> Les 3 images de galerie pointent déjà vers `https://urbafence.com/blog/` (lien en dur, à conserver).
> Astuce : un simple **Rechercher/Remplacer** (`[`) permet de tous les retrouver.

---

## 3. Images : hébergement (point clé)

Dans un email, **les chemins locaux ne fonctionnent pas** (`images/x.jpg`, `../images/x.jpg`) :
la boîte mail du destinataire n'a pas accès à ton disque ni au dépôt.

➡️ **Toutes les images doivent être hébergées en ligne**, idéalement **sur urbafence.com**
(ou un CDN/hébergeur d'images), et référencées par des **URLs directes en https** pointant
**vers le fichier image** (pas vers une page HTML qui contient l'image).

- ✅ Correct : `https://urbafence.com/wp-content/uploads/.../ecole.jpg`
- ❌ Incorrect : `images/ecole.jpg` · `../images/ecole.jpg` · lien vers une page

Tailles / poids conseillés :
- Logo : ~240 px de large (affiché 120).
- Hero (école) : ~1168 px (affiché 584, retina ×2), **< ~300 Ko**.
- Galerie : ~368 px chacune (affiché 184, retina ×2), **< ~120 Ko/image**.

Toujours : `alt` (déjà présent), `width` défini, `display:block`. Le mail reste lisible **si les images ne chargent pas** (alt + texte porteur du message).

> Les images de la landing existent dans `/images/` du dépôt mais en **chemins locaux** :
> elles servent à `preview-local.html` uniquement. Pour l'envoi, héberge-les en ligne et colle les URLs https.

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

- [ ] Images **hébergées en ligne** (idéalement urbafence.com), URLs **https directes**, poids optimisé, `alt` OK.
- [ ] Tous les placeholders `[…]` remplacés (logo, hero, 3 galerie, landing, adresse, désinscription, confidentialité).
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
