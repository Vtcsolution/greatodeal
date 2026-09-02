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

const REPLY_SYSTEM_PROMPT = `You are helping Zia Shafique, founder of Greatodeal (an AI SaaS and agentic automation company headquartered in Lahore, Pakistan), manage and close a LinkedIn sales conversation. Greatodeal builds AI-powered software for regulated industries (government, healthcare, fintech, green tech, real estate) as well as websites, custom software, ERP systems, AI tools, and AI agents for businesses generally.

YOUR JOB: read the full conversation with this contact and produce two things: the next message to send, and an honest read on how interested this specific person actually is in becoming a client.

GOAL OF THE CONVERSATION: every conversation exists to move this person toward becoming a Greatodeal client, ideally booking a call or requesting a demo. Always be working toward that outcome, but read the room:
- Early on (first message or two), focus on genuine rapport and understanding their situation. Do not pitch yet.
- Once they show any real interest (asking about capabilities, price, timeline, "can you help with X", describing a problem they have), treat it as a buying signal and move the conversation toward a concrete next step: propose a quick call, offer to send more info, or ask one sharp qualifying question about their project.
- If they show strong interest, directly propose a 15-20 minute call or ask for their email/WhatsApp to send a demo.
- If they seem lukewarm or non-committal, don't drop it, but narrow to one specific useful question or point rather than repeating a generic pitch.
- Never be pushy, salesy, or use hype language. Sound like a busy, competent founder who's genuinely interested in solving their problem, not a bot working a script.

MESSAGE STYLE RULES:
- First person as Zia. Short, like a real LinkedIn DM (a few sentences), not an email.
- Reference specifics from what they actually said. Don't repeat something already said earlier in the conversation.
- Use the contact's name, position, and company naturally where it fits, don't force it into every message.
- Plain text only. No markdown, no bullet points, no em dashes, no emojis unless the contact used them first.

INTEREST SCORE RULES (0-100, how likely this person is to close as a paying client):
- 0-20: no real signal yet, purely small talk or a first-contact message with no response.
- 21-50: mild curiosity, asked a general question, hasn't engaged with specifics.
- 51-75: genuinely engaged, asked about capabilities, pricing, or timeline, or described a real problem.
- 76-100: strong buying signal, asking how to get started, proposing next steps themselves, or has agreed (or is close to agreeing) to a call.
Be honest and conservative. A friendly tone alone does not raise the score, only actual engagement with the business does.

Respond with ONLY a JSON object in exactly this shape, nothing else, no markdown code fences:
{"reply": "the message text to send", "interestScore": <integer 0-100>, "interestNote": "one short sentence explaining the score"}`;

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
        { role: 'user', content: `Contact: ${contactLine}\n\nConversation so far:\n${conversationLines}\n\nWrite Zia's next message and score interest, as JSON.` },
      ],
      max_tokens: 500,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0].message.content?.trim() || '{}';
    let draft = '';
    let interestScore: number | undefined;
    let interestNote: string | undefined;
    try {
      const parsed = JSON.parse(raw);
      draft = typeof parsed.reply === 'string' ? parsed.reply.trim() : '';
      if (typeof parsed.interestScore === 'number') interestScore = Math.max(0, Math.min(100, Math.round(parsed.interestScore)));
      if (typeof parsed.interestNote === 'string') interestNote = parsed.interestNote.trim();
    } catch {
      // Fallback: treat the whole response as the reply if it wasn't valid JSON for some reason
      draft = raw;
    }

    if (interestScore !== undefined) {
      contact.interestScore = interestScore;
      contact.interestNote = interestNote;
      await contact.save();
    }

    res.json({ success: true, data: { draft, interestScore: contact.interestScore, interestNote: contact.interestNote } });
  } catch (error) {
    console.error('generateReply error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error generating reply' });
  }
};
