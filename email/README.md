# Email d'invitation — Cercle Partenaire Urbafence (version Zoho CRM)

Email HTML d'invitation envoyé **depuis Zoho CRM** à des contacts pros (clôturistes,
poseurs, paysagistes, entreprises d'aménagement / second œuvre). Objectif : une réponse
simple — **« OK »** — ou un clic vers la landing.

- Fichier : `invitation-cercle-partenaire.html`
- Autonome : aucun lien vers `css/styles.css` ni `js/script.js`, aucun JS, aucune dépendance externe.
- Compatible : tables `role="presentation"`, CSS inline + `<style>`, boutons bulletproof (VML Outlook), responsive `@media (max-width:600px)`, conteneur 600px, motif perforé discret via `radial-gradient` (ignoré proprement par Outlook → repli couleur).

---

## 1. Variables Zoho CRM utilisées

| Variable | Emplacement | Repli conseillé |
|---|---|---|
| `${Contacts.First Name}` | Titre hero + « Bonjour … » | **Important** : définir un repli « Bonjour, » / « Rejoignez… » si le prénom est vide (voir ci-dessous). |
| `${Accounts.Account Name}` *(optionnel)* | non inséré par défaut — disponible si vous voulez nommer l'entreprise | — |

### Gérer le prénom vide (recommandé)
Zoho permet une syntaxe de repli sur les champs de fusion. Si votre édition ne le gère pas,
créez **deux versions** du mail (avec / sans prénom) ou nettoyez le champ en amont. Variantes sans prénom :
- Titre hero : « Rejoignez le Cercle Partenaire Urbafence. »
- Ouverture : « Bonjour, »

---

## 2. Placeholders à remplacer avant envoi

| Placeholder | Description |
|---|---|
| `[LIEN_LANDING_A_REMPLACER]` | URL absolue de la landing (3 occurrences : 2 boutons + variantes mso). Ajoutez vos UTM si besoin. |
| `[URL_LOGO_ABSOLUE_A_REMPLACER]` | URL **absolue** du logo en **PNG** (≈ 80×104 px @2x). ⚠️ Pas de SVG local en email ; `alt="Urbafence"` sert de repli. |
| `[URL_IMAGE_ECOLE_ABSOLUE_A_REMPLACER]` | URL **absolue** de l'image hero (repo : `images/ecole-urbafence-2.jpg`), recadrée ~600×240. |
| `[LIEN_DESINSCRIPTION_A_REMPLACER]` | Lien/merge tag de désinscription de Zoho. |

---

## 3. Objets d'email proposés

1. `${Contacts.First Name}, invitation au Cercle Partenaire Urbafence`
2. Et si vous deveniez partenaire Urbafence ?
3. Un OK suffit pour activer vos avantages Urbafence
4. Vos conditions partenaires Urbafence
5. Proposez l'occultation sur mesure plus facilement
6. Invitation partenaire · Urbafence

## 4. Préheaders proposés

1. Compte existant ou non, répondez OK : nous nous occupons de la suite.
2. Remise, configurateur et conditions dédiées pour vos projets Urbafence.
3. Une invitation pour les pros qui peuvent proposer Urbafence régulièrement.

> Préheader intégré au HTML : « Un OK suffit pour activer ou recevoir votre accès partenaire Urbafence. »

---

## 5. Version texte (plain text) — multipart

```
Bonjour ${Contacts.First Name},

Nous lançons le Cercle Partenaire Urbafence et nous aimerions vous proposer d'en faire partie.

L'idée est simple : vous donner une bonne raison de penser à Urbafence dès qu'un projet
demande de l'occultation sur mesure.

Le Cercle vous donne accès à des conditions dédiées, une remise partenaire, un configurateur
en ligne et des supports pour présenter nos clôtures en tôle perforée à vos clients.

Que vous ayez déjà un compte Urbafence ou non, répondez simplement OK :
- si votre compte existe déjà, nous activons votre statut partenaire ;
- sinon, nous vous envoyons le lien d'activation.

Vous pouvez aussi consulter la page dédiée ici :
[LIEN_LANDING_A_REMPLACER]

Bien à vous,
L'équipe Urbafence
```

---

## 6. Structure du mail

Préheader invisible → Header (logo + « Invitation partenaire ») → **Hero image école** +
titre personnalisé + sous-titre + bouton « Voir le programme » + micro-CTA « Ou répondez OK » →
**« Pourquoi cette invitation ? »** (ouverture « Bonjour {prénom} ») → « Urbafence en bref »
(3 points) → « Ce que le Cercle vous apporte » (3 bénéfices + phrase « Vous gardez vos habitudes ») →
**Encart OK fusionné** (vert clair, « Intéressé ? Un OK suffit. », double cas en une phrase) →
CTA final « Découvrir le Cercle Partenaire » → Footer + désinscription.

---

## 7. Points à tester avant envoi

- [ ] Remplacer **tous** les placeholders + définir le **repli prénom** dans Zoho.
- [ ] Héberger **logo (PNG)** et **image école** en URLs absolues.
- [ ] Test d'aperçu Zoho avec un contact réel (vérifier le rendu de `${Contacts.First Name}`).
- [ ] Rendu **Gmail / Outlook (365 + desktop) / Apple Mail / Yahoo**.
- [ ] **Mobile** : 1 colonne, boutons pleine largeur, image fluide, pas de scroll horizontal.
- [ ] **Images bloquées** : mail compréhensible (alt + texte HTML, aucun bouton image).
- [ ] **Mode sombre** : rendu reste clair et lisible.
- [ ] `Reply-To` pointant sur une **boîte surveillée** (récupération des « OK »).
- [ ] Délivrabilité : SPF/DKIM/DMARC du domaine, test Mail-Tester, version texte multipart.
- [ ] Vérifier que le motif de fond reste **discret** (et absent/neutre sous Outlook, ce qui est OK).

---

## 8. Notes

- Plus personnalisé et plus visuel que la v1 : hero image, prénom, encart OK fusionné (fini les 2 colonnes répétitives), motif perforé discret.
- Aucun fichier de la landing modifié.
- Ton commercial, humain, rassurant — sans urgence/obligation, conforme au brief.
