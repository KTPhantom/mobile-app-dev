import { Link, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import { learningModules } from '../../data/modules';
import { Smartphone } from 'lucide-react';

const Navbar = () => {
  const completedModules = useStore((state) => state.completedModules);
  const location = useLocation();

  const progressPercentage = (completedModules.length / learningModules.length) * 100;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-zinc-800 border-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:neon-border transition-all">
                <Smartphone className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-gradient transition-all">
                AppDev<span className="font-light text-zinc-400">Mastery</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="flex space-x-1">
              <Link 
                to="/modules" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.startsWith('/module') ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}
              >
                Modules
              </Link>
              <Link 
                to="/projects" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.startsWith('/project') ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}
              >
                Projects
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-zinc-400 font-medium">Progress</span>
              <span className="text-sm font-bold text-white">
                {completedModules.length} / {learningModules.length} Modules
              </span>
            </div>
            
            {/* Progress Circle mini */}
            <div className="relative w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Progress Bar */}
      <div className="w-full h-1 bg-zinc-900">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
