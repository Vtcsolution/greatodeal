import { Request, Response } from 'express';
import Contact from '../models/ContactModel';
import { sendContactEmail, sendReplyEmail } from '../utils/emailService';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.create(req.body);
    await sendContactEmail(req.body).catch(err => console.error('Email error:', err));
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
    const { contactId, to, subject, message } = req.body;
    if (!to || !subject || !message) {
      res.status(400).json({ success: false, message: 'to, subject, and message are required' });
      return;
    }
    await sendReplyEmail(to, subject, `<div style="font-family:Arial,sans-serif">${message}</div>`);
    await Contact.findByIdAndUpdate(contactId, { status: 'replied', repliedAt: new Date() });
    res.json({ success: true, message: 'Reply sent successfully' });
  } catch (error: any) {
    console.error('Reply email error:', error?.message || error);
    res.status(500).json({ success: false, message: 'Error sending reply', error: error?.message || 'Unknown error' });
  }
};
