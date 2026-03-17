import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Layers } from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center relative py-12 lg:py-24">
      {/* 3D Background */}
      <HeroScene />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10 space-y-8 mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full hidden glass-card shadow-lg shadow-cyan-500/10 border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Next-Gen Interactive Curriculum
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white !leading-tight"
        >
          Master Mobile App <br />
          <span className="text-gradient">Development</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium"
        >
          Immerse yourself in a fully interactive, 3D-powered learning experience. Explore the mobile ecosystem, master lifecycles, and build native applications from scratch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link
            to="/modules"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
          >
            Start Curriculum
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-white hover:bg-zinc-800 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5 text-cyan-400" />
            Interactive Projects
          </Link>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-32 relative z-10"
      >
        {[
          { icon: Smartphone, color: 'text-purple-400', title: 'Live Phone Simulation', desc: 'Interact with code that renders directly onto a virtual 3D device.' },
          { icon: Layers, color: 'text-cyan-400', title: 'Deep Architecture', desc: 'Understand MVC, Activity Lifecycles, and Android OS internals.' },
          { icon: Code, color: 'text-pink-400', title: 'Production Ready', desc: 'Write industry-standard XML layouts and robust Java/Kotlin logic.' }
        ].map((feat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl group hover:border-zinc-700 transition-colors">
            <div className={`p-3 rounded-lg bg-zinc-900 border border-zinc-800 w-max mb-4 group-hover:neon-glow transition-shadow`}>
              <feat.icon className={`w-6 h-6 ${feat.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
