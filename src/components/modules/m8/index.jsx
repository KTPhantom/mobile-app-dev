import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCcw, Play, Square, Pause } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module8({ onComplete }) {
  const [step, setStep] = useState(0);
  const [appState, setAppState] = useState('destroyed'); // created, started, resumed, paused, stopped, destroyed

  // The lifecycle sequence that happens on specific actions
  const triggerAction = (action) => {
    switch(action) {
      case 'open':
        setAppState('resumed'); // Skips created/started visually for simplicity, lands on resumed
        break;
      case 'home_button':
        setAppState('stopped'); // Goes background
        break;
      case 'incoming_call':
        setAppState('paused'); // Partially obscured
        break;
      case 'return':
        setAppState('resumed'); // Comes back to foreground
        break;
      case 'swipe_away':
        setAppState('destroyed'); // Killed cleanly
        break;
      default: break;
    }
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-10">
            <h2 className="text-4xl font-black text-white mb-6">The Android Activity Lifecycle</h2>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
              Unlike a PC app that runs until you click 'X', a mobile app's screens (Activities) are constantly being started, paused, stopped, and destroyed by the Operating System as users switch contexts (e.g., getting a phone call).
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-colors"
            >
              Analyze Lifecycle States
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="flex w-full gap-8 mb-12">
              
              {/* Phone Simulator */}
              <div className="flex-1 flex justify-center">
                <div className="w-[280px] h-[580px] border-[12px] border-zinc-900 bg-black rounded-[40px] relative overflow-hidden shadow-2xl flex flex-col">
                  
                  {/* Status Bar */}
                  <div className="h-6 w-full bg-black flex justify-between px-4 items-center z-20">
                    <span className="text-[10px] text-white">9:41</span>
                    <span className="text-[10px] text-white">100%</span>
                  </div>

                  {/* Screen Content based on state */}
                  <div className="flex-1 relative bg-zinc-950">
                    <AnimatePresence>
                      
                      {appState === 'destroyed' && (
                         <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 flex flex-col items-center justify-center pt-20">
                            {/* Fake App Grid */}
                            <div className="grid grid-cols-4 gap-4 px-4 w-full">
                              <div className="w-10 h-10 bg-green-500 rounded-xl"/>
                              <div className="w-10 h-10 bg-blue-500 rounded-xl"/>
                              <div className="w-10 h-10 bg-red-500 rounded-xl"/>
                              <div className="w-10 h-10 bg-cyan-500 rounded-xl items-center justify-center flex cursor-pointer hover:scale-105" onClick={()=>triggerAction('open')}>
                                 <Play fill="white" className="w-4 h-4 text-white"/>
                              </div>
                            </div>
                            <p className="text-white mt-12 text-sm font-bold">Your app is dead. Tap to open.</p>
                         </motion.div>
                      )}

                      {(appState === 'resumed' || appState === 'paused' || appState === 'stopped') && (
                         <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="absolute inset-0 bg-cyan-950 p-6 flex flex-col border border-cyan-500/30">
                            <h3 className="text-cyan-400 font-bold text-xl mb-4">AwesomeApp™</h3>
                            <div className="flex-1 bg-cyan-900/20 rounded-xl p-4 flex items-center justify-center border border-cyan-800/50">
                              {appState === 'resumed' && <span className="text-white font-bold animate-pulse">Running smoothly in foreground! 🚀</span>}
                              {appState === 'paused' && <span className="text-yellow-400 font-bold">Paused (Partially obscured) ⏸️</span>}
                              {appState === 'stopped' && <span className="text-zinc-500 font-bold">App is frozen in background. 🧊</span>}
                            </div>
                         </motion.div>
                      )}

                      {/* Overlays */}
                      {appState === 'paused' && (
                        <div className="absolute top-10 inset-x-2 h-24 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex items-center p-4 z-30">
                          <img src="https://i.pravatar.cc/100" className="w-12 h-12 rounded-full mr-4"/>
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">Mom</h4>
                            <p className="text-zinc-400 text-xs">Incoming Call...</p>
                          </div>
                          <button onClick={()=>triggerAction('return')} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"><PhoneDown /></button>
                        </div>
                      )}

                      {appState === 'stopped' && (
                         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center">
                            <p className="text-white font-bold">User went to Home Screen.</p>
                         </div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Action Controls & State Display */}
              <div className="flex-1 flex flex-col justify-center">
                
                <h3 className="text-2xl font-bold text-white mb-6">Current State: <span className="text-cyan-400">{appState.toUpperCase()}</span></h3>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
                  <h4 className="text-white font-bold mb-4 border-b border-zinc-800 pb-2">Trigger OS Events</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <button onClick={()=>triggerAction('open')} disabled={appState==='resumed'} className={`p-3 rounded-xl border font-medium text-left transition-colors ${appState==='resumed'?'bg-zinc-950 border-zinc-800 text-zinc-600':'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'}`}>🚀 Open Application</button>
                    <button onClick={()=>triggerAction('home_button')} disabled={appState==='destroyed'||appState==='stopped'} className={`p-3 rounded-xl border font-medium text-left transition-colors ${appState==='destroyed'||appState==='stopped'?'bg-zinc-950 border-zinc-800 text-zinc-600':'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'}`}>🏠 Press Home Button (Background)</button>
                    <button onClick={()=>triggerAction('incoming_call')} disabled={appState!=='resumed'} className={`p-3 rounded-xl border font-medium text-left transition-colors ${appState!=='resumed'?'bg-zinc-950 border-zinc-800 text-zinc-600':'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'}`}>📞 Receive Phone Call</button>
                    <button onClick={()=>triggerAction('return')} disabled={appState==='resumed'||appState==='destroyed'} className={`p-3 rounded-xl border font-medium text-left transition-colors ${appState==='resumed'||appState==='destroyed'?'bg-zinc-950 border-zinc-800 text-zinc-600':'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'}`}>↩️ Return to App (Foreground)</button>
                    <button onClick={()=>triggerAction('swipe_away')} disabled={appState==='destroyed'} className={`p-3 rounded-xl border font-medium text-left transition-colors ${appState==='destroyed'?'bg-zinc-950 border-zinc-800 text-zinc-600':'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white'}`}>❌ Swipe Away in Recents (Kill)</button>
                  </div>
                </div>

                <div className="text-zinc-400 text-sm">
                  {appState === 'resumed' && "onStart() → onResume(): App is visible and takes input."}
                  {appState === 'paused' && "onPause(): App is visible but obscured (like a popup dialog). Save UI state!"}
                  {appState === 'stopped' && "onStop(): App is completely hidden. Stop animations to save battery!"}
                  {appState === 'destroyed' && "onDestroy(): Memory is released. Next open starts fresh."}
                </div>

              </div>
            </div>

            <button onClick={() => setStep(2)} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors self-end">
              Take the Quiz
            </button>
          </motion.div>
        );

       case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Mastering States prevents crashes</h2>
            
            <ModuleQuiz 
              question="When your app goes to the background (e.g., the user presses the 'Home' button), which lifecycle method gives you the opportunity to save the user's data before the OS potentially kills the process?"
              options={[
                "onStart()",
                "onResume()",
                "onStop() / onPause()",
                "onCreate()"
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

const PhoneDown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><path d="m22 2-8 8"/><path d="M14 2h8v8"/></svg>;
