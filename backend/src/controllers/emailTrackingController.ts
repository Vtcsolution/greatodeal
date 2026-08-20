import { Request, Response } from 'express';
import EmailLog from '../models/EmailLog';
import Contact from '../models/ContactModel';
import { notify } from '../utils/notify';

// 1x1 transparent GIF
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7',
  'base64'
);

export const trackEmailOpen = async (req: Request, res: Response): Promise<void> => {
  // Always respond with the pixel immediately, regardless of tracking outcome
  res.set('Content-Type', 'image/gif');
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.send(TRANSPARENT_GIF);

  try {
    const trackingId = (req.params.trackingId || '').replace(/\.png$/, '');
    if (!trackingId) return;

    const log = await EmailLog.findOne({ trackingId });
    if (!log) return;

    const isFirstOpen = !log.opened;
    log.opened = true;
    log.openCount += 1;
    log.lastOpenedAt = new Date();
    if (!log.firstOpenedAt) log.firstOpenedAt = new Date();
    log.opens.push({
      ip: req.ip,
      userAgent: req.get('user-agent') || undefined,
      openedAt: new Date(),
    });
    await log.save();

    if (log.contactId) {
      const contact = await Contact.findByIdAndUpdate(
        log.contactId,
        { $inc: { emailOpens: 1 }, lastOpenedAt: new Date() },
        { new: true }
      );
      if (isFirstOpen && contact) {
        await notify(
          'email_opened',
          'Email opened',
          `${contact.fullName} opened: "${log.subject}"`,
          contact._id as any,
          { trackingId, subject: log.subject }
        );
      }
    }
  } catch (err) {
    console.error('trackEmailOpen error:', err);
  }
};
