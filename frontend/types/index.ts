export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  fullContent?: string;
  category: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  backlinks?: Array<{ text: string; url: string }>;
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  blogId: string;
  parentId?: string;
  username: string;
  comment: string;
  likes: number;
  isApproved: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant' | 'ai';
}

export interface ContactFormData {
  fullName: string;
  company?: string;
  countryCode: string;
  phone?: string;
  email: string;
  services: string;
  message: string;
}

export interface PartnershipFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  description: string;
  ndaAgreed: boolean;
  serviceType: string;
  partnershipTier: string;
  phone?: string;
  website?: string;
  industry?: string;
  employees?: string;
  timeline?: string;
  referralSource?: string;
}

export interface AdminProfile {
  _id: string;
  email: string;
  name?: string;
  role: string;
}

export type LeadStatus = 'cold' | 'warm' | 'urgent';

export interface Contact {
  _id: string;
  fullName: string;
  company?: string;
  phone?: string;
  countryCode?: string;
  email: string;
  services: string;
  message: string;
  status: 'new' | 'replied';
  repliedAt?: string;
  createdAt: string;
  leadStatus: LeadStatus;
  followUpEnabled: boolean;
  followUpStage: number;
  nextFollowUpAt?: string | null;
  lastFollowUpAt?: string | null;
  unsubscribed: boolean;
  emailOpens: number;
  lastOpenedAt?: string | null;
  lastEmailSentAt?: string | null;
  dealClosed: boolean;
  dealClosedAt?: string | null;
  source: 'contact_form' | 'lead_finder';
}

export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
export type MilestoneStatus = 'pending' | 'in_progress' | 'done';
export type ExpenseCategory = 'development' | 'api' | 'tool' | 'other';

export interface ProjectFeature {
  _id?: string;
  name: string;
  done: boolean;
}

export interface ProjectMilestone {
  _id?: string;
  title: string;
  startDate?: string | null;
  endDate?: string | null;
  status: MilestoneStatus;
  amount: number;
}

export interface ProjectExpense {
  _id?: string;
  label: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export interface Project {
  _id: string;
  contactId: string;
  clientName: string;
  clientEmail: string;
  company?: string;
  projectName: string;
  projectType: string;
  description?: string;
  status: ProjectStatus;
  startDate: string;
  targetEndDate?: string | null;
  completedAt?: string | null;
  budget: number;
  amountPaidByClient: number;
  currency: string;
  features: ProjectFeature[];
  milestones: ProjectMilestone[];
  expenses: ProjectExpense[];
  totalExpenses: number;
  remainingBudget: number;
  amountDue: number;
  createdAt: string;
  updatedAt: string;
}

export interface FollowUpReminder {
  _id: string;
  fullName: string;
  company?: string;
  email: string;
  leadStatus: LeadStatus;
  emailOpens: number;
  lastOpenedAt?: string | null;
  lastEmailSentAt: string;
  followUpStage: number;
  daysSinceLastEmail: number;
}

export interface BusinessOverview {
  leads: {
    total: number;
    new: number;
    replied: number;
    closedDeals: number;
    byStatus: { status: LeadStatus; count: number }[];
    bySource: { source: 'contact_form' | 'lead_finder'; count: number }[];
  };
  emails: {
    sent: number;
    opened: number;
    openRate: number;
  };
  revenue: {
    totalRevenue: number;
    totalCollected: number;
    totalOutstanding: number;
    totalExpenses: number;
    netProfit: number;
    monthly: { month: string; revenue: number; count: number }[];
    yearly: { year: number; revenue: number; count: number }[];
  };
  topProjects: { _id: string; projectName: string; clientName: string; budget: number; currency: string; status: ProjectStatus; startDate: string }[];
}

export type NotificationType = 'new_lead' | 'email_opened' | 'email_replied' | 'followup_sent' | 'new_mail' | 'partnership_lead';

export interface AppNotification {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  contactId?: string;
  meta?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

export interface EmailLogEntry {
  _id: string;
  contactId?: string;
  trackingId: string;
  type: 'manual_reply' | 'auto_followup' | 'contact_notification';
  to: string;
  subject: string;
  followUpStage?: number;
  status: 'sent' | 'failed';
  opened: boolean;
  openCount: number;
  firstOpenedAt?: string | null;
  lastOpenedAt?: string | null;
  createdAt: string;
}

export interface FollowUpTemplate {
  _id: string;
  leadStatus: LeadStatus;
  stage: number;
  delayHours: number;
  subject: string;
  body: string;
  active: boolean;
}

export type MailFolder = 'inbox' | 'sent' | 'spam' | 'trash';

export interface MailMessage {
  _id: string;
  folder: MailFolder;
  from: string;
  fromName?: string;
  to?: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
  date: string;
  read: boolean;
  contactId?: string;
  // Only populated for the "sent" folder — whether this message was sent
  // from our own system (vs. by hand through Hostinger webmail) and, if so,
  // its open-tracking status.
  tracked?: boolean;
  opened?: boolean;
  openCount?: number;
  lastOpenedAt?: string | null;
}

export interface PricingTier {
  _id: string;
  title: string;
  badge?: string;
  description: string;
  currency: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category?: string;
  projectUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}
