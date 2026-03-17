import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, BatteryLow, Wifi, Smartphone, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module2({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedFix, setSelectedFix] = useState(null);

  const issue = {
    title: "The Commuter Problem",
    context: "Your user is on a crowded subway train traveling at 60mph.",
    conditions: [
      { icon: BatteryLow, text: "15% Battery", color: "text-red-500" },
      { icon: Wifi, text: "Dropping 3G Connection", color: "text-yellow-500" },
      { icon: Smartphone, text: "Holding phone with one hand", color: "text-zinc-400" },
    ]
  };

  const renderContent = () => {
    switch (step) {
      case 0: // HOOK
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col text-center items-center py-6">
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/10 blur-[80px] pointer-events-none" />
              
              <div className="flex justify-center mb-6">
                <Train className="w-16 h-16 text-zinc-300" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">{issue.title}</h2>
              <p className="text-xl text-zinc-400 mb-8">{issue.context}</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {issue.conditions.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 bg-zinc-950 px-4 py-2 rounded-full border border-zinc-800">
                    <c.icon className={`w-5 h-5 ${c.color}`} />
                    <span className="text-zinc-300 text-sm font-medium">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-full transition-all flex items-center gap-2"
            >
              Analyze Constraints <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );

      case 1: // INTERACTIVE FLOW: Design Decision
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <h2 className="text-3xl font-bold text-white mb-2">Critical Design Failure</h2>
            <p className="text-zinc-400 mb-8">
              The user opens your new photo-sharing app. Because they are on dropping 3G, the high-res images refuse to load, leaving them staring at a blank, frozen white screen. They get frustrated and are hovering their thumb over the "Uninstall" button.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">How do you fix this UX disaster?</h3>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                { id: 'wrong1', text: "Increase network timeout limits to 60 seconds so it keeps trying quietly.", error: "Users stare at a blank screen for 60 seconds. They still uninstall." },
                { id: 'correct', text: "Show Skeleton UI loaders instantly, and cache a low-res thumbnail version of the image.", success: "Yes! Visual feedback is immediate, and graceful degradation saves bandwidth." },
                { id: 'wrong2', text: "Show a full-screen popup saying 'Network Error! Please connect to high-speed WiFi'.", error: "Terrible UX. You are blaming the user for real-world conditions." }
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => setSelectedFix(opt)}
                  className={`text-left p-6 rounded-2xl border transition-all
                    ${selectedFix?.id === opt.id 
                      ? (opt.id === 'correct' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') 
                      : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'
                    }
                  `}
                >
                  <p className={`font-medium ${selectedFix?.id === opt.id ? 'text-white' : 'text-zinc-300'}`}>{opt.text}</p>
                  
                  {selectedFix?.id === opt.id && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-white/10 flex items-start gap-3">
                       <ShieldAlert className={`w-5 h-5 shrink-0 ${opt.id === 'correct' ? 'text-green-400' : 'text-red-400'}`} />
                       <p className={`text-sm ${opt.id === 'correct' ? 'text-green-300' : 'text-red-300'}`}>{opt.success || opt.error}</p>
                     </motion.div>
                  )}
                </button>
              ))}
            </div>

            {selectedFix?.id === 'correct' && (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl self-end transition-colors"
              >
                Continue Component Review
              </motion.button>
            )}
          </motion.div>
        );

      case 2: // MICRO-EXPLANATION & TAKEAWAY
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Context Defines Architecture</h2>
                <p className="text-zinc-400">Web sites assume stability. Mobile apps assume chaos.</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl mb-12">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <p className="text-zinc-300"><strong>Battery:</strong> Excessive GPS checking or endless background network retries will drain the battery and lead to an immediate uninstall.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <p className="text-zinc-300"><strong>Ergonomics:</strong> If the user is holding onto a train rail with one hand, critical 'Thumb-Zone' actions (like placing an order) must be reachable at the bottom of the screen.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                  <p className="text-zinc-300"><strong>Network Chaos:</strong> Always cache read-data (Offline-First) and show optimistic UI updates when writing data.</p>
                </li>
              </ul>
            </div>

            <ModuleQuiz 
              question="What is the concept of 'Graceful Degradation' in the context of mobile network failure?"
              options={[
                "Crashing the app silently so the user restarts it.",
                "Displaying lower-quality assets (like thumbnails) or cached data instead of showing a blank screen when the connection is poor.",
                "Disabling all user input completely until 5G is restored.",
                "Making the UI elements smaller to save memory."
              ]}
              correctAnswer={1}
              onPass={onComplete}
            />
          </motion.div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
