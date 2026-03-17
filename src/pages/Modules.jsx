import { learningModules } from '../data/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';

const Modules = () => {
  const completedModules = useStore((state) => state.completedModules);

  return (
    <div className="max-w-5xl mx-auto w-full py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Curriculum</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Master mobile application development from the ground up. Proceed sequentially through the modules to build a strong foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((mod, index) => {
          const isCompleted = completedModules.includes(mod.id);
          
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={`/module/${mod.id}`}
                className={`block h-full glass-card p-6 rounded-2xl border transition-all duration-300 group
                  ${isCompleted ? 'border-cyan-500/30 bg-cyan-950/10' : 'hover:border-zinc-700 hover:bg-zinc-900/50'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${isCompleted ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors'}`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                  <span className="text-zinc-600 font-mono text-sm leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {mod.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-3">
                  {mod.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Modules;
