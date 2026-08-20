import cron from 'node-cron';
import Contact, { IContact } from '../models/ContactModel';
import FollowUpTemplate from '../models/FollowUpTemplate';
import { sendTrackedEmail } from '../utils/emailService';
import { notify } from '../utils/notify';

const renderTemplate = (template: string, contact: IContact): string => {
  return template
    .replace(/{{\s*fullName\s*}}/gi, contact.fullName || '')
    .replace(/{{\s*company\s*}}/gi, contact.company || 'there')
    .replace(/{{\s*services\s*}}/gi, contact.services || 'our services')
    .replace(/{{\s*email\s*}}/gi, contact.email || '');
};

/**
 * Determines the next follow-up time for a contact based on its leadStatus
 * and current followUpStage, using the configured FollowUpTemplate sequence.
 * Sets nextFollowUpAt on the contact (does not send anything).
 */
export const scheduleNextFollowUp = async (contact: IContact): Promise<void> => {
  if (!contact.followUpEnabled || contact.unsubscribed || contact.status === 'replied') {
    if (contact.nextFollowUpAt) {
      contact.nextFollowUpAt = null;
      await contact.save();
    }
    return;
  }

  const template = await FollowUpTemplate.findOne({
    leadStatus: contact.leadStatus,
    stage: contact.followUpStage,
    active: true,
  });

  if (!template) {
    // No further stage configured — sequence complete
    contact.nextFollowUpAt = null;
    await contact.save();
    return;
  }

  const base = contact.lastFollowUpAt || contact.createdAt || new Date();
  contact.nextFollowUpAt = new Date(base.getTime() + template.delayHours * 60 * 60 * 1000);
  await contact.save();
};

/**
 * Finds all due follow-ups and sends them, then schedules the next stage.
 */
export const runFollowUpCycle = async (): Promise<{ sent: number; errors: number }> => {
  const now = new Date();
  const due = await Contact.find({
    followUpEnabled: true,
    unsubscribed: false,
    status: { $ne: 'replied' },
    nextFollowUpAt: { $lte: now },
  }).limit(100);

  let sent = 0;
  let errors = 0;

  for (const contact of due) {
    try {
      const template = await FollowUpTemplate.findOne({
        leadStatus: contact.leadStatus,
        stage: contact.followUpStage,
        active: true,
      });

      if (!template) {
        contact.nextFollowUpAt = null;
        await contact.save();
        continue;
      }

      const subject = renderTemplate(template.subject, contact);
      const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#222">${renderTemplate(
        template.body,
        contact
      ).replace(/\n/g, '<br/>')}</div>`;

      await sendTrackedEmail({
        to: contact.email,
        subject,
        html,
        type: 'auto_followup',
        contactId: contact._id as any,
        followUpStage: contact.followUpStage,
      });

      contact.followUpStage += 1;
      contact.lastFollowUpAt = now;
      contact.lastEmailSentAt = now;
      await contact.save();
      await scheduleNextFollowUp(contact);

      await notify(
        'followup_sent',
        'Follow-up email sent',
        `Stage ${template.stage + 1} follow-up sent to ${contact.fullName} (${contact.leadStatus})`,
        contact._id as any,
        { subject }
      );

      sent += 1;
    } catch (err) {
      errors += 1;
      console.error(`Follow-up send error for contact ${contact._id}:`, err);
    }
  }

  if (sent || errors) {
    console.log(`📨 Follow-up cycle: ${sent} sent, ${errors} errors`);
  }

  return { sent, errors };
};

let cronStarted = false;

export const startFollowUpCron = (): void => {
  if (cronStarted) return;
  cronStarted = true;
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', () => {
    runFollowUpCycle().catch(err => console.error('Follow-up cron error:', err));
  });
  // Also run shortly after boot to catch anything overdue
  setTimeout(() => {
    runFollowUpCycle().catch(err => console.error('Follow-up initial run error:', err));
  }, 15_000);
  console.log('⏰ Follow-up automation cron started (every 15 min)');
};
