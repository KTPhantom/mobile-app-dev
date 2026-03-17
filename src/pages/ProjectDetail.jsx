import { useParams, useNavigate } from 'react-router-dom';
import { interactiveProjects } from '../data/modules';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import React, { lazy, Suspense } from 'react';

// Use Vite's import.meta.glob feature correctly
const projectImporters = import.meta.glob('../components/projects/*/index.jsx');

const loadProjectContent = (id) => {
  const importPath = `../components/projects/${id}/index.jsx`;
  if (projectImporters[importPath]) {
    return lazy(projectImporters[importPath]);
  }
  return lazy(() => Promise.resolve({ 
    default: () => <div className="p-8 text-center text-zinc-500">Project content not found for {id}.</div> 
  }));
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectData = interactiveProjects.find(p => p.id === id);
  
  if (!projectData) return <div className="text-white">Project not found</div>;

  const ProjectComponent = loadProjectContent(id);

  return (
    <div className="w-full max-w-7xl flex flex-col items-start pt-4 pb-12">
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      <Suspense fallback={<div className="h-64 flex items-center justify-center text-zinc-500 w-full">Booting interactive environment...</div>}>
        <ProjectComponent />
      </Suspense>
    </div>
  );
};

export default ProjectDetail;
