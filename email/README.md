# Email — Cercle Partenaire Urbafence (Zoho CRM)

Fichier d'envoi : **`urbafence-cercle-partenaire-email-hybride.html`**
HTML email autonome (tables + CSS inline + un `<style>` responsive). **Aucun JS, aucune CSS externe, aucune dépendance à la landing.**
À coller dans `Zoho CRM → Setup → Customization → Templates → Email → Contacts → Insert HTML`, puis **prévisualiser + envoi test**.

---

## Placeholders à remplacer avant envoi

| Placeholder | Remplacer par |
|---|---|
| `[URL_LOGO_URBAFENCE_PNG_A_REMPLACER]` | **Optionnel** — logo PNG/JPG hébergé (voir « Logo » ci-dessous) |

Déjà renseigné : **lien landing** (`https://landing-urba-fence.vercel.app/#urbafence`, boutons principal + final)
et **adresse postale** (6 rue de la Mare Blanche, 77186 Noisiel — Marne-la-Vallée).
Personnalisation Zoho : `${Contacts.First Name}` (prévoir un fallback « Bonjour, » si vide).

> ⚠️ **Liens désinscription & politique de confidentialité : RETIRÉS** à la demande.
> Rappel : en emailing B2B (RGPD/CNIL), un moyen d'**opt-out** reste attendu et son absence
> peut nuire à la **délivrabilité**. Si besoin, gérer la désinscription via le **lien natif Zoho**.

---

## Images utilisées (URLs absolues, déjà en place)

Servies depuis le site déployé sur Vercel — **aucun chemin relatif** :

| Rôle | URL |
|---|---|
| Hero / école | `https://landing-urba-fence.vercel.app/images/cours-ecole-securite-visuelle-urbafence.jpg` |
| Galerie — santé | `https://landing-urba-fence.vercel.app/images/hopitaux-urbafence.jpg` |
| Galerie — bâtiment public | `https://landing-urba-fence.vercel.app/images/gendarmerie-urbafence.jpg` |
| Galerie — local technique | `https://landing-urba-fence.vercel.app/images/local-velo-urbafence.jpg` |

> ⚠️ **Extensions** : les visuels `local-velo`, `local-poubelle`, `hors-ville` ont été **convertis en `.jpg`** sur la landing (compression performance). Le `.png` n'existe plus → toujours utiliser **`.jpg`** (un `.png` renverrait un 404).

### Logo
Le header utilise un **wordmark texte « Urbafence »** et la section « Urbafence en bref » un **monogramme « UF »** (rendu garanti, sans image).
Le **SVG ne s'affiche pas en email** : pour un vrai logo, héberger un **PNG** (~240 px header / ~34 px monogramme) et remplacer le bloc indiqué par `<img src="[URL_LOGO_URBAFENCE_PNG_A_REMPLACER]" …>` (commentaires d'aide présents dans le HTML).

---

## Compatibilité Zoho CRM / délivrabilité
- HTML autonome, tables, CSS inline, media query `max-width:600px`. Pas de JS, pas de CSS externe, pas de SVG comme logo final.
- Boutons « bulletproof » VML pour Outlook.
- Footer : adresse + raison de l'envoi conservées. Liens désinscription/confidentialité retirés (gérer l'opt-out via Zoho). Vérifier **SPF/DKIM/DMARC** et la base légale B2B.

## Checklist
- [ ] `[LIEN_LANDING_A_REMPLACER]` remplacé (×2) ; `${Contacts.First Name}` + fallback. (Adresse OK, liens opt-out retirés.)
- [ ] Logo : laisser le monogramme « UF » ou héberger un PNG et remplacer le bloc.
- [ ] Images : vérifier qu'elles s'affichent (site Vercel en ligne) ; extensions en `.jpg`.
- [ ] Collé dans Zoho CRM (Insert HTML) + **prévisualisé + envoi test à soi-même**.
- [ ] Rendu vérifié : Gmail (desktop + mobile), Outlook (desktop + web), Apple Mail/iPhone.
  Points sensibles : boutons VML Outlook, cartes en 1 colonne mobile, glyphes `%` `€` `✉` `UF`.
