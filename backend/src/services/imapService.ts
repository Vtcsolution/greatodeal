import { ImapFlow, FetchMessageObject } from 'imapflow';
import { simpleParser } from 'mailparser';
import Contact from '../models/ContactModel';
import MailMessage, { MailFolder } from '../models/MailMessage';
import { notify } from '../utils/notify';
import { emitToAdmins } from './../utils/socket';

const IMAP_HOST = process.env.IMAP_HOST || (process.env.EMAIL_HOST || '').replace(/^smtp\./, 'imap.') || 'imap.hostinger.com';
const IMAP_PORT = Number(process.env.IMAP_PORT) || 993;
const IMAP_USER = process.env.IMAP_USER || process.env.EMAIL_USER;
const IMAP_PASS = process.env.IMAP_PASS || process.env.EMAIL_PASS;
const IMAP_ENABLED = process.env.IMAP_ENABLED !== 'false' && !!IMAP_USER && !!IMAP_PASS;
const POLL_INTERVAL_MS = Number(process.env.IMAP_POLL_INTERVAL_MS) || 2 * 60 * 1000; // 2 minutes

interface FolderConfig {
  candidates: string[];
  folder: MailFolder;
}

// Different providers name these folders differently; Hostinger (Dovecot) typically
// uses these. We try each candidate in order and use the first one that opens.
const FOLDER_CONFIGS: FolderConfig[] = [
  { candidates: ['INBOX'], folder: 'inbox' },
  { candidates: ['Junk', 'Spam', 'INBOX.Junk', 'INBOX.Spam', 'Junk E-mail'], folder: 'spam' },
  { candidates: ['Sent', 'INBOX.Sent', 'Sent Items', 'Sent Messages'], folder: 'sent' },
];

// Tracks the last processed UID per folder so we only fetch new mail each poll.
const lastUidByFolder = new Map<string, number>();
let polling = false;
let started = false;

const openFirstAvailable = async (client: ImapFlow, candidates: string[]) => {
  for (const name of candidates) {
    try {
      const box = await client.mailboxOpen(name);
      return { name, box };
    } catch {
      // try next candidate
    }
  }
  return null;
};

const processFolder = async (client: ImapFlow, config: FolderConfig): Promise<void> => {
  const opened = await openFirstAvailable(client, config.candidates);
  if (!opened) return; // folder doesn't exist on this account, skip silently

  const key = config.folder;
  let lastUid = lastUidByFolder.get(key);

  if (lastUid === undefined) {
    // First run for this folder: don't backfill the whole mailbox history,
    // just remember where we are and start tracking from here.
    const status = opened.box;
    lastUid = Math.max((status.uidNext || 1) - 1, 0);
    lastUidByFolder.set(key, lastUid);
    return;
  }

  if (opened.box.uidNext <= lastUid + 1) return; // nothing new

  const range = `${lastUid + 1}:*`;
  const messages: FetchMessageObject[] = [];
  for await (const msg of client.fetch(range, { envelope: true, source: true, uid: true })) {
    messages.push(msg);
  }

  for (const msg of messages) {
    if (!msg.uid || msg.uid <= lastUid) continue;
    lastUid = Math.max(lastUid, msg.uid);

    try {
      const parsed = msg.source ? await simpleParser(msg.source) : null;
      const fromAddr = msg.envelope?.from?.[0]?.address?.toLowerCase() || parsed?.from?.value?.[0]?.address?.toLowerCase() || '';
      const fromName = msg.envelope?.from?.[0]?.name || parsed?.from?.value?.[0]?.name || '';
      const toAddr = msg.envelope?.to?.[0]?.address || '';
      const subject = msg.envelope?.subject || parsed?.subject || '(no subject)';
      const date = msg.envelope?.date || parsed?.date || new Date();
      const messageId = msg.envelope?.messageId || parsed?.messageId;

      // Avoid duplicate storage on re-runs
      if (messageId) {
        const exists = await MailMessage.findOne({ messageId, folder: key });
        if (exists) continue;
      }

      const contact = fromAddr ? await Contact.findOne({ email: new RegExp(`^${fromAddr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }) : null;

      const mailDoc = await MailMessage.create({
        folder: key,
        uid: msg.uid,
        messageId,
        inReplyTo: msg.envelope?.inReplyTo,
        from: fromAddr,
        fromName,
        to: toAddr,
        subject,
        textBody: parsed?.text,
        htmlBody: typeof parsed?.html === 'string' ? parsed.html : undefined,
        date,
        contactId: contact?._id,
      });

      emitToAdmins('mail:new', { folder: key, id: mailDoc._id, from: fromAddr, subject, date });

      if (key === 'inbox' && contact && contact.status !== 'replied') {
        contact.status = 'replied';
        contact.repliedAt = date instanceof Date ? date : new Date(date);
        contact.followUpEnabled = false;
        contact.nextFollowUpAt = null;
        await contact.save();
        await notify('email_replied', 'Lead replied to your email', `${contact.fullName} replied: "${subject}"`, contact._id as any, {
          subject,
          from: fromAddr,
        });
      } else if (key === 'inbox') {
        await notify('new_mail', 'New message received', `New email from ${fromName || fromAddr}: "${subject}"`, contact?._id as any, {
          subject,
          from: fromAddr,
        });
      }
    } catch (err) {
      console.error('IMAP message processing error:', err);
    }
  }

  lastUidByFolder.set(key, lastUid);
};

export const pollMailbox = async (): Promise<void> => {
  if (!IMAP_ENABLED || polling) return;
  polling = true;
  const client = new ImapFlow({
    host: IMAP_HOST,
    port: IMAP_PORT,
    secure: IMAP_PORT === 993,
    auth: { user: IMAP_USER as string, pass: IMAP_PASS as string },
    logger: false,
  });

  try {
    await client.connect();
    for (const config of FOLDER_CONFIGS) {
      await processFolder(client, config);
    }
  } catch (err) {
    console.error('IMAP polling error (mailbox/reply detection):', (err as Error).message);
  } finally {
    try {
      await client.logout();
    } catch {
      /* ignore */
    }
    polling = false;
  }
};

export const startImapPolling = (): void => {
  if (started) return;
  started = true;

  if (!IMAP_ENABLED) {
    console.log('✉️  IMAP mailbox polling disabled — set IMAP_HOST/IMAP_USER/IMAP_PASS (or EMAIL_USER/EMAIL_PASS) in .env to enable reply detection and the mailbox.');
    return;
  }

  console.log(`✉️  IMAP mailbox polling enabled (${IMAP_HOST}:${IMAP_PORT}, every ${POLL_INTERVAL_MS / 1000}s)`);
  setInterval(() => {
    pollMailbox().catch(err => console.error('IMAP poll cycle error:', err));
  }, POLL_INTERVAL_MS);
  // Kick off an initial poll shortly after boot
  setTimeout(() => pollMailbox().catch(err => console.error('IMAP initial poll error:', err)), 10_000);
};
