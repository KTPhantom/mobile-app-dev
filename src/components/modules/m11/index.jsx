import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Activity, ArrowRight, Loader } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module11({ onComplete }) {
  const [step, setStep] = useState(0);
  const [uiFrozen, setUiFrozen] = useState(false);
  const [counter, setCounter] = useState(0);

  const freezeUI = () => {
    setUiFrozen(true);
    // Simulate an actual intense synchronous block that freezes the thread
    setTimeout(() => {
      let result = 0;
      for (let i = 0; i < 3000000000; i++) { result += i; } // CPU intensive loop
      setUiFrozen(false);
      setStep(2); // Move to explanation after unfreezing
    }, 100);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <h2 className="text-4xl font-black text-white mb-6">The Fatal Mistake.</h2>
            <div className="w-full max-w-xl bg-orange-500/10 border border-orange-500/30 p-6 rounded-2xl mb-8">
              <p className="text-orange-400 font-medium">"My app is showing an 'App Not Responding' (ANR) error and crashing!"</p>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              When an event triggers, the code must execute. But <strong>where</strong> it executes is critical. All UI updates happen on a single 'Main Thread'. If you put a huge 10-second download task on that Main Thread, the entire app freezes.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full transition-colors"
            >
              Simulate a Frozen UI Thread
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center py-8">
            <h3 className="text-2xl font-bold text-white mb-8">The Target Application</h3>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 relative overflow-hidden">
              {uiFrozen && (
                <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center cursor-not-allowed">
                  <Activity className="w-12 h-12 text-red-500 animate-pulse mb-4" />
                  <p className="text-red-400 font-bold text-xl">UI THREAD BLOCKED</p>
                  <p className="text-zinc-400 text-sm mt-2">Computing heavy loop synchronously...</p>
                </div>
              )}

              <p className="text-zinc-400 mb-6">This button updates instantly because it takes 0.001ms to run.</p>
              <button 
                onClick={() => setCounter(c => c + 1)}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-2xl mb-12 shadow-inner"
              >
                Count: {counter}
              </button>

              <div className="h-px bg-zinc-800 w-full mb-12" />

              <p className="text-zinc-400 mb-6">This button runs a massive CPU task on the <strong>same thread</strong>.</p>
              <button 
                onClick={freezeUI}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 w-full"
              >
                <Server className="w-5 h-5" /> Run 3 Billion Loop Count
              </button>

              <p className="text-zinc-500 text-sm mt-6">Try clicking the Counter while the heavy task runs.</p>
            </div>
          </motion.div>
        );

      case 2:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Never Block the Main Thread</h2>
            
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-12">
              <p className="text-zinc-300 mb-6 leading-relaxed">
                As you saw, while the massive CPU loop was running, the UI was completely unresponsive. The OS couldn't even draw the counter going up because the thread responsible for drawing was busy doing math!
              </p>
              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl">
                <h4 className="text-green-400 font-bold mb-2">The Solution: Background Threads</h4>
                <p className="text-green-300/80 text-sm">Any heavy task (Network requests, Database queries, massive calculations) MUST be offloaded to a Background Thread (or coroutine). Once the background thread is done, it posts the result back to the Main Thread safely.</p>
              </div>
            </div>

            <ModuleQuiz 
              question="You need to download a 5MB image from a URL when a user clicks a button. Where should this download operation occur?"
              options={[
                "On the Main UI Thread, tightly coupled with the Activity's click listener.",
                "On a Background (Worker) Thread, so it does not block the UI from functioning during the download.",
                "In the Application onCreate() method.",
                "It doesn't matter, the Android compiler will optimize it."
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
