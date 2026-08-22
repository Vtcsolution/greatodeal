'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Activity, HeartPulse, Lock, ClipboardCheck, Stethoscope, Database } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Healthcare',
  subtitle: 'Compliance-Grade Healthcare AI',
  description: 'A mistake in a healthcare system isn\'t a bug ticket. It\'s a patient outcome. We build AI-powered clinical and operational systems for providers, payers, and health-tech companies, engineered around HIPAA compliance, data integrity, and full auditability from the first line of code.',
  icon: Activity,
  heroIcon: HeartPulse,
  stats: [
    { value: 'HIPAA', label: 'Compliant by Design' },
    { value: '100%', label: 'PHI Access Logging' },
    { value: 'Encrypted', label: 'End-to-End' },
    { value: '6+', label: 'Years Health-Tech Exp.' },
  ],
  challenges: [
    'Fragmented patient data across EHRs, labs, and specialist systems',
    'HIPAA, HITECH, and state-level privacy compliance across every system touchpoint',
    'Manual clinical workflows that slow down care coordination',
    'Interoperability failures between hospital, payer, and pharmacy systems',
    'Audit requirements for every access to protected health information',
    'AI-assisted clinical tools that need explainability for regulatory and liability reasons',
    'Legacy hospital systems that can\'t be modernized without downtime risk',
    'Telehealth and remote-monitoring platforms that must meet the same compliance bar as in-person care',
  ],
  solutions: [
    { icon: Database, title: 'Interoperable Health Records', desc: 'HL7/FHIR-based data pipelines that unify patient records across EHRs, labs, and specialists without breaking existing hospital systems.' },
    { icon: Lock, title: 'HIPAA-Compliant Infrastructure', desc: 'Encrypted storage, access-controlled APIs, and PHI handling built to HIPAA and HITECH requirements from the architecture up, not patched on after launch.' },
    { icon: Stethoscope, title: 'Clinical Workflow Automation', desc: 'Agentic automation for scheduling, care coordination, and administrative workflows that free up clinical staff for patient care.' },
    { icon: ClipboardCheck, title: 'Auditable AI Clinical Support', desc: 'AI-assisted diagnostics and triage tools that log their reasoning and evidence, so every recommendation is reviewable by a clinician.' },
    { icon: Activity, title: 'Telehealth & Remote Monitoring', desc: 'Secure video consultation and remote patient-monitoring platforms held to the same compliance and audit standards as in-person care.' },
    { icon: Database, title: 'PHI Access Auditing', desc: 'Immutable logs of every access to protected health information, mapped directly to HIPAA audit and breach-notification requirements.' },
  ],
  features: [
    'HIPAA & HITECH compliant architecture', 'HL7/FHIR interoperability', 'End-to-end PHI encryption',
    'Immutable PHI access audit logs', 'Role-based clinical access control', 'Explainable AI clinical support tools',
    'Telehealth & remote monitoring', 'Care coordination automation', 'EHR & lab system integration',
    'Breach detection & notification workflows', 'Business Associate Agreement (BAA) ready infrastructure', 'Patient consent management',
  ],
  technologies: ['Python', 'Node.js', 'HL7/FHIR', 'PostgreSQL', 'AWS (HIPAA-eligible)', 'Azure Health Data Services', 'TensorFlow', 'OpenAI', 'LangChain', 'OAuth2', 'Twilio', 'Docker'],
};

export default function HealthcarePage() {
  return <IndustryPageTemplate data={pageData} />;
}
