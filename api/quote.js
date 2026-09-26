/* Vercel Serverless Function — POST /api/quote
   Envoie la demande de devis par e-mail (avec le PDF en pièce jointe).
   Variables d'environnement (Vercel → Settings → Environment Variables) :
     SMTP_HOST, SMTP_PORT (465 ou 587), SMTP_USER, SMTP_PASS   → compte e-mail d'envoi
     MAIL_FROM   (optionnel) ex. "Site Valorise <no-reply@valorise.ma>" — par défaut SMTP_USER
     QUOTE_TO    (optionnel) destinataires, séparés par des virgules
                 par défaut : bhar.ayman@valorise.ma,info@valorise.ma
     SEND_CLIENT_COPY (optionnel) "true" pour envoyer aussi une copie au client */
const nodemailer = require('nodemailer');

const DEFAULT_TO = 'bhar.ayman@valorise.ma,info@valorise.ma';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s ?? '').slice(0, n).trim();
const isEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }

  if (b.website) return res.status(200).json({ ok: true }); // anti-spam (champ caché)

  const f = {
    ref: clip(b.ref, 40), lang: b.lang === 'en' ? 'en' : 'fr',
    company: clip(b.company, 120), name: clip(b.name, 120), phone: clip(b.phone, 40), email: clip(b.email, 160), msg: clip(b.msg, 2000)
  };
  if (!f.company || !(f.phone || isEmail(f.email))) return res.status(400).json({ ok: false, error: 'fields' });

  const rows = Array.isArray(b.rows) ? b.rows.slice(0, 20).map(r => [clip(r[0], 60), clip(r[1], 300)]) : [];
  let pdf = null;
  if (typeof b.pdf === 'string' && b.pdf.length < 4_000_000) pdf = Buffer.from(b.pdf, 'base64');
  const filename = /^[\w.\-]{1,120}\.pdf$/.test(b.filename || '') ? b.filename : `Demande-devis_${f.ref || 'site'}.pdf`;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return res.status(500).json({ ok: false, error: 'smtp_not_configured' });
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const to = process.env.QUOTE_TO || DEFAULT_TO;

  const table = rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5B6B60;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-weight:600;color:#123524">${esc(v)}</td></tr>`).join('');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px">
    <div style="background:#123524;color:#fff;padding:18px 22px;border-radius:8px 8px 0 0">
      <div style="color:#E4C792;font-size:12px;letter-spacing:1px">NOUVELLE DEMANDE DE DEVIS · SITE WEB</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">${esc(f.company)}</div>
      <div style="color:#C9DACE;font-size:13px">Réf. ${esc(f.ref)}</div>
    </div>
    <div style="border:1px solid #D8DED6;border-top:0;padding:16px 22px;border-radius:0 0 8px 8px">
      <table style="border-collapse:collapse;font-size:14px">${table}</table>
      ${f.msg ? `<p style="margin:14px 0 0;padding:10px 12px;background:#F4F6F1;border-radius:6px;font-size:14px">${esc(f.msg).replace(/\n/g, '<br>')}</p>` : ''}
      <p style="margin:16px 0 0;font-size:12px;color:#5B6B60">Récapitulatif PDF en pièce jointe. Répondre à cet e-mail répond directement au client${isEmail(f.email) ? '' : ' (pas d\'e-mail fourni : rappeler au ' + esc(f.phone) + ')'}.</p>
    </div></div>`;
  const text = rows.map(([k, v]) => `${k} : ${v}`).join('\n') + (f.msg ? `\n\n${f.msg}` : '');
  const attachments = pdf ? [{ filename, content: pdf, contentType: 'application/pdf' }] : [];

  try {
    await transporter.sendMail({
      from, to, replyTo: isEmail(f.email) ? f.email : undefined,
      subject: `Demande de devis ${f.ref} — ${f.company}`, text, html, attachments
    });
    if (process.env.SEND_CLIENT_COPY === 'true' && isEmail(f.email)) {
      const en = f.lang === 'en';
      await transporter.sendMail({
        from, to: f.email, replyTo: to.split(',')[0],
        subject: en ? `Your quotation request ${f.ref} — Valorise Maroc` : `Votre demande de devis ${f.ref} — Valorise Maroc`,
        text: en ? `Hello,\n\nThank you for your request. Our team will come back to you with an offer. Your summary is attached.\n\nValorise Maroc — Tanger Free Zone\n+212 6 66 28 52 39`
                 : `Bonjour,\n\nMerci pour votre demande. Notre équipe revient vers vous avec une offre. Votre récapitulatif est en pièce jointe.\n\nValorise Maroc — Tanger Zone Franche\n+212 6 66 28 52 39`,
        attachments
      });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('quote mail error', e && e.message);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
};
