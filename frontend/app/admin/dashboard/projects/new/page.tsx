'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectFormClient from '@/components/admin/ProjectFormClient';

function NewProjectInner() {
  const params = useSearchParams();
  const contactId = params.get('contactId') || '';
  const clientName = params.get('clientName') || '';
  const clientEmail = params.get('clientEmail') || '';
  const company = params.get('company') || undefined;
  const services = params.get('services') || undefined;

  if (!contactId || !clientName || !clientEmail) {
    return (
      <div className="p-8 text-center text-white/40 text-sm">
        Missing client info — open this from a closed lead on the Leads / Emails page.
      </div>
    );
  }

  return <ProjectFormClient prefill={{ contactId, clientName, clientEmail, company, services }} />;
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <NewProjectInner />
    </Suspense>
  );
}
