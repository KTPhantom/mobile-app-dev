import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Image, Type, Square, MessageSquare, CheckCircle2 } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module9({ onComplete }) {
  const [step, setStep] = useState(0);

  // Layout Builder State
  const [layout, setLayout] = useState([]);
  
  const addComponent = (type) => {
    if (layout.length >= 4) return;
    setLayout([...layout, type]);
  };

  const resetLayout = () => setLayout([]);

  // Win condition: Image -> Text -> Input -> Button
  const isLayoutCorrect = layout.length === 4 && 
    layout[0] === 'image' && 
    layout[1] === 'text' && 
    layout[2] === 'input' && 
    layout[3] === 'button';

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <div className="w-20 h-20 bg-blue-500/20 text-blue-500 rounded-3xl flex items-center justify-center mb-6">
              <LayoutTemplate className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6 text-center">Activities and Views</h2>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              An <strong>Activity</strong> is the full screen you are looking at. A <strong>View</strong> is an individual component on that screen (like a button or text). Your goal is to construct a Login Layout using the available Views.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors"
            >
              Open Layout Builder
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              
              {/* Toolbox */}
              <div className="w-64 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Views Toolbox</h3>
                <p className="text-zinc-500 text-sm mb-6">Click components in the required order to build the Login screen.</p>
                
                <h4 className="text-xs font-bold text-zinc-600 uppercase mb-2 text-center">Required Order</h4>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-400 mb-6 text-center">
                  Logo Image <br/>Welcome Text<br/>Username Input<br/>Submit Button
                </div>

                <div className="space-y-3">
                  <button onClick={()=>addComponent('text')} className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl flex items-center gap-3 transition-colors">
                    <Type className="w-5 h-5"/> TextView
                  </button>
                  <button onClick={()=>addComponent('image')} className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl flex items-center gap-3 transition-colors">
                    <Image className="w-5 h-5"/> ImageView
                  </button>
                  <button onClick={()=>addComponent('input')} className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl flex items-center gap-3 transition-colors">
                    <MessageSquare className="w-5 h-5"/> EditText
                  </button>
                  <button onClick={()=>addComponent('button')} className="w-full p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl flex items-center gap-3 transition-colors">
                    <Square className="w-5 h-5"/> Button
                  </button>
                </div>

                <button onClick={resetLayout} className="w-full mt-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-bold transition-colors">Clear Layout</button>
              </div>

              {/* Layout Preview (The Phone) */}
              <div className="w-[300px] h-[600px] border-[8px] border-zinc-800 bg-white rounded-[40px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl p-6 relative">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-full"/>

                 {!layout.length && <div className="text-zinc-400 font-bold border-2 border-dashed border-zinc-300 p-8 rounded-2xl text-center">Empty LinearLayout (Vertical)</div>}

                 <div className="w-full flex flex-col gap-4 items-center w-full">
                    {layout.map((type, i) => (
                      <motion.div key={i} initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="w-full">
                        {type === 'image' && <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto flex items-center justify-center"><Image className="w-8 h-8 text-zinc-400"/></div>}
                        {type === 'text' && <div className="text-2xl font-bold text-zinc-800 text-center">Welcome Back</div>}
                        {type === 'input' && <div className="w-full py-3 px-4 bg-zinc-100 border border-zinc-300 rounded-xl text-zinc-400">Username...</div>}
                        {type === 'button' && <div className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-center">Login</div>}
                      </motion.div>
                    ))}
                 </div>

                 {layout.length === 4 && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-6 text-center">
                      {isLayoutCorrect ? (
                        <>
                          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                          <h3 className="text-white font-bold text-xl mb-4">View Hierarchy Constructed!</h3>
                          <button onClick={()=>setStep(2)} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500">Continue</button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-red-400 font-bold text-xl mb-4">Order Incorrect</h3>
                          <p className="text-zinc-300 text-sm mb-6">You didn't follow the design spec order.</p>
                          <button onClick={resetLayout} className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700">Try Again</button>
                        </>
                      )}
                    </div>
                 )}
              </div>

            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Views and ViewGroups</h2>
            <p className="text-zinc-300 mb-8 max-w-3xl leading-relaxed">
              You just used a <strong>ViewGroup</strong> (a LinearLayout that stacks items vertically) to hold multiple <strong>Views</strong> (Images, Texts, Buttons). The ViewGroup acts as an invisible container, while the Views are the actual UI elements the user interacts with. Creating an Android UI is just nesting Views inside ViewGroups!
            </p>

            <ModuleQuiz 
              question="In Android development, what is the primary difference between a View and a ViewGroup?"
              options={[
                "A View is for iOS, a ViewGroup is for Android.",
                "A View is a simple UI element (like a button) that is drawn on screen, whereas a ViewGroup is an invisible container that holds and positions other Views.",
                "There is no difference.",
                "A View is written in Java, and a ViewGroup is written in XML."
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
    <div className="min-h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
