# Email d'invitation — Cercle Partenaire Urbafence

Premier email HTML d'invitation envoyé aux contacts pros (clôturistes, poseurs,
paysagistes, entreprises d'aménagement / second œuvre). Objectif : faire découvrir
le **Cercle Partenaire** et obtenir une réponse simple — **« OK »**.

- Fichier : `invitation-cercle-partenaire.html`
- Autonome : ne dépend pas de `css/styles.css` ni de `js/script.js`, aucun JS, aucune dépendance externe.
- Compatible : structure en tables `role="presentation"`, CSS inline, boutons bulletproof (VML Outlook), responsive `@media (max-width:600px)`, largeur 600px.

---

## 1. Placeholders à remplacer avant envoi

| Placeholder | Description |
|---|---|
| `[LIEN_LANDING_A_REMPLACER]` | URL absolue de la landing Cercle Partenaire (3 occurrences : 2 boutons). |
| `[URL_LOGO_ABSOLUE_A_REMPLACER]` | URL **absolue** du logo Urbafence hébergé. ⚠️ Les clients mail ne rendent pas les SVG locaux → exporter `images/URBA_FENCE_FOND.svg` en **PNG** (ex. 84×110 px @2x) et l'héberger. `alt="Urbafence"` sert de repli si l'image est bloquée. |
| `[URL_IMAGE_HERO_ABSOLUE_A_REMPLACER]` | (Optionnel) prévu si vous ajoutez une image hero ; non utilisée par défaut pour rester léger et premium. |
| `[LIEN_DESINSCRIPTION_A_REMPLACER]` | Lien de désinscription fourni par votre outil d'envoi (souvent un merge tag, ex. `{{unsubscribe}}`). |

> Astuce : faites un simple rechercher/remplacer sur ces chaînes dans le HTML.

---

## 2. Objets d'email proposés

1. Invitation au Cercle Partenaire Urbafence
2. Activez vos conditions partenaires Urbafence
3. Un OK suffit pour rejoindre le Cercle Partenaire
4. Vos avantages partenaires Urbafence
5. Proposez Urbafence plus facilement sur vos projets

## 3. Préheaders proposés

1. Répondez OK : nous activons votre statut ou vous envoyons votre lien d'accès.
2. Des conditions dédiées pour les pros qui travaillent régulièrement avec Urbafence.
3. Compte existant ou non, l'activation reste simple.

> Le préheader actuellement intégré dans le HTML :
> « Un OK suffit pour activer ou recevoir votre accès partenaire Urbafence. »

---

## 4. Version texte (plain text) — à fournir en multipart

```
Bonjour,

Nous lançons le Cercle Partenaire Urbafence, pensé pour les professionnels qui
souhaitent proposer plus facilement nos clôtures occultantes en tôle perforée.

Le principe est simple : des conditions dédiées, une remise partenaire, un
configurateur en ligne et des outils pour avancer plus vite sur vos projets.

Vous avez déjà un compte Urbafence ? Répondez OK : nous activons votre statut partenaire.
Vous n'avez pas encore de compte ? Répondez OK : nous vous envoyons le lien d'activation.

Dans les deux cas, un simple OK suffit.

Le statut partenaire est valable 1 an ; pour prolonger vos avantages, il suffit de
concrétiser 3 commandes sur l'année. Projets éligibles à partir de 1 500 €.

Découvrir le programme :
[LIEN_LANDING_A_REMPLACER]

Bien à vous,
L'équipe Urbafence
```

---

## 5. Structure du mail (rappel)

Préheader invisible → Header (logo + « Invitation · Cercle Partenaire ») → Hero
(titre + sous-titre + bouton « Découvrir le programme ») → « Urbafence, en bref » →
« Ce que le Cercle vous apporte » (4 cartes) → Double cas compte / pas de compte
(bloc sombre) → « Un cadre simple » (1 an, 3 commandes, dès 1 500 €) → CTA final
(« Voir la page Cercle Partenaire » + « Un OK suffit ») → Footer + désinscription.

---

## 6. Points à tester avant envoi

- [ ] Remplacer **tous** les placeholders (liens, logo, désinscription).
- [ ] Héberger le logo en **PNG** (URL absolue) — pas de SVG local.
- [ ] Rendu sur **Gmail (web + app)**, **Outlook (desktop/365)**, **Apple Mail**, **Yahoo**.
- [ ] Vérifier le rendu **mobile** (colonnes empilées, boutons pleine largeur, pas de scroll horizontal).
- [ ] Vérifier l'aperçu du **préheader** dans la boîte de réception.
- [ ] Mode **sombre** : confirmer que le rendu reste clair et lisible.
- [ ] **Images bloquées** : le mail doit rester compréhensible (alt + texte HTML, pas de bouton image).
- [ ] Test **anti-spam** (Mail-Tester ou équivalent) : SPF/DKIM/DMARC du domaine d'envoi OK.
- [ ] La **réponse « OK »** arrive sur une boîte surveillée (vérifier le `Reply-To`).
- [ ] Liens cliquables et pointant vers la bonne landing (UTM si besoin).
- [ ] Version **texte** jointe (multipart) pour la délivrabilité.

---

## 7. Notes

- Le mail est volontairement **autonome** et n'inclut aucun asset de la landing.
- Aucun fichier de la landing (`index.html`, `css/`, `js/`) n'a été modifié.
- Ton commercial, rassurant, sans mentions d'urgence/obligation, conforme au brief.
