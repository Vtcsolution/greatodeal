'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Briefcase, Users, FileText, BarChart2, Workflow } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Business Services',
  subtitle: 'Operations & Workflow Automation',
  description: 'Professional services firms lose margin to manual busywork: onboarding, time tracking, invoicing, and reporting eating hours that should go to billable client work. We automate the operational backbone so your team spends time on the work that actually grows the business.',
  icon: Briefcase,
  heroIcon: Briefcase,
  stats: [
    { value: '60%+', label: 'Admin Time Saved' },
    { value: '100%', label: 'Workflow Audit Trail' },
    { value: 'Real-Time', label: 'Operational Dashboards' },
    { value: 'Automated', label: 'Billing & Invoicing' },
  ],
  challenges: [
    'Client onboarding still runs through email threads and spreadsheets, not a repeatable workflow',
    'Billing and invoicing eat hours that should be billable client work',
    'Data lives in disconnected tools, CRM, accounting, project management, that do not talk to each other',
    'Internal reporting is manually assembled and always a week behind reality',
    'Approval chains for contracts and expenses have no audit trail',
    'Scaling the team means scaling the admin overhead right along with it',
  ],
  solutions: [
    { icon: Users, title: 'Client Onboarding Automation', desc: 'Structured intake workflows that move a new client from signed contract to active engagement without manual chasing.' },
    { icon: FileText, title: 'Billing & Invoicing Systems', desc: 'Automated time tracking, invoice generation, and payment reconciliation tied directly to project data.' },
    { icon: BarChart2, title: 'Operational Dashboards', desc: 'Real-time visibility into utilization, pipeline, and financials instead of a manually rebuilt spreadsheet every Monday.' },
    { icon: Workflow, title: 'Approval & Document Workflows', desc: 'Contract, expense, and internal approval chains with a full, reviewable audit trail.' },
  ],
  features: [
    'Automated client intake and onboarding sequences', 'Time tracking synced to billing and invoicing',
    'CRM, accounting, and project tool integrations', 'Real-time operational and financial dashboards',
    'Role-based approval workflows with audit logging', 'Automated recurring reporting for leadership and clients',
    'Document generation and e-signature workflows',
  ],
  technologies: ['Salesforce', 'HubSpot', 'QuickBooks', 'Stripe', 'DocuSign', 'Zapier', 'AWS', 'PostgreSQL', 'Node.js'],
};

export default function BusinessServicesPage() {
  return <IndustryPageTemplate data={pageData} />;
}
