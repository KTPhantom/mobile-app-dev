import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, DollarSign, Clock, Layers, Globe, Smartphone } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module4({ onComplete }) {
  const [step, setStep] = useState(0);
  const [startupChoice, setStartupChoice] = useState(null);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Startup Simulator</h2>
            <p className="text-xl text-zinc-400 max-w-lg mx-auto mb-10">
              You've raised $50,000 to build your new startup idea. You need to get an MVP (Minimum Viable Product) out immediately to both iOS and Android users to test the market, but you only have the budget to hire one developer.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Analyze Options
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Select Your Strategy</h2>
            <p className="text-zinc-400 text-center mb-10">Remember your constraints: Low Budget, Need both iOS & Android quickly, 1 Developer.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  id: 'native', 
                  title: 'Pure Native App', 
                  icon: Smartphone,
                  desc: 'Write Swift for iOS and Kotlin for Android natively.',
                  pros: 'Maximum performance, full hardware access.',
                  cons: 'Requires 2 separate codebases. Highest cost. Slowest time to market.'
                },
                { 
                  id: 'hybrid', 
                  title: 'Cross-Platform App', 
                  icon: Layers,
                  desc: 'Use React Native or Flutter.',
                  pros: 'One codebase compiles to both iOS and Android. Native-like performance.',
                  cons: 'Slightly complex setup, reliant on third-party bridge libraries.'
                },
                { 
                  id: 'pwa', 
                  title: 'Progressive Web App', 
                  icon: Globe,
                  desc: 'Build a standard Website that acts like an app.',
                  pros: 'Fastest to build. Zero app-store approval required.',
                  cons: 'Poor performance compared to native. Cannot access deep device hardware.'
                }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setStartupChoice(opt.id)}
                  className={`text-left p-6 rounded-3xl border transition-all flex flex-col h-full
                    ${startupChoice === opt.id ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}
                  `}
                >
                  <opt.icon className={`w-8 h-8 mb-4 ${startupChoice === opt.id ? 'text-purple-400' : 'text-zinc-500'}`} />
                  <h3 className={`text-xl font-bold mb-2 ${startupChoice === opt.id ? 'text-white' : 'text-zinc-300'}`}>{opt.title}</h3>
                  <p className="text-sm text-zinc-400 mb-6 flex-1">{opt.desc}</p>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="text-xs font-medium text-green-400 bg-green-400/10 p-2 rounded">✓ {opt.pros}</div>
                    <div className="text-xs font-medium text-red-400 bg-red-400/10 p-2 rounded">✗ {opt.cons}</div>
                  </div>
                </button>
              ))}
            </div>

            {startupChoice && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex justify-center">
                <button 
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all"
                >
                  Confirm Strategy
                </button>
              </motion.div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {startupChoice === 'hybrid' ? (
              <div className="p-6 bg-green-500/20 border border-green-500/50 rounded-2xl mb-10 text-center">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Excellent Choice!</h3>
                <p className="text-zinc-300">
                  Cross-Platform frameworks (like React Native, which this application is inspired by) allow a single developer to write code once and deploy it as a highly performant application to both iOS and Android App Stores simultaneously.
                </p>
              </div>
            ) : (
              <div className="p-6 bg-yellow-500/20 border border-yellow-500/50 rounded-2xl mb-10 text-center">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">A Risky Move!</h3>
                <p className="text-zinc-300">
                  {startupChoice === 'native' 
                    ? "Native apps are too expensive for your budget. You can't hire an iOS developer AND an Android developer with $50k while still moving fast."
                    : "PWAs are fast to build, but users expect to find your app on the App Store. By not having a presence there, you lose massive credibility and potential users."}
                </p>
                <p className="text-white mt-4 font-medium">The optimal choice given your constraints is a Cross-Platform App (Hybrid).</p>
              </div>
            )}

            <ModuleQuiz 
              question="Which development approach involves writing a single codebase (e.g., in JavaScript or Dart) that is then packaged to run on BOTH Android and iOS as a native-feeling application?"
              options={[
                "Pure Native Development",
                "Progressive Web App (PWA) Development",
                "Cross-Platform / Hybrid Development",
                "Server-Side Rendering (SSR)"
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
    <div className="min-h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
