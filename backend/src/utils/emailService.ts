import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import EmailLog, { EmailLogType } from '../models/EmailLog';
import { Types } from 'mongoose';

const isDev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.EMAIL_PORT) || 587;
const API_PUBLIC_URL = process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 5001}`;

export type MailboxKey = 'sales' | 'zia';

interface Mailbox {
  address: string;
  label: string;
  transporter: nodemailer.Transporter;
}

// Every mailbox on the same domain shares EMAIL_HOST/EMAIL_PORT (Hostinger-style
// hosting) — only the user/pass differ per mailbox.
function buildTransporter(user: string, pass: string): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

const mailboxes: Record<MailboxKey, Mailbox> = {
  sales: {
    address: process.env.EMAIL_USER || '',
    label: 'Greatodeal Team',
    transporter: buildTransporter(process.env.EMAIL_USER || '', process.env.EMAIL_PASS || ''),
  },
  zia: {
    address: process.env.ZIA_EMAIL_USER || '',
    label: 'Zia | Greatodeal',
    // Falls back to the sales mailbox's transporter if zia's own credentials
    // aren't configured yet, so nothing breaks before .env is updated.
    transporter: process.env.ZIA_EMAIL_USER && process.env.ZIA_EMAIL_PASS
      ? buildTransporter(process.env.ZIA_EMAIL_USER, process.env.ZIA_EMAIL_PASS)
      : buildTransporter(process.env.EMAIL_USER || '', process.env.EMAIL_PASS || ''),
  },
};

function resolveMailbox(from?: MailboxKey): Mailbox {
  return mailboxes[from || 'sales'];
}

async function sendMail(options: nodemailer.SendMailOptions, from?: MailboxKey) {
  const mailbox = resolveMailbox(from);
  if (isDev) {
    console.log('\n📧 [DEV] Email not sent — logged instead:');
    console.log('  From mailbox:', mailbox.address || '(unconfigured)');
    console.log('  To:', options.to);
    console.log('  Subject:', options.subject);
    console.log('  Body:', typeof options.html === 'string' ? options.html.replace(/<[^>]+>/g, '') : options.text);
    return;
  }
  await mailbox.transporter.sendMail({ ...options, from: options.from || `"${mailbox.label}" <${mailbox.address}>` });
}

export const sendContactEmail = async (data: {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  services: string;
  message: string;
}): Promise<void> => {
  await sendMail({
    from: `"Greatodeal Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact: ${data.fullName} (${data.services})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:8px">
        <h2 style="color:#6EE7B7;border-bottom:2px solid #6EE7B7;padding-bottom:10px">New Contact Form Submission</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold;width:35%">Name:</td><td style="padding:8px">${data.fullName}</td></tr>
          <tr style="background:#f0f0f0"><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Company:</td><td style="padding:8px">${data.company || 'N/A'}</td></tr>
          <tr style="background:#f0f0f0"><td style="padding:8px;font-weight:bold">Phone:</td><td style="padding:8px">${data.phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Services:</td><td style="padding:8px">${data.services}</td></tr>
          <tr style="background:#f0f0f0"><td style="padding:8px;font-weight:bold">Message:</td><td style="padding:8px">${data.message}</td></tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:20px">Sent from greatodeal.com contact form</p>
      </div>
    `,
  });
};

export const sendReplyEmail = async (to: string, subject: string, htmlContent: string, from?: MailboxKey): Promise<void> => {
  await sendMail({ to, subject, html: htmlContent }, from);
};

/**
 * The same signature block already used in Hostinger, appended automatically
 * to every email the system sends (manual replies and automated follow-ups
 * both go through sendTrackedEmail below) so it doesn't have to be pasted in
 * by hand.
 */
const EMAIL_SIGNATURE_HTML = `
<div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; width: 400px; max-width: 100%; border-collapse: collapse;">
    <tbody>
      <tr>
        <td style="padding-top: 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e5e7eb;">
            <tbody>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td width="40" valign="middle" style="border-right: 1px solid #e5e7eb; padding-right: 10px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td height="24" width="24" style="padding-bottom: 5px;">
                          <a href="https://www.facebook.com/greatodealofficial/">
                            <img src="https://greatodeal.com/images/icons/facebook.png" width="24" height="24" alt="Facebook" style="display: block; border: 0;">
                          </a>
                          <br>
                        </td>
                      </tr>
                      <tr>
                        <td height="24" width="24" style="padding-bottom: 5px;">
                          <a href="https://www.instagram.com/greatodeal/">
                            <img src="https://greatodeal.com/images/icons/instagram.png" width="24" height="24" alt="Instagram" style="display: block; border: 0;">
                          </a>
                          <br>
                        </td>
                      </tr>
                      <tr>
                        <td height="24" width="24" style="padding-bottom: 5px;">
                          <a href="https://www.linkedin.com/company/greatodeal">
                            <img src="https://greatodeal.com/images/icons/linkedin.png" width="24" height="24" alt="LinkedIn" style="display: block; border: 0;">
                          </a>
                          <br>
                        </td>
                      </tr>
                      <tr>
                        <td height="24" width="24">
                          <a href="https://www.youtube.com/@GreatodealAI">
                            <img src="https://greatodeal.com/images/icons/youtube.png" width="24" height="24" alt="YouTube" style="display: block; border: 0;">
                          </a>
                          <br>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="80" valign="middle" align="center" style="padding: 0 12px;">
                  <img src="https://greatodeal.com/images/email_logo.png" width="64" height="64" alt="Greatodeal" style="border-radius: 50%; border: 3px solid #6EE7B7; display: block;">
                  <br>
                </td>
                <td valign="middle">
                  <div style="font-size: 15px; font-weight: bold; color: #111827; font-family: Arial, sans-serif; line-height: 1.3; white-space: nowrap;">Greatodeal AI Automation Agency</div>
                  <div style="font-size: 12px; color: #374151; font-family: Arial, sans-serif; margin-top: 3px;">
                    <span style="font-weight: 600;">Zia Shafique</span>
                    <span style="color: #9ca3af;">&nbsp;&middot;&nbsp;</span>
                    <span style="color: rgb(16, 185, 129); letter-spacing: 0.3px;">
                      <b>FOUNDER &amp; CEO</b>
                    </span>
                  </div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 8px 0;">
                    <tbody>
                      <tr>
                        <td style="border-top: 1px solid #e5e7eb; font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td width="42" align="left" valign="top" style="font-size: 9px; color: #9ca3af; font-weight: bold; letter-spacing: 0.5px; font-family: Arial, sans-serif; padding-top: 2px;">PHONE</td>
                        <td align="left" style="font-size: 12px; color: #111827; font-family: Arial, sans-serif; padding-bottom: 5px;">+92 301 1060841</td>
                      </tr>
                      <tr>
                        <td width="42" align="left" valign="top" style="font-size: 9px; color: #9ca3af; font-weight: bold; letter-spacing: 0.5px; font-family: Arial, sans-serif; padding-top: 2px;">EMAIL</td>
                        <td align="left" style="font-size: 12px; font-family: Arial, sans-serif; padding-bottom: 5px;">
                          <a href="mailto:sales@greatodeal.com" style="color: #10b981; text-decoration: none;">sales@greatodeal.com</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="42" align="left" valign="top" style="font-size: 9px; color: #9ca3af; font-weight: bold; letter-spacing: 0.5px; font-family: Arial, sans-serif; padding-top: 2px;">WEB</td>
                        <td align="left" style="font-size: 12px; font-family: Arial, sans-serif;">
                          <a href="https://greatodeal.com" style="color: #111827; text-decoration: none;">greatodeal.com</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

/**
 * Injects a 1x1 tracking pixel into an HTML email body so we can detect opens.
 */
const injectTrackingPixel = (html: string, trackingId: string): string => {
  const pixel = `<img src="${API_PUBLIC_URL}/api/email-tracking/pixel/${trackingId}.png" width="1" height="1" alt="" style="display:none;width:1px;height:1px;border:0" />`;
  if (html.includes('</body>')) return html.replace('</body>', `${pixel}</body>`);
  return `${html}${pixel}`;
};

/**
 * Sends an email while tracking opens. Creates an EmailLog record up-front,
 * embeds a tracking pixel, and sends via the shared transporter.
 * Returns the created EmailLog id (or null if contactId omitted and logging not desired).
 */
export const sendTrackedEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  type: EmailLogType;
  contactId?: string | Types.ObjectId;
  followUpStage?: number;
  from?: MailboxKey;
}): Promise<{ trackingId: string; emailLogId: Types.ObjectId }> => {
  const trackingId = uuidv4();
  const trackedHtml = injectTrackingPixel(`${options.html}${EMAIL_SIGNATURE_HTML}`, trackingId);

  const log = await EmailLog.create({
    contactId: options.contactId,
    trackingId,
    type: options.type,
    to: options.to,
    subject: options.subject,
    html: trackedHtml,
    followUpStage: options.followUpStage,
    status: 'sent',
  });

  try {
    await sendMail({ to: options.to, subject: options.subject, html: trackedHtml }, options.from);
  } catch (err: any) {
    log.status = 'failed';
    log.error = err?.message || 'Unknown send error';
    await log.save();
    throw err;
  }

  return { trackingId, emailLogId: log._id as Types.ObjectId };
};

export const sendPartnershipEmail = async (data: Record<string, unknown>): Promise<void> => {
  await sendMail({
    from: `"Greatodeal Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Partnership Application: ${data.company}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:8px">
        <h2 style="color:#6EE7B7">New Partnership Application</h2>
        <pre style="background:#fff;padding:15px;border-radius:4px;overflow-x:auto">${JSON.stringify(data, null, 2)}</pre>
      </div>
    `,
  });
};
