import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module7({ onComplete }) {
  const [step, setStep] = useState(0);
  
  // Game State
  const [battery, setBattery] = useState(100);
  const [memory, setMemory] = useState(0);
  const [features, setFeatures] = useState({
    gps: false,
    bgSync: false,
    animations: false
  });
  const [gameState, setGameState] = useState('playing'); // playing, crashed_battery, crashed_memory, won

  // Gameloop simulation
  useEffect(() => {
    if (step !== 1 || gameState !== 'playing') return;

    const interval = setInterval(() => {
      let drain = 1;
      let memLoad = 5;

      if (features.gps) drain += 8;
      if (features.bgSync) drain += 5;
      if (features.animations) memLoad += 20;

      setBattery(b => {
        const next = Math.max(0, b - drain);
        if (next <= 0) setGameState('crashed_battery');
        return next;
      });

      setMemory(m => {
        const next = Math.min(100, m + memLoad);
        if (next >= 100) setGameState('crashed_memory');
        return next;
      });
      
    }, 1000);

    return () => clearInterval(interval);
  }, [step, features, gameState]);

  const resetGame = () => {
    setBattery(100);
    setMemory(0);
    setGameState('playing');
  };

  const winGame = () => setGameState('won');

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
             <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Device Constraints</h2>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              Unlike desktop computers running plugged into a wall with 32GB of RAM, phones run on batteries with strict OS limitations. If your app hogs memory (OOM) or drains the battery, the OS will aggressively terminate it.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-colors"
            >
              Start Constraint Simulator
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="flex w-full gap-8 mb-8">
              {/* Device Status */}
              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-6">Device Telemetry</h3>
                
                {/* Battery Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400 font-bold flex items-center gap-2"><Battery className="w-4 h-4"/> Battery</span>
                    <span className={battery < 20 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{Math.floor(battery)}%</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      className={`h-full ${battery < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                      animate={{ width: `${battery}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Memory Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400 font-bold flex items-center gap-2"><Zap className="w-4 h-4"/> RAM Usage</span>
                    <span className={memory > 80 ? 'text-red-400 font-bold' : 'text-yellow-400 font-bold'}>{Math.floor(memory)}%</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      className={`h-full ${memory > 80 ? 'bg-red-500' : 'bg-yellow-500'}`}
                      animate={{ width: `${memory}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Game Over Overlays */}
                <AnimatePresence>
                  {gameState === 'crashed_battery' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm z-10">
                      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                      <h4 className="text-white font-bold text-xl mb-2">Battery Exhausted</h4>
                      <p className="text-red-200 text-sm mb-4">You drained the device battery too quickly.</p>
                      <button onClick={resetGame} className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-sm">Restart Simulation</button>
                    </motion.div>
                  )}
                  {gameState === 'crashed_memory' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm z-10">
                      <Zap className="w-12 h-12 text-red-500 mb-4" />
                      <h4 className="text-white font-bold text-xl mb-2">Out of Memory (OOM)</h4>
                      <p className="text-red-200 text-sm mb-4">The Android OS aggressively terminated your app to save RAM.</p>
                      <button onClick={resetGame} className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-sm">Restart Simulation</button>
                    </motion.div>
                  )}
                  {gameState === 'won' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-0 bg-green-950/90 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm z-10">
                      <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
                      <h4 className="text-white font-bold text-xl mb-2">Stable Environment Maintained!</h4>
                      <p className="text-green-200 text-sm mb-4">You successfully balanced features with device constraints.</p>
                      <button onClick={() => setStep(2)} className="px-6 py-3 bg-green-600 rounded-lg text-white font-bold">Continue</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* App Features Controls */}
              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-2">App Configuration</h3>
                <p className="text-sm text-zinc-500 mb-6">Toggle features to balance performance. Survive for 15 seconds to pass.</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div>
                      <div className="text-white font-medium">Fine GPS Tracking</div>
                      <div className="text-xs text-red-400">Massive Battery Drain</div>
                    </div>
                    <button 
                      onClick={() => setFeatures({...features, gps: !features.gps})}
                      className={`w-14 h-8 rounded-full transition-colors relative ${features.gps ? 'bg-cyan-500' : 'bg-zinc-700'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${features.gps ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div>
                      <div className="text-white font-medium">Continuous BG Sync</div>
                      <div className="text-xs text-red-400">High Battery Drain</div>
                    </div>
                    <button 
                      onClick={() => setFeatures({...features, bgSync: !features.bgSync})}
                      className={`w-14 h-8 rounded-full transition-colors relative ${features.bgSync ? 'bg-cyan-500' : 'bg-zinc-700'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${features.bgSync ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div>
                      <div className="text-white font-medium">60FPS HD Animations</div>
                      <div className="text-xs text-yellow-400">Extreme RAM Usage</div>
                    </div>
                    <button 
                      onClick={() => setFeatures({...features, animations: !features.animations})}
                      className={`w-14 h-8 rounded-full transition-colors relative ${features.animations ? 'bg-cyan-500' : 'bg-zinc-700'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${features.animations ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {gameState === 'playing' && (
              <button onClick={winGame} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors">
                I'm Stable. Lock Configuration!
              </button>
            )}
          </motion.div>
        );

      case 2:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Respect the Constraints</h2>
            
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-12">
              <p className="text-zinc-300 mb-6 leading-relaxed">
                Mobile development brings a hostile physical environment. If your app attempts to run a tight game loop on the main thread while requesting precise GPS coordinates every half-second while the user is disconnected from Wi-Fi, the device will heat up dramatically, the OS will throttle your application, and battery life will drop visibly every minute.
              </p>
              <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-400 font-medium">The OS is ruthless. It will silently kill your Application's background processes if it needs memory for the foreground app (like a Phone Call coming in).</p>
              </div>
            </div>

            <ModuleQuiz 
              question="What will the Android Operating System do if your application begins consuming too much memory (RAM) while running in the background?"
              options={[
                "It will pause the foreground application to give your background app more resources.",
                "It will aggressively and silently terminate (kill) your application to reclaim memory for the system.",
                "It will automatically clear the user's photos to make more storage space.",
                "It will prompt the user to download more RAM from the Play Store."
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
