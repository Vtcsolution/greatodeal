import { Request, Response } from 'express';
import OpenAI from 'openai';
import LinkedInContact from '../models/LinkedInContact';
import LinkedInMessage from '../models/LinkedInMessage';

// Lazy-initialize so dotenv loads first before the client is created
let _openai: OpenAI | null = null;
const getOpenAI = () => {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
};

const REPLY_SYSTEM_PROMPT = `You are drafting a LinkedIn message on behalf of Zia Shafique, founder of Greatodeal, an AI SaaS and agentic automation company headquartered in Lahore, Pakistan. Greatodeal builds AI-powered software for regulated industries (government, healthcare, fintech, green tech, real estate) as well as websites, custom software, ERP systems, AI tools, and AI agents for businesses generally.

Write the next message in this LinkedIn conversation, in first person as Zia. Rules:
- Sound like a real person messaging a professional contact, not a marketing bot. Warm, concise, no corporate filler or hype.
- Keep it short, like an actual LinkedIn DM (a few sentences at most), not an email.
- Use the contact's name, position, and company naturally where it fits, but don't force it into every message.
- Read the full conversation history and reply to what they actually said, don't repeat yourself.
- The natural goal over the course of a conversation is to build rapport and eventually invite them to a quick call or demo about Greatodeal's AI automation work, but don't be pushy, especially not in the first couple of messages.
- Plain text only. No markdown, no bullet points, no em dashes, no emojis unless the contact used them first.
- Output ONLY the message text to send, nothing else (no preamble like "Here's a draft:").`;

export const getContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await LinkedInContact.find().sort({ lastMessageAt: -1 }).lean();
    const withPreview = await Promise.all(
      contacts.map(async (c) => {
        const [lastMessage, messageCount] = await Promise.all([
          LinkedInMessage.findOne({ contactId: c._id }).sort({ createdAt: -1 }).lean(),
          LinkedInMessage.countDocuments({ contactId: c._id }),
        ]);
        return { ...c, lastMessage: lastMessage?.content || null, lastMessageRole: lastMessage?.role || null, messageCount };
      })
    );
    res.json({ success: true, data: withPreview });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching LinkedIn contacts' });
  }
};

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, company, profileUrl, firstMessage } = req.body;
    const contact = await LinkedInContact.create({
      name,
      position: position || undefined,
      company: company || undefined,
      profileUrl: profileUrl || undefined,
    });
    if (firstMessage && String(firstMessage).trim()) {
      await LinkedInMessage.create({ contactId: contact._id, role: 'me', content: String(firstMessage).trim() });
      contact.lastMessageAt = new Date();
      await contact.save();
    }
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error('createContact error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating contact' });
  }
};

export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await LinkedInContact.findById(req.params.id);
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    const messages = await LinkedInMessage.find({ contactId: contact._id }).sort({ createdAt: 1 });
    res.json({ success: true, data: { contact, messages } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact' });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, company, profileUrl } = req.body;
    const contact = await LinkedInContact.findByIdAndUpdate(
      req.params.id,
      { name, position: position || undefined, company: company || undefined, profileUrl: profileUrl || undefined },
      { new: true }
    );
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact' });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await LinkedInContact.findByIdAndDelete(req.params.id);
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    await LinkedInMessage.deleteMany({ contactId: contact._id });
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contact' });
  }
};

export const addMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, content } = req.body as { role: 'me' | 'them'; content: string };
    if (!content || !content.trim()) { res.status(400).json({ success: false, message: 'Message content is required' }); return; }
    if (role !== 'me' && role !== 'them') { res.status(400).json({ success: false, message: 'Invalid role' }); return; }
    const contact = await LinkedInContact.findById(req.params.id);
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }
    const message = await LinkedInMessage.create({ contactId: contact._id, role, content: content.trim() });
    contact.lastMessageAt = new Date();
    await contact.save();
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding message' });
  }
};

export const generateReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await LinkedInContact.findById(req.params.id);
    if (!contact) { res.status(404).json({ success: false, message: 'Contact not found' }); return; }

    const messages = await LinkedInMessage.find({ contactId: contact._id }).sort({ createdAt: 1 });
    if (messages.length === 0) {
      res.status(400).json({ success: false, message: 'Add at least one message to this conversation before generating a reply.' });
      return;
    }

    const contactLine = [contact.name, contact.position, contact.company].filter(Boolean).join(' — ');
    const conversationLines = messages
      .slice(-20)
      .map(m => `${m.role === 'me' ? 'Zia' : contact.name}: ${m.content}`)
      .join('\n');

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: REPLY_SYSTEM_PROMPT },
        { role: 'user', content: `Contact: ${contactLine}\n\nConversation so far:\n${conversationLines}\n\nWrite Zia's next message.` },
      ],
      max_tokens: 400,
      temperature: 0.8,
    });

    const draft = completion.choices[0].message.content?.trim() || '';
    res.json({ success: true, data: { draft } });
  } catch (error) {
    console.error('generateReply error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error generating reply' });
  }
};
