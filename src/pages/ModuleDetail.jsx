import { useParams, useNavigate } from 'react-router-dom';
import { learningModules } from '../data/modules';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Gamepad2, BookOpen } from 'lucide-react';
import React, { lazy, Suspense, useState } from 'react';
import { moduleTheoryData } from '../data/theory';

// Use Vite's import.meta.glob feature to statically analyze the dynamic imports
const moduleImporters = import.meta.glob('../components/modules/*/index.jsx');

const loadModuleContent = (id) => {
  const importPath = `../components/modules/${id}/index.jsx`;
  if (moduleImporters[importPath]) {
    return lazy(moduleImporters[importPath]);
  }
  return lazy(() => Promise.resolve({ 
    default: () => <div className="p-8 text-center text-zinc-500">Module content not found for {id}.</div> 
  }));
};

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'theory'
  
  const moduleData = learningModules.find(m => m.id === id);
  const markComplete = useStore(state => state.markModuleComplete);
  const completedModules = useStore(state => state.completedModules);
  
  if (!moduleData) return <div className="text-white">Module not found</div>;

  const isCompleted = completedModules.includes(id);
  const ContentComponent = loadModuleContent(id);

  const handleComplete = () => {
    markComplete(id);
    // Could automatically navigate to next module or show a success toast
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-8">
      <button 
        onClick={() => navigate('/modules')}
        className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Curriculum
      </button>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold text-white">{moduleData.title}</h1>
          {isCompleted && (
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-bold rounded-full flex items-center gap-1 border border-cyan-500/30">
              <CheckCircle2 className="w-4 h-4" /> Completed
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-xl">{moduleData.description}</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-px">
        <button 
          onClick={() => setActiveTab('interactive')}
          className={`pb-4 px-4 text-lg font-bold flex items-center gap-2 transition-all relative
            ${activeTab === 'interactive' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          <Gamepad2 className="w-5 h-5" /> Interactive Lab
          {activeTab === 'interactive' && (
            <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('theory')}
          className={`pb-4 px-4 text-lg font-bold flex items-center gap-2 transition-all relative
            ${activeTab === 'theory' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          <BookOpen className="w-5 h-5" /> Exam Prep Theory
          {activeTab === 'theory' && (
            <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />
          )}
        </button>
      </div>

      <div className="bg-zinc-950/50 rounded-3xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        {activeTab === 'interactive' ? (
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-zinc-500">Loading interactive content...</div>}>
              <ContentComponent onComplete={handleComplete} />
            </Suspense>
        ) : (
            <motion.div 
               initial={{opacity: 0, y: 10}} 
               animate={{opacity: 1, y: 0}} 
               className="max-w-3xl py-4 pb-12"
            >
               {moduleTheoryData[id] ? (
                   <>
                     <h2 className="text-3xl font-bold text-white mb-10 pb-4 border-b border-zinc-800">{moduleTheoryData[id].title}</h2>
                     <div className="space-y-12">
                       {moduleTheoryData[id].sections.map((sec, idx) => (
                           <div key={idx}>
                             <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                               <span className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-sm">{idx + 1}</span>
                               {sec.heading}
                             </h3>
                             <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
                               {sec.content}
                             </p>
                           </div>
                       ))}
                     </div>
                     {!isCompleted && (
                       <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-center">
                          <button onClick={handleComplete} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                            Mark Theory Module as Exam-Ready
                          </button>
                       </div>
                     )}
                   </>
               ) : (
                   <div className="text-zinc-500 text-center py-20">Theory content formulation pending for this module.</div>
               )}
            </motion.div>
        )}
      </div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-end"
        >
          <button 
            onClick={() => navigate('/modules')}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors"
          >
            Continue to Next Module
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleDetail;
