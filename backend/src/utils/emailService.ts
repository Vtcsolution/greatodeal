import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import EmailLog, { EmailLogType } from '../models/EmailLog';
import { Types } from 'mongoose';

const isDev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.EMAIL_PORT) || 587;
const API_PUBLIC_URL = process.env.API_PUBLIC_URL || `http://localhost:${process.env.PORT || 5001}`;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendMail(options: nodemailer.SendMailOptions) {
  if (isDev) {
    console.log('\n📧 [DEV] Email not sent — logged instead:');
    console.log('  To:', options.to);
    console.log('  Subject:', options.subject);
    console.log('  Body:', typeof options.html === 'string' ? options.html.replace(/<[^>]+>/g, '') : options.text);
    return;
  }
  await transporter.sendMail(options);
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

export const sendReplyEmail = async (to: string, subject: string, htmlContent: string): Promise<void> => {
  await sendMail({
    from: `"Greatodeal Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
};

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
}): Promise<{ trackingId: string; emailLogId: Types.ObjectId }> => {
  const trackingId = uuidv4();
  const trackedHtml = injectTrackingPixel(options.html, trackingId);

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
    await sendMail({
      from: `"Greatodeal Team" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: trackedHtml,
    });
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
