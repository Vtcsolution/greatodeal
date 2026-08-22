'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { portfolioApi } from '@/lib/api';
import PortfolioFormClient from '@/components/admin/PortfolioFormClient';
import type { PortfolioProject } from '@/types';

export default function EditPortfolioProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getById(id)
      .then(res => setProject(res.data.data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-white/50">Project not found.</div>;
  }

  return <PortfolioFormClient project={project} />;
}
