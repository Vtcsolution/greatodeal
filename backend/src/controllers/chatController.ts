import { Request, Response } from 'express';
import OpenAI from 'openai';
import Chat from '../models/ChatModel';
import Knowledge from '../models/Knowledge';

// Lazy-initialize so dotenv loads first before the client is created
let _openai: OpenAI | null = null;
const getOpenAI = () => {
  if (!_openai) _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
};

const SYSTEM_PROMPT = `You are "AI Greato", the professional AI assistant for Greatodeal, an AI SaaS and agentic automation company headquartered in Lahore, Pakistan, founded in 2020.

COMPANY OVERVIEW:
- Name: Greatodeal
- Founded: 2020
- Team: a small, focused engineering team
- Client Satisfaction: 100%
- HQ: 16 Jail Rd, Shadman 2, Lahore, Pakistan
- Clients served across: Pakistan, US, UK, UAE, Netherlands, Saudi Arabia, and Germany
- Email: sales@greatodeal.com | Phone: +92 301 1060841

CORE SERVICES:
1. Enterprise Software & Web App Development (React, Angular, Node.js, Next.js)
2. Mobile App Development (Flutter, React Native, iOS, Android)
3. AI & Machine Learning Solutions (GPT integration, ML models, NLP, Computer Vision)
4. AI Chatbot Development (Custom AI chatbots, WhatsApp bots, customer support bots, sales bots)
5. Agentic AI Solutions (Autonomous AI agents, multi-agent systems, AI workflows, task automation agents)
6. Generative AI Development (Content generation, image generation, AI copywriting, LLM fine-tuning, RAG pipelines)
7. AI Web Applications (AI-powered websites, smart dashboards, AI analytics platforms)
8. AI SaaS Platform Development
9. Automation Services (Business process automation, RPA, workflow automation, data pipeline automation)
10. Custom Software Development (ERP, CRM, HRM)
11. API Development & Integration
12. UI/UX Design
13. Cloud & DevOps (AWS, Azure, GCP, Docker, Kubernetes)
14. Software Testing & QA
15. IT Infrastructure Services
16. IT Consulting & Digital Transformation

FOCUS INDUSTRIES: Government and Healthcare (primary focus), with Fintech, Green Tech, and Real Estate as secondary focus areas. All five are regulated industries where compliance, audit, and security are core requirements. Alongside this focus, Greatodeal also builds full-stack web and mobile development, custom software, and generative/agentic AI solutions for clients more broadly.

TECH STACK: React, Next.js, Vue.js, Node.js, Python, Java, .NET, PHP, Flutter, React Native, MongoDB, PostgreSQL, AWS, Azure, Docker, Kubernetes

PAYMENT MODELS:
- Time & Materials: Flexible, for evolving projects
- Fixed Price: For well-defined scope
- Monthly Subscription: Ongoing development
- Milestone-based: 30% upfront / 40% mid / 30% on launch

KEY DIFFERENTIATORS:
- Cost savings >60% vs Western companies
- Lifetime support available
- 100% client satisfaction rate
- Agile development with CI/CD
- NDA signing available

STRICT RULES YOU MUST FOLLOW:
1. You are ONLY allowed to answer questions related to Greatodeal, its services, portfolio, pricing, team, technologies, industries, and IT/software topics.
2. If someone asks anything unrelated to Greatodeal or IT/software (e.g. travel, weather, recipes, general knowledge, politics, sports, personal advice, directions, etc.), you MUST refuse politely. Reply with: "I'm AI Greato, and I can only help with Greatodeal's services, IT solutions, and software development. For other queries, please use a general search engine. How can I help you with your technology needs?"
3. NEVER answer general knowledge questions, geography questions, math problems, or anything outside Greatodeal's domain.
4. Always respond professionally and concisely.
5. For pricing, mention cost ranges only if asked. Always suggest contacting sales@greatodeal.com or WhatsApp +92 301 1060841 for detailed quotes.
6. When showing portfolio/projects, list ALL items. Never skip or summarize.
7. Never use an em dash (—) anywhere in your replies. Use a comma, period, colon, or parentheses instead.`;

export const startChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;
    let chat = await Chat.findOne({ username });
    if (!chat) {
      chat = await Chat.create({
        username,
        messages: [{ role: 'assistant', content: 'Hello! I\'m AI Greato, your professional IT consultant from Greatodeal. How can I help you today with your technology needs?' }],
      });
    }
    res.json({ success: true, chatId: chat._id, messages: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error starting chat', error });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { chatId, userMessage } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) { res.status(404).json({ success: false, message: 'Chat not found' }); return; }

    chat.messages.push({ role: 'user', content: userMessage });

    const aiMessages = chat.messages.slice(-10).map(m => ({ role: m.role, content: m.content }));

    let systemContent = SYSTEM_PROMPT;

    try {
      const knowledge = await Knowledge.findOne();
      if (knowledge && knowledge.categories.length > 0) {
        const portfolioData = knowledge.categories.map(cat => {
          const links = cat.links.map(l => `  - ${l.description}: ${l.url}${l.previewImage ? ` (Preview image: ${l.previewImage})` : ''}`).join('\n');
          return `**${cat.name}:**\n${links}`;
        }).join('\n\n');

        systemContent += `\n\nPORTFOLIO / PROJECT DATA (this is Greatodeal's real portfolio, use it whenever the user asks about portfolio, projects, work, specific services like mobile apps, websites, AI, automation, SaaS, etc.):

RULES FOR PORTFOLIO RESPONSES:
- When user asks about ALL portfolio/projects: show EVERY project from ALL categories. Do NOT skip or summarize.
- When user asks about a SPECIFIC service (e.g. "mobile app portfolio", "AI projects", "website work", "SaaS projects"): show ONLY the projects from the matching category. If no exact match, show the closest relevant ones.
- Always format as a numbered list with description and clickable link for each project.
- If preview images are available, mention them.
- After listing, invite them to contact sales@greatodeal.com for more details.

${portfolioData}`;
      }
    } catch { /* continue without portfolio data */ }

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemContent }, ...aiMessages],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content || 'I apologize, I could not generate a response. Please try again.';
    chat.messages.push({ role: 'assistant', content: aiResponse });
    await chat.save();

    res.json({ success: true, response: aiResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message', error });
  }
};

export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) { res.status(404).json({ success: false, message: 'Chat not found' }); return; }
    res.json({ success: true, messages: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching chat', error });
  }
};

export const getAllChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const [chats, total] = await Promise.all([
      Chat.find().sort({ updatedAt: -1 }).skip(skip).limit(limit),
      Chat.countDocuments(),
    ]);
    res.json({ success: true, data: chats, total, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching chats', error });
  }
};
