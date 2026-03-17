import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ArrowRight, MousePointer2 } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module12({ onComplete }) {
  const [step, setStep] = useState(0);

  // Connection Game State
  const [selectedUi, setSelectedUi] = useState(null);
  const [connections, setConnections] = useState({});
  // ui -> listener mapping

  const handleUiClick = (uiId) => {
    setSelectedUi(uiId);
  };

  const handleListenerClick = (listenerId) => {
    if (selectedUi) {
      setConnections(prev => ({ ...prev, [selectedUi]: listenerId }));
      setSelectedUi(null); // reset selection
    }
  };

  const isComplete = connections['button'] === 'click' && 
                     connections['checkbox'] === 'change' && 
                     connections['list'] === 'itemclick';

  const resetGame = () => {
    setConnections({});
    setSelectedUi(null);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <div className="w-20 h-20 bg-purple-500/20 text-purple-500 rounded-3xl flex items-center justify-center mb-6">
              <Code2 className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Implementing Listeners</h2>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              Not all events are standard "Clicks". A Checkbox needs to know when its state changes. A List needs to know exactly which row was tapped. Let's map the correct listener interfaces to their UI components.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-colors flex items-center gap-2"
            >
              Start Wiring <ArrowRight className="w-5 h-5"/>
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto flex flex-col items-center">
            <h3 className="text-2xl font-bold text-white mb-2">Connect the Components</h3>
            <p className="text-zinc-400 mb-8">Click a UI Element on the left, then click the matching Listener Interface on the right.</p>

            <div className="flex w-full gap-8 justify-between relative mb-8">
              
              {/* Left Column (UI elements) */}
              <div className="flex-1 space-y-4">
                <h4 className="text-zinc-500 font-bold uppercase tracking-wider text-sm mb-4">UI Components</h4>
                
                {[
                  { id: 'button', name: 'Submit Button', color: 'bg-blue-500' },
                  { id: 'checkbox', name: 'Terms Checkbox', color: 'bg-green-500' },
                  { id: 'list', name: 'ListView Item', color: 'bg-orange-500' }
                ].map(ui => (
                  <button 
                    key={ui.id}
                    onClick={() => handleUiClick(ui.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all
                      ${selectedUi === ui.id ? `border-${ui.color.split('-')[1]}-500 bg-zinc-800` : 'border-zinc-800 bg-zinc-900'}
                      ${connections[ui.id] ? 'opacity-50 grayscale' : 'hover:bg-zinc-800 cursor-pointer'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-lg ${ui.color} flex items-center justify-center text-white`}>
                      <MousePointer2 className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium text-lg">{ui.name}</span>
                    {connections[ui.id] && <span className="ml-auto text-cyan-400 text-sm">Wired ✓</span>}
                  </button>
                ))}
              </div>

              {/* Status Graphic in middle */}
              <div className="flex flex-col justify-center px-4">
                 <div className="h-full w-px bg-zinc-800 relative">
                   {selectedUi && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-zinc-950 text-xs py-1 px-3 rounded-full font-bold animate-pulse whitespace-nowrap z-10">Select Target →</div>}
                 </div>
              </div>

              {/* Right Column (Listeners) */}
              <div className="flex-1 space-y-4">
                <h4 className="text-zinc-500 font-bold uppercase tracking-wider text-sm mb-4">Listener Interfaces</h4>
                
                {[
                  { id: 'change', name: 'OnCheckedChangeListener' },
                  { id: 'click', name: 'OnClickListener' },
                  { id: 'itemclick', name: 'OnItemClickListener' }
                ].map(listener => {
                  // Find if anything is connected to this listener
                  const connectedUiId = Object.keys(connections).find(key => connections[key] === listener.id);
                  
                  return (
                    <button 
                      key={listener.id}
                      onClick={() => handleListenerClick(listener.id)}
                      className={`w-full p-6 bg-zinc-950 border-2 rounded-xl text-left transition-all
                        ${selectedUi ? 'border-zinc-600 hover:border-cyan-500 cursor-pointer hover:bg-zinc-900' : 'border-zinc-800 cursor-default'}
                        ${connectedUiId ? 'border-green-500 bg-green-500/10' : ''}
                      `}
                    >
                      <span className={`font-mono text-sm ${connectedUiId ? 'text-green-400 font-bold' : 'text-zinc-400'}`}>{listener.name}</span>
                      {connectedUiId && <div className="text-xs text-green-500/60 mt-2">Connected to {connectedUiId}</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <button onClick={resetGame} className="px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">Reset</button>
              {Object.keys(connections).length === 3 && (
                isComplete ? (
                  <button onClick={() => setStep(2)} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl animate-pulse">Success! Continue</button>
                ) : (
                  <button onClick={resetGame} className="flex-1 py-3 bg-zinc-800 border-2 border-red-500 text-red-400 font-bold rounded-xl">Incorrect Mapping. Try Again</button>
                )
              )}
            </div>
            
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">The Power of Interfaces</h2>
            <p className="text-zinc-300 mb-8 max-w-3xl leading-relaxed">
              In Android SDK (Java/Kotlin), everything relies strongly on Interfaces. An Interface is a contract. When you attach an `OnClickListener` to a Button, you are passing an object that promises it contains an `onClick()` method that the Button can call when the OS detects a physical screen tap.
            </p>

            <ModuleQuiz 
              question="Why does a CheckBox use an 'OnCheckedChangeListener' instead of a standard 'OnClickListener'?"
              options={[
                "It doesn't. Checkboxes use OnClickListener.",
                "Because a standard click listener only fires when pressed, but a Checkbox state can be changed via code without a physical click, and we need to listen for the state change itself.",
                "Because OnCheckedChangeListener consumes less memory.",
                "Because CheckBoxes are considered 'Views' and Buttons are considered 'ViewGroups'."
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
