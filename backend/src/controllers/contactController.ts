import { Request, Response } from 'express';
import Contact, { LeadStatus } from '../models/ContactModel';
import { sendContactEmail, sendTrackedEmail, MailboxKey } from '../utils/emailService';
import { notify } from '../utils/notify';
import { scheduleNextFollowUp } from '../services/followUpEngine';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.create(req.body);
    await sendContactEmail(req.body).catch(err => console.error('Email error:', err));
    await notify(
      'new_lead',
      'New lead received',
      `${contact.fullName} submitted a contact request about ${contact.services}`,
      contact._id as any
    ).catch(() => {});
    // Kick off the automated follow-up sequence for this new (cold-by-default) lead
    await scheduleNextFollowUp(contact).catch(err => console.error('Follow-up scheduling error:', err));
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting contact', error });
  }
};

export const getAllContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts', error });
  }
};

export const replyToContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contactId, to, subject, message, from } = req.body as { contactId: string; to: string; subject: string; message: string; from?: MailboxKey };
    if (!to || !subject || !message) {
      res.status(400).json({ success: false, message: 'to, subject, and message are required' });
      return;
    }
    await sendTrackedEmail({
      to,
      subject,
      html: `<div style="font-family:Arial,sans-serif">${message}</div>`,
      type: 'manual_reply',
      contactId,
      from,
    });
    await Contact.findByIdAndUpdate(contactId, {
      status: 'replied',
      repliedAt: new Date(),
      lastEmailSentAt: new Date(),
      // Manual reply pauses automation for this lead until re-enabled or status changed
      followUpEnabled: false,
      nextFollowUpAt: null,
    });
    res.json({ success: true, message: 'Reply sent successfully' });
  } catch (error: any) {
    console.error('Reply email error:', error?.message || error);
    res.status(500).json({ success: false, message: 'Error sending reply', error: error?.message || 'Unknown error' });
  }
};

export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leadStatus } = req.body as { leadStatus: LeadStatus };
    if (!['cold', 'warm', 'urgent'].includes(leadStatus)) {
      res.status(400).json({ success: false, message: 'Invalid leadStatus' });
      return;
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { leadStatus, followUpStage: 0, nextFollowUpAt: null },
      { new: true }
    );
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    await scheduleNextFollowUp(contact);
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating lead status', error });
  }
};

export const toggleFollowUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { followUpEnabled } = req.body as { followUpEnabled: boolean };
    const contact = await Contact.findById(req.params.id);
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    contact.followUpEnabled = !!followUpEnabled;
    if (!contact.followUpEnabled) {
      contact.nextFollowUpAt = null;
      await contact.save();
    } else {
      await contact.save();
      await scheduleNextFollowUp(contact);
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating follow-up setting', error });
  }
};
