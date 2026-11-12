import type { LucideIcon } from 'lucide-react';
import {
  Bot, Network, Workflow, PhoneCall, MessageSquare, Sparkles, Code2, Layers, Smartphone, Users,
  Brain, Database, ShieldCheck, Plug, LineChart, Search, Headphones, CalendarCheck, FileText,
  Rocket, RefreshCw, Cloud, Lock, Gauge, Cpu, Globe, CreditCard, Bell, Wrench,
} from 'lucide-react';
import { marketsFaq } from '@/lib/markets';

export interface ServiceOffering { icon: LucideIcon; title: string; desc: string }
export interface ServiceFaq { question: string; answer: string }

export interface ServicePage {
  slug: string;
  /** Short label used in nav lists, breadcrumbs, and related-service cards. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string[];
  offeringsTitle: string;
  offerings: ServiceOffering[];
  useCasesTitle: string;
  useCases: string[];
  tech: string[];
  faqs: ServiceFaq[];
  related: string[];
  industries: Array<{ name: string; path: string }>;
}

const pages: ServicePage[] = [
  {
    slug: 'ai-agent-development',
    name: 'AI Agent Development',
    metaTitle: 'AI Agent Development Company | Custom AI Agents for Business',
    metaDescription: 'Custom AI agent development for US businesses: autonomous and multi-agent systems that run real workflows, integrated with your stack, with human review and full audit logs.',
    keywords: [
      'AI agent development company', 'AI agent development services', 'custom AI agents', 'AI agents for business',
      'agentic AI development', 'autonomous AI agents', 'multi-agent systems', 'enterprise AI agents',
      'build AI agents', 'hire AI agent developers',
    ],
    eyebrow: 'Agentic AI Development',
    h1: 'AI Agent Development Company',
    h1Accent: 'Agents That Do the Work, Not Just Chat',
    intro: [
      'Greatodeal designs and builds custom AI agents that plan, decide, and carry out multi-step business tasks across the tools you already use: your CRM, inbox, ERP, databases, and internal APIs. Instead of a chatbot that answers one question at a time, an agent takes a goal, such as qualifying every inbound lead or reconciling yesterday\'s invoices, and works through it end to end.',
      'We build agentic AI for startups, SMBs, and enterprises in the United States, the UK, and Europe. Every agent ships with guardrails, human-in-the-loop approval for actions that matter, and a full log of what it did and why, so your team can trust it in production, not just in a demo.',
    ],
    offeringsTitle: 'AI Agent Development Services',
    offerings: [
      { icon: Bot, title: 'Custom AI Agents', desc: 'Single-purpose agents built around one workflow, such as lead qualification, support triage, or document processing, connected to your real systems.' },
      { icon: Network, title: 'Multi-Agent Systems', desc: 'Teams of specialized agents that hand work to each other, coordinated by an orchestrator, for processes too complex for one agent.' },
      { icon: Plug, title: 'Tool & API Integration', desc: 'Agents that read and write to your CRM, ERP, email, calendars, and databases through secure APIs and MCP servers.' },
      { icon: ShieldCheck, title: 'Guardrails & Human Review', desc: 'Approval steps, permission scopes, and spending limits so agents act only inside the boundaries you set.' },
      { icon: LineChart, title: 'Agent Monitoring & Evaluation', desc: 'Dashboards, evaluations, and logs that show accuracy, cost, and every action an agent took, so performance is measurable.' },
      { icon: Brain, title: 'Agentic AI Strategy', desc: 'A practical review of which workflows are worth automating first, based on volume, risk, and expected time saved.' },
    ],
    useCasesTitle: 'What Our AI Agents Automate',
    useCases: [
      'Inbound lead research, qualification, and CRM updates',
      'Customer support triage, answers, and escalation to humans',
      'Invoice, contract, and document data extraction',
      'Sales follow-up emails and meeting scheduling',
      'Internal knowledge search across docs, Slack, and drives',
      'Report generation from multiple data sources',
      'Recruiting: resume screening and candidate outreach',
      'Compliance checks and audit evidence collection',
    ],
    tech: ['OpenAI', 'Anthropic Claude', 'LangChain', 'LangGraph', 'Model Context Protocol (MCP)', 'Python', 'Node.js', 'PostgreSQL', 'pgvector', 'Redis', 'AWS', 'Docker'],
    faqs: [
      { question: 'What is an AI agent?', answer: 'An AI agent is software that uses a large language model to plan and carry out multi-step tasks toward a goal, calling tools and APIs along the way. Unlike a chatbot that only replies, an agent can look up data, update records, send messages, and decide what to do next.' },
      { question: 'How much does AI agent development cost?', answer: 'Cost depends on how many systems the agent connects to, how complex its decisions are, and what review and compliance controls it needs. A focused single-workflow agent costs far less than a multi-agent platform. We scope every project in a free consultation and give a fixed or milestone-based quote; see our pricing page for typical ranges.' },
      { question: 'How long does it take to build a custom AI agent?', answer: 'A focused agent for one workflow can often go live in a few weeks. Multi-agent systems with many integrations and approval flows take longer. We start with a narrow, high-value workflow, prove it in production, and expand from there.' },
      { question: 'Can AI agents work with our existing software?', answer: 'Yes. We connect agents to the tools you already use, including CRMs like HubSpot and Salesforce, email, calendars, ERPs, databases, and custom internal APIs, rather than asking you to replace them.' },
      { question: 'How do you keep AI agents safe and accurate?', answer: 'We limit each agent to the permissions it needs, add human approval for sensitive actions, test against real examples before launch, and log every action. Monitoring after launch catches drift, errors, and cost spikes early.' },
    ],
    related: ['ai-automation-agency', 'generative-ai-development', 'ai-voice-agents', 'ai-chatbot-development'],
    industries: [
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'Fintech', path: '/industries/fintech' },
      { name: 'Real Estate', path: '/industries/real-estate' },
    ],
  },
  {
    slug: 'ai-automation-agency',
    name: 'AI Automation Agency',
    metaTitle: 'AI Automation Agency | AI Workflow Automation Services',
    metaDescription: 'AI automation agency for growing US businesses. We automate workflows, data entry, approvals, and reporting with AI, RPA, n8n, and custom integrations that your team can trust.',
    keywords: [
      'AI automation agency', 'AI automation services', 'AI workflow automation', 'business process automation',
      'AI business automation', 'RPA services', 'intelligent automation', 'n8n automation agency',
      'workflow automation consultant', 'automate business processes with AI',
    ],
    eyebrow: 'AI & Workflow Automation',
    h1: 'AI Automation Agency',
    h1Accent: 'Automate the Work That Slows Your Team Down',
    intro: [
      'Greatodeal is an AI automation agency that finds the repetitive, manual work in your business and replaces it with reliable automated workflows. We combine AI models, robotic process automation (RPA), workflow tools like n8n, Make, and Zapier, and custom code where off-the-shelf tools stop being enough.',
      'Our focus is automation that survives contact with real operations: clear ownership, error handling, alerts when something breaks, and a human review step wherever a mistake would be costly. We work with US small and mid-sized businesses as well as enterprise teams in regulated industries.',
    ],
    offeringsTitle: 'AI Automation Services',
    offerings: [
      { icon: Workflow, title: 'AI Workflow Automation', desc: 'End-to-end workflows that use AI to read, classify, and route information between your apps without manual copy-paste.' },
      { icon: Cpu, title: 'RPA & Intelligent Automation', desc: 'Bots that operate legacy and desktop systems without APIs, combined with AI for the steps that need judgment.' },
      { icon: FileText, title: 'Document & Data Processing', desc: 'Automatic extraction from invoices, forms, contracts, and emails into your systems, with validation and exception queues.' },
      { icon: Bell, title: 'Approvals & Notifications', desc: 'Multi-step approval chains, reminders, and escalations that run on their own and keep a record of every decision.' },
      { icon: LineChart, title: 'Automated Reporting', desc: 'Dashboards and scheduled reports that pull live data from every system instead of manual spreadsheets.' },
      { icon: Search, title: 'Automation Audit', desc: 'A process review that ranks your workflows by time saved and risk, so you automate the highest-return work first.' },
    ],
    useCasesTitle: 'Workflows We Automate',
    useCases: [
      'Lead capture, enrichment, and CRM data entry',
      'Invoice processing and accounts payable',
      'Employee onboarding and IT provisioning',
      'Order processing and inventory sync for e-commerce',
      'Customer email triage and auto-replies',
      'Weekly KPI and operations reporting',
      'Quote and proposal generation',
      'Data migration and cross-system sync',
    ],
    tech: ['n8n', 'Make', 'Zapier', 'UiPath', 'Python', 'Node.js', 'OpenAI', 'Anthropic Claude', 'PostgreSQL', 'REST APIs', 'Webhooks', 'AWS'],
    faqs: [
      { question: 'What does an AI automation agency do?', answer: 'An AI automation agency identifies manual, repetitive processes in a business and builds automated workflows to handle them, using AI models for steps that need reading or judgment and workflow or RPA tools to move data between systems.' },
      { question: 'What is the difference between RPA and AI automation?', answer: 'RPA follows fixed rules to click through screens and move data, which works well for predictable tasks. AI automation adds the ability to read unstructured content, like emails or PDFs, and make decisions. Most real workflows need both, which is how we build them.' },
      { question: 'Do you use n8n, Make, or Zapier, or write custom code?', answer: 'Both. We use workflow platforms like n8n, Make, and Zapier when they fit, because they are faster to build and easy for your team to maintain, and we write custom code for high-volume, complex, or security-sensitive workflows.' },
      { question: 'How much can AI automation save my business?', answer: 'Savings depend on how much time your team spends on repetitive work today. We start with an automation audit that estimates hours saved per workflow, so you can see the expected return before committing to a build.' },
      { question: 'Is AI automation suitable for small businesses?', answer: 'Yes. Small businesses often see the fastest return, because a few automated workflows, such as lead follow-up, invoicing, or reporting, can free up a meaningful share of a small team\'s week.' },
    ],
    related: ['ai-agent-development', 'ai-chatbot-development', 'custom-software-development', 'generative-ai-development'],
    industries: [
      { name: 'Business Services', path: '/industries/business' },
      { name: 'E-Commerce', path: '/industries/ecommerce' },
      { name: 'AI Automation', path: '/industries/ai-automation' },
    ],
  },
  {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents',
    metaTitle: 'AI Voice Agent Development | AI Receptionist & Phone Agents',
    metaDescription: 'Custom AI voice agents and AI receptionists that answer calls 24/7, book appointments, qualify leads, and update your CRM. Built for US clinics, agencies, and service businesses.',
    keywords: [
      'AI voice agent', 'AI voice agents', 'AI receptionist', 'AI phone agent', 'AI call center automation',
      'voice AI development', 'AI answering service', 'conversational voice AI', 'AI appointment booking',
      'custom voice agent development',
    ],
    eyebrow: 'Voice AI',
    h1: 'AI Voice Agent Development',
    h1Accent: 'An AI Receptionist That Never Misses a Call',
    intro: [
      'Greatodeal builds AI voice agents that answer and make phone calls in natural, human-sounding speech. They greet callers, answer common questions, book appointments, qualify leads, and hand off to a person when a call needs one, every hour of the day.',
      'Each voice agent is connected to your calendar, CRM, and business data, so it can actually get things done during the call instead of just taking a message. We build voice agents for US medical and dental clinics, real estate teams, home services, law firms, and customer support centers.',
    ],
    offeringsTitle: 'Voice AI Solutions',
    offerings: [
      { icon: Headphones, title: 'AI Receptionist', desc: 'Answers every inbound call, handles FAQs, routes callers, and takes detailed messages, 24/7 and without hold times.' },
      { icon: CalendarCheck, title: 'Appointment Booking', desc: 'Checks live availability and books, reschedules, or cancels appointments directly in your calendar or practice software.' },
      { icon: PhoneCall, title: 'Outbound Calling Agents', desc: 'Lead follow-up, appointment reminders, and survey calls that run at scale with consistent quality.' },
      { icon: Users, title: 'Lead Qualification', desc: 'Asks your qualifying questions, scores the lead, and pushes the call summary and transcript to your CRM.' },
      { icon: Bell, title: 'Smart Human Handoff', desc: 'Transfers urgent or complex calls to the right person with context, so callers never have to repeat themselves.' },
      { icon: Lock, title: 'Privacy & Call Logging', desc: 'Recorded, transcribed, and searchable calls, with access controls and data handling designed around HIPAA-sensitive workflows.' },
    ],
    useCasesTitle: 'Who Uses AI Voice Agents',
    useCases: [
      'Medical, dental, and wellness clinics',
      'Real estate agents and property managers',
      'HVAC, plumbing, and home service companies',
      'Law firms handling intake calls',
      'Restaurants and hospitality reservations',
      'Customer support and after-hours lines',
      'Sales teams following up on web leads',
      'Insurance and financial services intake',
    ],
    tech: ['OpenAI Realtime API', 'ElevenLabs', 'Deepgram', 'Twilio', 'Vapi', 'Retell AI', 'Node.js', 'Python', 'WebRTC', 'Google Calendar API', 'HubSpot', 'Salesforce'],
    faqs: [
      { question: 'What is an AI voice agent?', answer: 'An AI voice agent is a phone or voice assistant powered by speech recognition, a large language model, and natural text-to-speech. It holds real conversations, understands what callers want, and takes actions such as booking an appointment or updating a CRM.' },
      { question: 'Can an AI receptionist replace my front desk?', answer: 'It usually works best alongside your staff. The AI receptionist handles high-volume routine calls, after-hours calls, and overflow, and passes complex or sensitive calls to a person, so your team spends time where it matters.' },
      { question: 'Will callers know they are talking to AI?', answer: 'Modern voice agents sound natural, but we recommend a short disclosure at the start of the call, and we follow the consent and recording rules that apply in your state.' },
      { question: 'Can the voice agent book appointments in my system?', answer: 'Yes. We integrate with Google Calendar, Outlook, Calendly, and many practice-management and CRM systems so the agent books directly into your real schedule.' },
      { question: 'Is an AI voice agent HIPAA compliant?', answer: 'For healthcare clients, we design the call flow, data storage, and vendor choices around HIPAA requirements, including signed BAAs with providers that offer them, access controls, and encrypted storage of recordings and transcripts.' },
    ],
    related: ['ai-chatbot-development', 'ai-agent-development', 'ai-automation-agency', 'generative-ai-development'],
    industries: [
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'Real Estate', path: '/industries/real-estate' },
      { name: 'Business Services', path: '/industries/business' },
    ],
  },
  {
    slug: 'ai-chatbot-development',
    name: 'AI Chatbot Development',
    metaTitle: 'AI Chatbot Development Company | Custom Chatbots for Business',
    metaDescription: 'Custom AI chatbot development trained on your own data. Website, WhatsApp, and support chatbots that answer accurately, capture leads, and hand off to your team.',
    keywords: [
      'AI chatbot development company', 'custom AI chatbot', 'AI chatbot for business', 'chatbot development services',
      'customer support chatbot', 'website chatbot', 'WhatsApp chatbot', 'GPT chatbot development',
      'conversational AI development', 'AI chatbot trained on your data',
    ],
    eyebrow: 'Conversational AI',
    h1: 'AI Chatbot Development Company',
    h1Accent: 'Chatbots That Know Your Business',
    intro: [
      'Greatodeal builds custom AI chatbots that are trained on your own content, including your website, help docs, product catalog, and policies, so they give accurate, on-brand answers instead of generic ones. Every chatbot can capture leads, look up orders or accounts, and hand a conversation to a human when needed.',
      'We deploy chatbots on websites, WhatsApp, Facebook Messenger, Slack, and inside your own apps, and connect them to the systems behind the conversation, such as your CRM, help desk, or e-commerce store.',
    ],
    offeringsTitle: 'Chatbot Development Services',
    offerings: [
      { icon: MessageSquare, title: 'Customer Support Chatbots', desc: 'Resolve common questions instantly and route the rest to your help desk with full conversation context.' },
      { icon: Database, title: 'Chatbots Trained on Your Data', desc: 'Retrieval-augmented (RAG) chatbots grounded in your documents, so answers cite real sources instead of guessing.' },
      { icon: Users, title: 'Lead Generation Chatbots', desc: 'Engage website visitors, ask qualifying questions, and book meetings straight into your sales calendar.' },
      { icon: Globe, title: 'Multi-Channel Deployment', desc: 'One chatbot across your website, WhatsApp, Messenger, Slack, and mobile app, with a shared knowledge base.' },
      { icon: Brain, title: 'Internal Knowledge Assistants', desc: 'Private chatbots that help employees find policies, procedures, and answers across company documents.' },
      { icon: LineChart, title: 'Analytics & Improvement', desc: 'Conversation analytics that show what customers ask, where the bot falls short, and what to improve next.' },
    ],
    useCasesTitle: 'Popular Chatbot Use Cases',
    useCases: [
      'Website support and FAQ automation',
      'E-commerce order tracking and product recommendations',
      'Appointment booking for clinics and services',
      'Lead capture and meeting scheduling',
      'HR and IT help desk for employees',
      'Real estate property inquiries',
      'SaaS onboarding and in-app help',
      'Multilingual customer service',
    ],
    tech: ['OpenAI GPT', 'Anthropic Claude', 'LangChain', 'RAG', 'Pinecone', 'pgvector', 'Next.js', 'Node.js', 'Socket.IO', 'WhatsApp Business API', 'Zendesk', 'Intercom'],
    faqs: [
      { question: 'How is a custom AI chatbot different from a template chatbot?', answer: 'A template chatbot follows scripted decision trees. A custom AI chatbot understands free-form questions, is grounded in your own content, and can take actions in your systems, such as checking an order or booking a call.' },
      { question: 'Can the chatbot be trained on our own documents and website?', answer: 'Yes. We use retrieval-augmented generation (RAG) so the chatbot searches your documents, pages, and knowledge base for every answer, and we can show the source it used.' },
      { question: 'How do you stop the chatbot from giving wrong answers?', answer: 'We ground answers in your approved content, instruct the bot to say when it does not know, test it on real customer questions before launch, and route uncertain conversations to a human.' },
      { question: 'Can the chatbot work on WhatsApp?', answer: 'Yes. We deploy chatbots on WhatsApp through the official WhatsApp Business API, as well as on websites, Messenger, Slack, and inside your own apps.' },
      { question: 'How much does it cost to build an AI chatbot?', answer: 'It depends on the channels, integrations, and how much content the chatbot needs to know. A website FAQ chatbot is a smaller project than a multi-channel support assistant connected to your CRM and order system. We provide a clear quote after a free consultation.' },
    ],
    related: ['ai-voice-agents', 'generative-ai-development', 'ai-agent-development', 'ai-automation-agency'],
    industries: [
      { name: 'E-Commerce', path: '/industries/ecommerce' },
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'Business Services', path: '/industries/business' },
    ],
  },
  {
    slug: 'generative-ai-development',
    name: 'Generative AI Development',
    metaTitle: 'Generative AI Development Services | LLM, RAG & MCP Integration',
    metaDescription: 'Generative AI development and LLM integration: RAG systems, custom GPTs, MCP servers, and AI features added to your product, built securely with OpenAI, Claude, and open-source models.',
    keywords: [
      'generative AI development services', 'generative AI development company', 'LLM integration services',
      'RAG development', 'custom GPT development', 'MCP server development', 'AI integration services',
      'LLM application development', 'enterprise generative AI', 'AI consulting services',
    ],
    eyebrow: 'Generative AI & LLMs',
    h1: 'Generative AI Development Services',
    h1Accent: 'Put Large Language Models to Work in Your Product',
    intro: [
      'Greatodeal helps companies turn generative AI from experiments into production features. We integrate large language models such as OpenAI GPT, Anthropic Claude, and open-source models into your products and internal tools, connect them to your data with retrieval-augmented generation (RAG), and expose your systems to AI assistants through Model Context Protocol (MCP) servers.',
      'We handle the parts that decide whether an AI feature works in the real world: data preparation, prompt and model selection, evaluation, cost control, security, and monitoring after launch.',
    ],
    offeringsTitle: 'Generative AI Services',
    offerings: [
      { icon: Plug, title: 'LLM Integration', desc: 'Add summarization, drafting, classification, extraction, and AI search to your existing web or mobile product.' },
      { icon: Database, title: 'RAG Systems', desc: 'Retrieval pipelines over your documents and databases, so AI answers are grounded in your data and cite sources.' },
      { icon: Network, title: 'MCP Server Development', desc: 'Model Context Protocol servers that let Claude, ChatGPT, and other AI assistants securely use your tools and data.' },
      { icon: Sparkles, title: 'Custom GPTs & Copilots', desc: 'Purpose-built AI assistants for sales, support, legal, or operations teams, embedded in the tools they already use.' },
      { icon: Gauge, title: 'Evaluation & Cost Optimization', desc: 'Test suites, model comparisons, caching, and routing that keep quality high and token costs predictable.' },
      { icon: Brain, title: 'Generative AI Consulting', desc: 'Use-case discovery, build-vs-buy guidance, and a roadmap from proof of concept to production.' },
    ],
    useCasesTitle: 'Generative AI Use Cases',
    useCases: [
      'AI search across company documents',
      'Contract and policy review assistants',
      'Automated proposal and report drafting',
      'Product description and content generation',
      'Meeting and call summarization',
      'Natural-language queries over business data',
      'AI features inside SaaS products',
      'Connecting internal tools to AI assistants via MCP',
    ],
    tech: ['OpenAI', 'Anthropic Claude', 'Llama', 'Mistral', 'LangChain', 'LlamaIndex', 'Model Context Protocol (MCP)', 'Pinecone', 'pgvector', 'Python', 'TypeScript', 'AWS Bedrock'],
    faqs: [
      { question: 'What is generative AI development?', answer: 'Generative AI development is building software features powered by models that create text, code, or images, such as AI assistants, document summarizers, and search tools. It includes integrating the model, connecting it to your data, and making it reliable, secure, and affordable in production.' },
      { question: 'What is RAG and why does it matter?', answer: 'Retrieval-augmented generation (RAG) lets a language model look up relevant information from your own documents or databases before answering. It makes answers more accurate, keeps them current without retraining a model, and allows the AI to cite its sources.' },
      { question: 'What is an MCP server?', answer: 'Model Context Protocol (MCP) is an open standard that lets AI assistants like Claude and ChatGPT connect to external tools and data. An MCP server exposes your systems, such as a CRM, database, or internal API, so AI assistants can use them securely with defined permissions.' },
      { question: 'Which AI models do you work with?', answer: 'We work with OpenAI GPT models, Anthropic Claude, Google Gemini, and open-source models such as Llama and Mistral, and choose based on quality, cost, latency, and data-privacy needs for each use case.' },
      { question: 'Is our data safe when using generative AI?', answer: 'We use enterprise API terms that exclude your data from model training, restrict what data each feature can access, encrypt data in transit and at rest, and can deploy on private cloud or self-hosted models when required.' },
    ],
    related: ['ai-agent-development', 'ai-chatbot-development', 'saas-development', 'custom-software-development'],
    industries: [
      { name: 'Fintech', path: '/industries/fintech' },
      { name: 'Government', path: '/industries/government' },
      { name: 'Healthcare', path: '/industries/healthcare' },
    ],
  },
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    metaTitle: 'Custom Software Development Company | Offshore Dev Team',
    metaDescription: 'Custom software development company building web apps, enterprise software, CRMs, ERPs, and APIs for US businesses. Senior offshore engineers, clear communication, AI built in.',
    keywords: [
      'custom software development company', 'custom software development services', 'offshore software development company',
      'enterprise software development', 'custom web application development', 'custom CRM development',
      'custom ERP development', 'legacy software modernization', 'software development outsourcing', 'full stack development company',
    ],
    eyebrow: 'Custom Software',
    h1: 'Custom Software Development Company',
    h1Accent: 'Software Built Around How Your Business Runs',
    intro: [
      'Greatodeal builds custom software for businesses that have outgrown spreadsheets and off-the-shelf tools: web applications, internal platforms, CRMs, ERPs, customer portals, and the APIs that connect them. We design around your actual workflows, so the software fits your operation instead of forcing your team to work around it.',
      'US companies work with Greatodeal as an offshore software development partner to get senior engineering capacity with clear communication, documented code, and AI capabilities built in from the start rather than bolted on later.',
    ],
    offeringsTitle: 'Custom Software Development Services',
    offerings: [
      { icon: Code2, title: 'Custom Web Applications', desc: 'Full-stack web apps and portals built with React, Next.js, and Node.js, designed for performance and scale.' },
      { icon: Users, title: 'Custom CRM Development', desc: 'CRMs shaped around your sales process, with AI lead scoring, automated follow-ups, and the integrations you need.' },
      { icon: Layers, title: 'ERP & Operations Software', desc: 'Inventory, procurement, HR, payroll, and finance unified into one system of record with role-based access.' },
      { icon: RefreshCw, title: 'Legacy Modernization', desc: 'Migrate aging systems to modern, cloud-native architecture without disrupting daily operations.' },
      { icon: Plug, title: 'API Development & Integration', desc: 'Secure REST APIs and integrations with payment, accounting, shipping, and third-party platforms.' },
      { icon: Wrench, title: 'Maintenance & Support', desc: 'Ongoing improvements, monitoring, security updates, and on-call support after launch.' },
    ],
    useCasesTitle: 'What We Build',
    useCases: [
      'Customer and partner portals',
      'Internal operations dashboards',
      'Booking and scheduling platforms',
      'Inventory and warehouse management',
      'Field service and dispatch apps',
      'Quoting, billing, and invoicing systems',
      'Marketplaces and multi-vendor platforms',
      'Data platforms and BI dashboards',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'Express.js', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    faqs: [
      { question: 'Why choose custom software over off-the-shelf tools?', answer: 'Custom software fits your exact workflow, integrates with all your systems, and you own it, with no per-seat fees that grow with your team. It makes the most sense when off-the-shelf tools force workarounds or cannot talk to each other.' },
      { question: 'How much does custom software development cost?', answer: 'Cost depends on features, integrations, users, and compliance requirements. We scope each project in a free consultation and offer fixed-price, milestone-based, or time-and-materials pricing.' },
      { question: 'How do you work with US clients from offshore?', answer: 'We run agile sprints with demos, a shared project board, and regular video calls scheduled around your business hours. You get a dedicated point of contact, access to the code repository, and written progress updates.' },
      { question: 'Who owns the code?', answer: 'You do. All source code, designs, and documentation are transferred to you, and the code lives in a repository you control.' },
      { question: 'Can you take over an existing software project?', answer: 'Yes. We start with a code and architecture review, document what exists, fix critical issues, and then continue development or modernize the system step by step.' },
    ],
    related: ['saas-development', 'mobile-app-development', 'hire-ai-developers', 'ai-automation-agency'],
    industries: [
      { name: 'Government', path: '/industries/government' },
      { name: 'Business Services', path: '/industries/business' },
      { name: 'Green Tech', path: '/industries/green-tech' },
    ],
  },
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    metaTitle: 'SaaS Development Company | AI SaaS & MVP Development',
    metaDescription: 'SaaS development company for startups and enterprises: MVP development, multi-tenant architecture, subscription billing, and AI-native SaaS products built to scale.',
    keywords: [
      'SaaS development company', 'SaaS development services', 'MVP development company', 'AI SaaS development',
      'SaaS product development', 'startup MVP development', 'multi-tenant SaaS architecture', 'build a SaaS product',
      'SaaS application development', 'micro SaaS development',
    ],
    eyebrow: 'SaaS & MVP Development',
    h1: 'SaaS Development Company',
    h1Accent: 'From MVP to Scalable, AI-Native SaaS',
    intro: [
      'Greatodeal designs and builds SaaS products for founders and established companies, from a lean MVP that validates the idea to a multi-tenant platform serving thousands of customers. We handle product architecture, design, development, subscription billing, and launch.',
      'Many of the SaaS products we build are AI-native: the AI is part of the data model and the core workflow, not a chat widget added at the end. That makes the product more useful, harder to copy, and easier to price on the value it delivers.',
    ],
    offeringsTitle: 'SaaS Development Services',
    offerings: [
      { icon: Rocket, title: 'MVP Development', desc: 'A focused first version with the core features users will pay for, built fast so you can launch and learn.' },
      { icon: Layers, title: 'Multi-Tenant Architecture', desc: 'Secure tenant isolation, role-based access, and a data model designed to scale with your customer base.' },
      { icon: CreditCard, title: 'Subscription Billing', desc: 'Stripe-powered plans, trials, usage-based pricing, invoices, and customer self-service.' },
      { icon: Sparkles, title: 'AI SaaS Features', desc: 'AI agents, copilots, and automation built into the product\'s core workflow and pricing model.' },
      { icon: Cloud, title: 'Cloud Infrastructure & DevOps', desc: 'CI/CD, monitoring, backups, and auto-scaling infrastructure on AWS, Azure, or GCP.' },
      { icon: LineChart, title: 'Product Analytics & Growth', desc: 'Usage analytics, onboarding flows, and in-app messaging to improve activation and retention.' },
    ],
    useCasesTitle: 'SaaS Products We Build',
    useCases: [
      'B2B workflow and operations platforms',
      'AI-powered CRM and sales tools',
      'Vertical SaaS for healthcare, real estate, and finance',
      'Government contracting and compliance platforms',
      'Marketplace and booking platforms',
      'Analytics and reporting dashboards',
      'Internal tools turned into commercial products',
      'Micro SaaS products for niche markets',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Stripe', 'Redis', 'OpenAI', 'AWS', 'Vercel', 'Docker'],
    faqs: [
      { question: 'How long does it take to build a SaaS MVP?', answer: 'Most SaaS MVPs take a few months depending on scope. We help you cut the first version down to the features that prove your core value, so you can launch sooner and invest based on real user feedback.' },
      { question: 'How much does SaaS development cost?', answer: 'Cost depends on the number of features, integrations, user roles, and compliance needs. An MVP costs much less than a full platform. We give a fixed, milestone-based quote after a free scoping session.' },
      { question: 'What is multi-tenant SaaS architecture?', answer: 'Multi-tenant architecture serves many customers from one application while keeping each customer\'s data isolated and secure. It lowers hosting costs and makes updates simpler than running a separate copy for every customer.' },
      { question: 'Can you add AI features to an existing SaaS product?', answer: 'Yes. We regularly add AI search, assistants, automation, and agents to existing SaaS products, integrated with the current codebase and data model.' },
      { question: 'Do you help after launch?', answer: 'Yes. We offer ongoing development, maintenance, monitoring, and scaling support, so your product keeps improving after the first release.' },
    ],
    related: ['custom-software-development', 'generative-ai-development', 'mobile-app-development', 'ai-agent-development'],
    industries: [
      { name: 'Fintech', path: '/industries/fintech' },
      { name: 'Real Estate', path: '/industries/real-estate' },
      { name: 'Government', path: '/industries/government' },
    ],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    metaTitle: 'Mobile App Development Company | iOS, Android & AI Apps',
    metaDescription: 'Mobile app development company building iOS, Android, and cross-platform React Native apps with AI features, secure backends, and App Store launch support.',
    keywords: [
      'mobile app development company', 'app development company', 'iOS app development', 'Android app development',
      'React Native app development', 'cross-platform app development', 'AI app development', 'custom mobile app development',
      'app developers for startups', 'enterprise mobile app development',
    ],
    eyebrow: 'Mobile Apps',
    h1: 'Mobile App Development Company',
    h1Accent: 'iOS, Android & AI-Powered Apps',
    intro: [
      'Greatodeal builds mobile apps for iOS and Android, usually with React Native so one codebase serves both platforms without sacrificing a native feel. We cover the full journey: UX design, app development, secure backend and APIs, App Store and Google Play submission, and updates after launch.',
      'Increasingly, the apps we build include AI: in-app assistants, smart search, image and document recognition, and personalized recommendations, all connected to the same backend as your web platform.',
    ],
    offeringsTitle: 'App Development Services',
    offerings: [
      { icon: Smartphone, title: 'Cross-Platform Apps', desc: 'React Native apps for iOS and Android from one codebase, for faster delivery and simpler maintenance.' },
      { icon: Code2, title: 'Native iOS & Android', desc: 'Swift and Kotlin development when your app needs deep device integration or maximum performance.' },
      { icon: Sparkles, title: 'AI-Powered App Features', desc: 'In-app chat assistants, smart search, recommendations, and on-device or cloud image recognition.' },
      { icon: Cloud, title: 'Backend & APIs', desc: 'Secure, scalable backends with authentication, push notifications, payments, and offline sync.' },
      { icon: Rocket, title: 'App Store Launch', desc: 'Store listings, review guidelines, beta testing, and release management for the App Store and Google Play.' },
      { icon: Wrench, title: 'App Maintenance', desc: 'OS updates, crash monitoring, performance tuning, and new features after launch.' },
    ],
    useCasesTitle: 'Apps We Build',
    useCases: [
      'On-demand and booking apps',
      'Healthcare and telehealth apps',
      'Real estate listing and agent apps',
      'E-commerce and loyalty apps',
      'Field service and logistics apps',
      'Fintech and payment apps',
      'Employee and internal operations apps',
      'Companion apps for SaaS platforms',
    ],
    tech: ['React Native', 'Expo', 'Swift', 'Kotlin', 'TypeScript', 'Node.js', 'Firebase', 'MongoDB', 'PostgreSQL', 'Stripe', 'OpenAI', 'AWS'],
    faqs: [
      { question: 'Should I build a native or cross-platform app?', answer: 'For most business apps, cross-platform React Native is faster and more cost-effective because one codebase runs on iOS and Android. Native development makes sense for apps that need heavy graphics, advanced device features, or maximum performance.' },
      { question: 'How much does it cost to build a mobile app?', answer: 'Cost depends on the number of screens, features, integrations, and backend complexity. We scope your app in a free consultation and provide a fixed or milestone-based quote.' },
      { question: 'How long does mobile app development take?', answer: 'A focused first version typically takes a few months, including design, development, testing, and store submission. Larger apps are delivered in phases so you can launch earlier.' },
      { question: 'Do you publish the app to the App Store and Google Play?', answer: 'Yes. We prepare store listings, handle submission and review requirements, and manage releases, under your own developer accounts so you keep full ownership.' },
      { question: 'Can you add AI features to my app?', answer: 'Yes. We add AI assistants, smart search, recommendations, document scanning, and image recognition, connected to secure backend services so API keys and data stay protected.' },
    ],
    related: ['saas-development', 'custom-software-development', 'ai-chatbot-development', 'hire-ai-developers'],
    industries: [
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'E-Commerce', path: '/industries/ecommerce' },
      { name: 'Real Estate', path: '/industries/real-estate' },
    ],
  },
  {
    slug: 'hire-ai-developers',
    name: 'Hire AI Developers',
    metaTitle: 'Hire AI Developers | Dedicated AI & Full-Stack Engineers',
    metaDescription: 'Hire dedicated AI developers, LLM engineers, and full-stack developers to extend your team. Flexible monthly engagement, senior talent, and direct communication for US companies.',
    keywords: [
      'hire AI developers', 'hire AI engineers', 'hire LLM developers', 'dedicated development team',
      'hire full stack developers', 'offshore AI developers', 'staff augmentation AI', 'hire React developers',
      'hire Node.js developers', 'remote AI development team',
    ],
    eyebrow: 'Dedicated Teams',
    h1: 'Hire AI Developers',
    h1Accent: 'Dedicated AI & Full-Stack Engineers for Your Team',
    intro: [
      'Need AI and software engineering capacity without a long hiring process? Greatodeal provides dedicated AI developers, LLM engineers, and full-stack developers who join your team, work in your tools, and follow your processes, on a flexible monthly engagement.',
      'Our engineers have built AI agents, RAG systems, SaaS platforms, CRMs, and mobile apps in production. US companies use our dedicated teams to ship AI features faster and to extend their in-house team at a lower cost than local hiring.',
    ],
    offeringsTitle: 'Engineers You Can Hire',
    offerings: [
      { icon: Brain, title: 'AI & LLM Engineers', desc: 'Specialists in AI agents, RAG, prompt engineering, model evaluation, and LLM integration with OpenAI and Claude.' },
      { icon: Code2, title: 'Full-Stack Developers', desc: 'React, Next.js, Node.js, and TypeScript engineers who ship complete features from database to UI.' },
      { icon: Database, title: 'Python & Data Engineers', desc: 'Data pipelines, automation scripts, APIs, and machine learning workflows in Python.' },
      { icon: Smartphone, title: 'Mobile Developers', desc: 'React Native engineers for iOS and Android apps that share code with your web product.' },
      { icon: Cloud, title: 'DevOps Engineers', desc: 'CI/CD, cloud infrastructure, monitoring, and cost optimization on AWS, Azure, and GCP.' },
      { icon: Users, title: 'Full Dedicated Teams', desc: 'A complete squad with developers, QA, and a project lead, managed by us and aligned to your roadmap.' },
    ],
    useCasesTitle: 'Why Teams Hire Through Greatodeal',
    useCases: [
      'Add AI capabilities without hiring a full in-house AI team',
      'Ship a product roadmap faster with extra senior capacity',
      'Cover skills your team lacks, like LLMs, RAG, or DevOps',
      'Scale the team up or down month to month',
      'Start in days instead of a months-long hiring cycle',
      'Work directly with engineers, not through layers of account managers',
      'Overlap with US business hours for daily stand-ups',
      'Keep full ownership of code and IP',
    ],
    tech: ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'React Native', 'OpenAI', 'Anthropic Claude', 'LangChain', 'PostgreSQL', 'MongoDB', 'AWS'],
    faqs: [
      { question: 'How quickly can I hire an AI developer?', answer: 'After a short call to understand your stack and needs, we propose matching engineers, you interview them, and they can usually start within days rather than the months a typical hiring cycle takes.' },
      { question: 'How does a dedicated developer engagement work?', answer: 'The developer works full time on your project, joins your Slack or Teams, attends your stand-ups, and uses your repositories and project tools. We handle employment, equipment, and HR, and you direct the day-to-day work.' },
      { question: 'Do your developers overlap with US working hours?', answer: 'Yes. We arrange schedules so developers overlap with your team for stand-ups, reviews, and collaboration during US business hours.' },
      { question: 'Who owns the code and intellectual property?', answer: 'You do. All work product, code, and IP belong to you, and we sign NDAs and IP assignment agreements before work begins.' },
      { question: 'Can I scale the team up or down?', answer: 'Yes. Engagements are monthly, so you can add engineers when the roadmap grows and scale down when a phase is complete.' },
    ],
    related: ['ai-agent-development', 'custom-software-development', 'generative-ai-development', 'saas-development'],
    industries: [
      { name: 'Fintech', path: '/industries/fintech' },
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'E-Commerce', path: '/industries/ecommerce' },
    ],
  },
];

// Every service page answers the "do you work with my country?" question the same way.
export const servicePages: ServicePage[] = pages.map(p => ({ ...p, faqs: [...p.faqs, marketsFaq] }));

export function getServicePage(slug: string) {
  return servicePages.find(p => p.slug === slug);
}
