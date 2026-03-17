import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col pt-17 relative z-0">
      <Navbar />
      
      {/* Background ambient light */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="mt-auto py-8 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500 text-sm">
          Mobile App Development Course &copy; 2026
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
