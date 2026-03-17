import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Zap, XCircle } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module10({ onComplete }) {
  const [step, setStep] = useState(0);
  const [buttonWired, setButtonWired] = useState(false);
  const [clicked, setClicked] = useState(false);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <h2 className="text-4xl font-black text-white mb-6 text-center">The Silent UI</h2>
            <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10 flex flex-col items-center">
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl w-full active:scale-95 transition-all">Submit Order</button>
               <p className="text-zinc-500 text-sm mt-4 text-center">Click it. Nothing happens.</p>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              A UI element like a Button is completely useless on its own. It's just a drawing on the screen. To make it perform an action when the user taps it, we must attach an <strong>Event Listener</strong>.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-full transition-colors flex items-center gap-2"
            >
              Wire the Button <Zap className="w-5 h-5"/>
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
            
            {/* Logic Panel */}
            <div className="flex-1 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full">
              <h3 className="text-2xl font-bold text-white mb-6">Attach the Listener</h3>
              <p className="text-zinc-400 mb-6">
                In Java/Kotlin, we use <code>setOnClickListener</code>. In React, we use <code>onClick</code>. Connect the logic block to the UI element.
              </p>

              <div className="space-y-4">
                <div 
                  className={`p-4 border-2 border-dashed rounded-xl font-mono text-sm transition-colors ${buttonWired ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-zinc-700 bg-zinc-950 text-zinc-500 cursor-pointer hover:border-yellow-500 hover:text-yellow-400'}`}
                  onClick={() => !buttonWired && setButtonWired(true)}
                >
                  {buttonWired ? "// Attached ✓\nprocessPayment();" : "Click here to drag logic → button.setOnClickListener()"}
                </div>
              </div>

              {buttonWired && (
                <div className="mt-8">
                  <p className="text-green-400 mb-4 font-bold">Listener attached! Now tap the UI Button on the right.</p>
                </div>
              )}
            </div>

            {/* UI Preview */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-zinc-950 border border-zinc-800 rounded-3xl w-full min-h-[300px] relative overflow-hidden">
               {clicked && <motion.div initial={{scale:0, opacity:1}} animate={{scale:3, opacity:0}} transition={{duration:1}} className="absolute bg-green-500/30 w-32 h-32 rounded-full pointer-events-none" />}
               
               <button 
                onClick={() => {
                  if (buttonWired) {
                    setClicked(true);
                    setTimeout(() => setStep(2), 1500);
                  }
                }}
                className={`relative px-10 py-5 font-bold rounded-2xl w-full active:scale-95 transition-all outline-none border-2
                  ${buttonWired ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed'}
                `}
               >
                 {buttonWired ? "Submit Order" : "No Listener Attached"}
                 {buttonWired && <MousePointerClick className="w-5 h-5 absolute top-1/2 -right-12 -translate-y-1/2 text-white animate-bounce" />}
               </button>
               {clicked && <p className="text-green-400 font-bold mt-6 absolute bottom-6 z-10">Order Submitted!</p>}
            </div>

          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <h2 className="text-3xl font-bold text-white mb-6">Action & Reaction</h2>
            <p className="text-zinc-300 mb-8 max-w-3xl leading-relaxed">
              An event listener 'listens' for interactions coming from the user (taps, swipes, long-presses) sent by the OS. When it detects the event it is assigned to, it triggers a block of code (the callback function).
            </p>

            <ModuleQuiz 
              question="What happens if a user taps a Button that does NOT have an OnClickListener attached to it?"
              options={[
                "The application will crash with a NullPointerException.",
                "The Android OS will automatically try to guess what the button should do.",
                "The button will visually register the press (if it has a default ripple effect), but no logic or code will execute.",
                "The button will hide itself from the screen."
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
