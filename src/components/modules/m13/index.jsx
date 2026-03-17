import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, AlertCircle, MessageSquare } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module13({ onComplete }) {
  const [step, setStep] = useState(0);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <h2 className="text-4xl font-black text-white mb-6 text-center">The Annoying App</h2>
            <div className="w-full max-w-sm h-[300px] bg-zinc-950 border-8 border-zinc-800 rounded-[32px] relative overflow-hidden flex items-end justify-center pb-12 mb-10 shadow-lg">
               {/* Simulated spamming toasts */}
               <motion.div animate={{y: [40, 0, 0, 40], opacity: [0, 1, 1, 0]}} transition={{duration: 2, repeat: Infinity}} className="absolute bottom-20 bg-zinc-800 px-4 py-2 rounded-full text-white text-sm whitespace-nowrap z-10 shadow-xl">Data synced</motion.div>
               <motion.div animate={{y: [40, 0, 0, 40], opacity: [0, 1, 1, 0]}} transition={{duration: 2, delay: 0.8, repeat: Infinity}} className="absolute bottom-10 bg-zinc-800 px-4 py-2 rounded-full text-white text-sm whitespace-nowrap z-20 shadow-xl">Fetching location...</motion.div>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              A <strong>Toast</strong> is a small popup message that appears at the bottom of the screen. It is great for tiny feedback. It is terrible for crucial information. Let's fix this app's UX.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-full transition-colors flex items-center gap-2"
            >
              Start UX Review
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Toast or Dialog?</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto w-full">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-8 h-8"/>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Scenario: Deleting an Account</h3>
                  <p className="text-zinc-400 text-sm">The user tapped 'Delete Everything'. How do you confirm this destructive action?</p>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <button onClick={() => alert("Wrong! A toast disappears automatically. If the user isn't looking, their account is gone with no confirmation.")} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border-2 border-transparent">Use a Toast</button>
                  <button onClick={() => document.getElementById('scen1').style.display='block'} className="px-6 py-2 bg-zinc-800 hover:bg-green-600 text-white font-bold rounded-lg text-sm transition-colors border-2 border-transparent">Use an AlertDialog</button>
                  <span id="scen1" className="text-green-500 text-sm font-bold text-center mt-2 hidden">✓ Correct (Requires User Action)</span>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-8 h-8"/>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Scenario: Email Sent</h3>
                  <p className="text-zinc-400 text-sm">The user tapped Send. The email went through successfully. You want to let them know quietly.</p>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <button onClick={() => document.getElementById('scen2').style.display='block'} className="px-6 py-2 bg-zinc-800 hover:bg-green-600 text-white font-bold rounded-lg text-sm transition-colors border-2 border-transparent">Use a Toast / Snackbar</button>
                  <button onClick={() => alert("Wrong! Making the user tap 'OK' on an intrusive popup just to tell them a standard action succeeded is incredibly annoying UX.")} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border-2 border-transparent">Use an AlertDialog</button>
                  <span id="scen2" className="text-green-500 text-sm font-bold text-center mt-2 hidden">✓ Correct (Non-intrusive)</span>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-8 h-8"/>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Scenario: Fetching Data</h3>
                  <p className="text-zinc-400 text-sm">The app is taking 4 seconds to download a heavy list. You want to tell the user to wait.</p>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <button onClick={() => alert("Wrong! Toasts can stack up and linger on the screen long after the data finishes loading.")} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors border-2 border-transparent">Use a Toast</button>
                  <button onClick={() => document.getElementById('scen3').style.display='block'} className="px-6 py-2 bg-zinc-800 hover:bg-green-600 text-white font-bold rounded-lg text-sm transition-colors border-2 border-transparent">Use a Spinner/ProgressUI</button>
                  <span id="scen3" className="text-green-500 text-sm font-bold text-center mt-2 hidden">✓ Correct (Indicates state dynamically)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button onClick={() => setStep(2)} className="px-8 py-4 bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors rounded-xl">Next: UX Review Summary</button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Toast Principles</h2>
            <br />
            <ModuleQuiz 
              question="What is the primary defining characteristic of an Android Toast message compared to an AlertDialog?"
              options={[
                "A Toast can contain complex UI layouts with multiple buttons and images.",
                "Toasts pause the execution of the main thread until the user dismisses them.",
                "A Toast provides transient (temporary) feedback and disappears automatically without requiring the user to tap 'OK' to close it.",
                "Toasts are only available on rooted Android devices."
              ]}
              correctAnswer={2}
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
