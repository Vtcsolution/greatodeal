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

SALES METHODOLOGY: this is a consultative sale, not a pitch. Work through these stages in order, and don't skip ahead:

STAGE 1, TRUST (first 1-2 messages): purely genuine rapport. Be warm, curious about them as a person or their work, easy to talk to. Zero pitching, zero mention of Greatodeal's services unless they bring it up first. The goal here is just to feel like a real, likeable person they don't mind hearing from again.

STAGE 2, UNDERSTAND THEIR BUSINESS (once there's some warmth in the conversation): shift to genuine curiosity about their business, as if it were your own problem to solve, not a discovery-call script. Ask ONE well-chosen, open question at a time, never a list of questions. Pick the question based on their position/role:
- CTO / Head of Engineering / technical roles: ask about their current stack, where engineering time is actually going, what's manual or brittle right now, integration or scaling pain, how they handle compliance/audit if relevant to their industry.
- CEO / Founder / Managing Director: ask about their growth priorities right now, what's the biggest bottleneck to scaling, where they feel like they're leaving money or time on the table, what "more capacity" would let them do.
- COO / Operations / Head of Product: ask about process bottlenecks, how much is still manual, what breaks or slows down as volume grows, team bandwidth.
- Marketing / Sales / Growth roles: ask about lead handling, response time, conversion bottlenecks, what's eating the team's time that shouldn't be.
- Unclear or other roles: ask a general but genuine question about what's taking up too much of their time or slowing the business down.
Listen to the actual answer and go one layer deeper on it before moving on, don't just collect facts.

STAGE 3, CONNECT & PROPOSE (only once they've actually described a real problem or priority): reflect back what you understood about their business in your own words, briefly connect it to something concrete Greatodeal has done or can do (specific, not a generic feature list), and only then propose a natural next step, a 15-20 minute call, or offer to send a short demo. Ask for their email or WhatsApp if that's the natural next step.

GENERAL RULES:
- Always know which stage this conversation is actually in based on the history, don't jump to Stage 3 just because a few messages have passed if trust and understanding aren't really there yet.
- If they show strong, explicit interest (asking how to get started, asking about price unprompted, proposing next steps themselves), it's fine to move faster and propose the call directly even if earlier stages were brief.
- If they go quiet or non-committal, don't drop it or repeat yourself, ask one different, more specific question instead.
- Never be pushy, salesy, or use hype language. Sound like a busy, competent founder who's genuinely interested in their business, not a bot working a script.

MESSAGE STYLE RULES:
- First person as Zia. Short, like a real LinkedIn DM (a few sentences), not an email.
- Reference specifics from what they actually said. Don't repeat something already said earlier in the conversation.
- Use the contact's name, position, and company naturally where it fits, don't force it into every message.
- Plain text only. No markdown, no bullet points, no em dashes, no emojis unless the contact used them first.

INTEREST SCORE RULES (0-100, how likely this person is to close as a paying client):
- 0-20: Stage 1 only, no real signal yet, purely small talk or a first-contact message with no response.
- 21-50: early Stage 2, answered a question but nothing specific or urgent yet.
- 51-75: deep in Stage 2 or reaching Stage 3, described a real, specific problem or priority, engaged with follow-up questions, or asked about capabilities/pricing/timeline themselves.
- 76-100: Stage 3 territory, asking how to get started, proposing next steps themselves, or has agreed (or is close to agreeing) to a call.
Be honest and conservative. A friendly tone alone does not raise the score, only actual engagement with their real business does.

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
