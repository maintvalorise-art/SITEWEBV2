# Valorise Maroc — Site palettes (v1.2)

## Contenu
```
index.html      site complet (CSS, JS, images intégrés)
api/quote.js    fonction Vercel : envoie la demande de devis par e-mail avec le PDF
package.json    dépendance nodemailer (installée automatiquement par Vercel)
vercel.json     configuration
```

## Mise en ligne
1. GitHub : remplacer les fichiers du repo par TOUT le contenu de ce dossier (garder le dossier `api/`).
   Astuce : sur github.com, glisser-déposer les fichiers ET le dossier `api` depuis l'explorateur (ne pas utiliser « choose your files », qui ignore les dossiers).
2. Vercel redéploie automatiquement.

## Activer l'envoi direct par e-mail (une seule fois)
Vercel → Project → Settings → Environment Variables → ajouter :

| Nom | Exemple | Obligatoire |
|---|---|---|
| SMTP_HOST | smtp.office365.com / smtp.gmail.com / mail.valorise.ma | oui |
| SMTP_PORT | 587 (ou 465) | oui |
| SMTP_USER | no-reply@valorise.ma | oui |
| SMTP_PASS | mot de passe du compte (ou mot de passe d'application) | oui |
| MAIL_FROM | Site Valorise <no-reply@valorise.ma> | non |
| QUOTE_TO | bhar.ayman@valorise.ma,info@valorise.ma | non (valeur par défaut) |
| SEND_CLIENT_COPY | true | non (copie du PDF au client) |

Puis Deployments → ⋯ → Redeploy.
Les paramètres SMTP sont donnés par votre hébergeur e-mail (celui de @valorise.ma).

Tant que le SMTP n'est pas configuré, le site continue de fonctionner : le client télécharge son PDF
et on lui propose d'envoyer la demande par WhatsApp ou par e-mail.

## Modifier
- Destinataires : variable QUOTE_TO dans Vercel (pas besoin de toucher au code).
- Numéro WhatsApp / e-mails de secours : bloc `VM_CONFIG` au début du script dans `index.html`.
