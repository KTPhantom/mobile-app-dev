import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const ModuleQuiz = ({ question, options, correctAnswer, onPass }) => {
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const isCorrect = selected === correctAnswer;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selected === correctAnswer) {
      setTimeout(() => onPass(), 1500); // Wait a bit before bubbling up success
    }
  };

  const handleReset = () => {
    setSelected(null);
    setIsSubmitted(false);
  };

  return (
    <div className="mt-16 pt-12 border-t border-zinc-800/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Knowledge Check</h3>
      </div>
      
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <p className="text-xl text-white font-medium mb-8 relative z-10">{question}</p>
        
        <div className="space-y-3 relative z-10">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !isSubmitted && setSelected(i)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between
                ${isSubmitted && i === correctAnswer 
                  ? 'border-green-500/50 bg-green-500/10 text-green-400' 
                  : isSubmitted && selected === i && i !== correctAnswer
                    ? 'border-red-500/50 bg-red-500/10 text-red-400'
                    : selected === i
                      ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-950/30 text-white'
                      : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white'}
              `}
            >
              <span className="font-medium text-lg">{opt}</span>
              {isSubmitted && i === correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-400" />}
              {isSubmitted && selected === i && i !== correctAnswer && <XCircle className="w-5 h-5 text-red-400" />}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end relative z-10">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2
                ${selected !== null 
                  ? 'bg-white text-zinc-950 hover:bg-zinc-200' 
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
              `}
            >
              Submit Answer
            </button>
          ) : (
            <AnimatePresence mode="wait">
              {isCorrect ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-green-400 font-bold px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20"
                >
                  <CheckCircle2 className="w-5 h-5" /> Module Passed!
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleReset}
                  className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
                >
                  Try Again
                </motion.button>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleQuiz;
