'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projectApi } from '@/lib/api';
import type { Project } from '@/types';
import ProjectFormClient from '@/components/admin/ProjectFormClient';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectApi.getById(id)
      .then(res => setProject(res.data.data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-center text-white/40 text-sm">Project not found.</div>;
  }

  return <ProjectFormClient project={project} />;
}
