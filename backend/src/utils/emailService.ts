import nodemailer from 'nodemailer';

const isDev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.EMAIL_PORT) || 587;

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
    subject: `New Contact: ${data.fullName} — ${data.services}`,
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

export const sendPartnershipEmail = async (data: Record<string, unknown>): Promise<void> => {
  await sendMail({
    from: `"Greatodeal Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Partnership Application — ${data.company}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:8px">
        <h2 style="color:#6EE7B7">New Partnership Application</h2>
        <pre style="background:#fff;padding:15px;border-radius:4px;overflow-x:auto">${JSON.stringify(data, null, 2)}</pre>
      </div>
    `,
  });
};
