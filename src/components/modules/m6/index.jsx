import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Network, Server, Cpu, Pointer } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module6({ onComplete }) {
  const [step, setStep] = useState(0);
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    { id: 4, name: "System Apps (UI)", icon: Pointer, color: "bg-pink-500", desc: "The apps you see and interact with (Home Screen, Dialer, SMS, Your Custom App). Written in Java/Kotlin." },
    { id: 3, name: "Application Framework", icon: Layers, color: "bg-purple-500", desc: "The Java API framework providing high-level services like ActivityManager and NotificationManager to apps." },
    { id: 2, name: "Android Runtime (ART) & HAL", icon: Server, color: "bg-blue-500", desc: "ART executes the app's bytecode. The Hardware Abstraction Layer (HAL) provides standard interfaces to hardware so Java code doesn't need to know device specifics." },
    { id: 1, name: "Linux Kernel", icon: Cpu, color: "bg-cyan-500", desc: "The lowest foundational level. Handles memory management, power management, and literal hardware device drivers (Camera driver, Bluetooth driver)." }
  ];

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-8 items-center py-6">
            <div className="flex-1">
              <h2 className="text-4xl font-black text-white mb-4">Hardware to Software</h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                When a user presses a physical volume button, how does your Spotify app know to turn the music up? The electrical signal must travel up through multiple layers of system architecture.
              </p>
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors"
              >
                Inspect Android Architecture
              </button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive OS Stack</h2>
            
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
              
              {/* Stack Visualizer */}
              <div className="flex-1 flex flex-col justify-end gap-3 h-[400px]">
                <div className="text-center text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2"><Pointer className="inline w-4 h-4 mr-2"/> User Interaction</div>
                {layers.map(layer => (
                  <button
                    key={layer.id}
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    className={`relative w-full h-16 rounded-xl flex items-center justify-center font-bold transition-all
                      ${activeLayer === layer.id ? `${layer.color} text-white scale-105 z-10 shadow-lg` : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:bg-zinc-800'}
                    `}
                  >
                    {layer.name}
                  </button>
                ))}
                <div className="text-center text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2"><Cpu className="inline w-4 h-4 mr-2"/> Physical Hardware</div>
              </div>

              {/* Info Panel */}
              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 min-h-[400px] flex flex-col">
                {activeLayer ? (
                  <motion.div 
                    key={activeLayer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white ${layers.find(l=>l.id===activeLayer).color}`}>
                      {React.createElement(layers.find(l=>l.id===activeLayer).icon, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{layers.find(l=>l.id===activeLayer).name}</h3>
                    <p className="text-zinc-300 leading-relaxed text-lg">
                      {layers.find(l=>l.id===activeLayer).desc}
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-center">
                    <Layers className="w-12 h-12 mb-4 opacity-50" />
                    <p>Hover over or tap a layer in the stack on the left to inspect its responsibility.</p>
                  </div>
                )}

                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Test Your OS Knowledge
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Connecting the Dots</h2>
            <p className="text-zinc-300 mb-8 max-w-3xl">
              Because Android is built on top of the Linux Kernel, it benefits from decades of robust security, memory management, and process isolation. The HAL (Hardware Abstraction Layer) is the crucial middle-man that allows a single operating system to run smoothly on thousands of completely different hardware configurations.
            </p>

            <ModuleQuiz 
              question="You are writing a Java app and call 'camera.takePicture()'. Which layered component is responsible for abstracting the actual device-specific camera hardware driver so your generic Java command works across all phones?"
              options={[
                "The Linux Kernel",
                "The Hardware Abstraction Layer (HAL)",
                "The System UI App",
                "The View hierarchy"
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
