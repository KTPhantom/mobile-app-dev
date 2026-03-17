import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone, Shield, Apple, Gem, Zap } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module1({ onComplete }) {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState({ os: null });

  const renderContent = () => {
    switch (step) {
      case 0: // HOOK
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-10">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">You are the CEO.</h2>
            <p className="text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
              You are launching a revolutionary new smartphone company. 
              Before designing the hardware, you must make your most critical software decision.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-full transition-all flex items-center gap-2"
            >
              Make the Decision <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );

      case 1: // DECISION: iOS vs Android
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Choose Your Ecosystem</h2>
            <p className="text-zinc-400 text-center mb-10">Which operating system will power your new devices?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => { setChoices({ ...choices, os: 'ios' }); setStep(2); }}
                className="group relative flex flex-col items-center p-8 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-3xl transition-all h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Apple className="w-16 h-16 text-zinc-300 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Apple iOS</h3>
                <p className="text-zinc-500 text-sm text-center">Closed Ecosystem. Complete vertical integration.</p>
              </button>

              <button 
                onClick={() => { setChoices({ ...choices, os: 'android' }); setStep(3); }}
                className="group relative flex flex-col items-center p-8 bg-zinc-900 border border-cyan-900/30 hover:border-cyan-500 rounded-3xl transition-all h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.523 15.3414C17.135 15.3414 16.8207 15.0264 16.8207 14.6391C16.8207 14.2511 17.135 13.9368 17.523 13.9368C17.9103 13.9368 18.2254 14.2511 18.2254 14.6391C18.2254 15.0264 17.9103 15.3414 17.523 15.3414ZM6.47696 15.3414C6.08896 15.3414 5.77464 15.0264 5.77464 14.6391C5.77464 14.2511 6.08896 13.9368 6.47696 13.9368C6.86496 13.9368 7.17928 14.2511 7.17928 14.6391C7.17928 15.0264 6.86496 15.3414 6.47696 15.3414ZM12 0C5.37346 0 0 5.37254 0 12C0 18.6275 5.37346 24 12 24C18.6265 24 24 18.6275 24 12C24 5.37254 18.6265 0 12 0ZM17.4725 18H6.52654C5.77537 18 5.14811 17.4398 5.02528 16.696L4.08485 10.9859C4.0152 10.5633 4.34102 10.1873 4.76794 10.1873H19.2311C19.658 10.1873 19.9839 10.5633 19.9142 10.9859L18.9738 16.696C18.851 17.4398 18.2237 18 17.4725 18Z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Google Android</h3>
                <p className="text-zinc-500 text-sm text-center">Open-Source Ecosystem. Hardware agnostic.</p>
              </button>
            </div>
          </motion.div>
        );

      case 2: // FEEDBACK: Chose iOS
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto text-center py-10">
             <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-6">Lawsuit Incoming!</h2>
             <p className="text-zinc-300 mb-8 leading-relaxed">
               You chose iOS. Immediately, Apple's legal team sends you a cease and desist. <br/><br/>
               <strong>Why?</strong> iOS is a closed, proprietary ecosystem. Only Apple is legally and technically permitted to manufacture devices that run iOS.
             </p>
             <button 
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-full transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Go back and choose Android
            </button>
          </motion.div>
        );

      case 3: // FEEDBACK: Chose Android
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Excellent Choice.</h2>
                <p className="text-zinc-400">Android is open-source (AOSP).</p>
              </div>
            </div>

            <p className="text-lg text-zinc-300 leading-relaxed mb-10">
              Because Android is open-source, any hardware manufacturer (Samsung, Nothing, Google, Xiaomi, You!) can modify the OS, install it on their hardware, and sell it without paying Google licensing fees. 
              <br/><br/>
              However, this introduces the biggest challenge in mobile dev: <strong className="text-cyan-400">Fragmentation.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h4 className="text-white font-bold mb-2">iOS (Uniformity)</h4>
                <p className="text-sm text-zinc-500">2-3 screen sizes to design for. Software updates reach 90% of users in weeks. Developers love this predictability.</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500/30">
                <h4 className="text-cyan-400 font-bold mb-2">Android (Fragmentation)</h4>
                <p className="text-sm text-zinc-400">Thousands of screen sizes, aspect ratios, processor speeds, and heavily outdated OS versions. Developers must build highly adaptable UIs to survive.</p>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all self-end"
            >
              Continue to Recap
            </button>
          </motion.div>
        );

      case 4: // TAKEAWAY & QUIZ
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-8">Ecosystem Takeaways</h2>
            
            <ul className="space-y-4 mb-12">
              <li className="flex gap-4 items-start bg-zinc-900/50 p-4 rounded-xl">
                <Gem className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                <p className="text-zinc-300"><strong>Closed vs Open:</strong> Apple entirely controls the iOS hardware and software pipeline. Android separates hardware (OEMs) from software (Google/AOSP).</p>
              </li>
              <li className="flex gap-4 items-start bg-zinc-900/50 p-4 rounded-xl">
                <Gem className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                <p className="text-zinc-300"><strong>Fragmentation:</strong> The open nature of Android means developers face immense challenges ensuring compatibility across thousands of distinct device profiles.</p>
              </li>
            </ul>

            <ModuleQuiz 
              question="Why does the Android ecosystem suffer heavily from device 'fragmentation' compared to iOS?"
              options={[
                "Because Google's hardware division manufactures thousands of different phone models.",
                "Android is closed-source, making it difficult for developers to standardize rules.",
                "Because its open-source nature allows hundreds of different manufacturers to run modified versions of the OS on diverse hardware capabilities.",
                "Because Android only supports a single screen resolution."
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
