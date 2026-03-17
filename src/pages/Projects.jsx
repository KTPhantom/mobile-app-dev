import { interactiveProjects } from '../data/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ArrowRight } from 'lucide-react';

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto w-full py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4 flex items-center gap-3">
          <Code2 className="text-cyan-400 w-10 h-10" />
          Interactive Projects
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Apply what you've learned. Write code on the left and see it compile onto a live 3D-simulated device in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {interactiveProjects.map((proj, index) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            <Link 
              to={`/project/${proj.id}`}
              className="flex flex-col h-full glass-card overflow-hidden rounded-2xl border hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
            >
              <div className="h-48 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center relative overflow-hidden group-hover:bg-zinc-800 transition-colors">
                {/* Minimalist abstract representation for the project hero image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/10"></div>
                <div className="text-6xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {proj.title}
                </h3>
                <p className="text-zinc-400 mb-6 flex-1">
                  {proj.description}
                </p>
                <div className="inline-flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                  Start Project <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
