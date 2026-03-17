import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, FileCode2, Play, CheckCircle2 } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module14({ onComplete }) {
  const [step, setStep] = useState(0);

  // Editor State
  const [xmlCode, setXmlCode] = useState('');
  const [javaCode, setJavaCode] = useState('');
  const [output, setOutput] = useState('');
  const [compiled, setCompiled] = useState(false);

  // Target goals
  const targetXml = '<Button android:id="@+id/myBtn" android:text="Click Me" />';
  const targetJava = 'Button btn = findViewById(R.id.myBtn);\nbtn.setOnClickListener(v -> toast("Hello!"));';

  const checkBuild = () => {
    // Basic fuzzy matching for educational purposes
    const hasXmlBtn = xmlCode.includes('<Button') && xmlCode.includes('android:id="@+id/myBtn"');
    const hasJavaLink = javaCode.includes('findViewById(R.id.myBtn)');
    const hasListener = javaCode.includes('setOnClickListener') && javaCode.includes('toast');

    if (!hasXmlBtn) {
      setOutput('Error: XML does not contain a Button with android:id="@+id/myBtn"');
      setCompiled(false);
      return;
    }
    if (!hasJavaLink) {
      setOutput('Error: Java code did not `findViewById(R.id.myBtn)` to link the XML properly.');
      setCompiled(false);
      return;
    }
    if (!hasListener) {
      setOutput('Error: Java code did not attach an OnClickListener or invoke a toast.');
      setCompiled(false);
      return;
    }

    setOutput('BUILD SUCCESSFUL! The Layout and Logic are wired together.');
    setCompiled(true);
  };

  const loadSolution = () => {
    setXmlCode(targetXml);
    setJavaCode(targetJava);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10">
            <h2 className="text-4xl font-black text-white mb-6">The Grand Finale</h2>
            <div className="flex gap-4 mb-8">
              <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center">
                <FileCode2 className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8" />
              </div>
            </div>
            <p className="text-xl text-zinc-400 max-w-2xl text-center leading-relaxed mb-10">
              In Android, UI structure is written in <strong>XML</strong> files, while application logic is written in <strong>Java/Kotlin</strong> files. Your final task is to write both pieces and successfully link them together.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full transition-colors flex items-center gap-2"
            >
              Enter IDE Sandbox
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Split-Pane Editor</h3>
            <p className="text-zinc-400 mb-6">Create a button in XML, then link it and add a click listener in Java.</p>

            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              
              {/* XML Editor */}
              <div className="flex-1 bg-[#1e1e1e] border border-zinc-700 rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#2d2d2d] border-b border-zinc-700 px-4 py-2 flex items-center gap-2 border-t-2 border-t-orange-500">
                  <FileCode2 className="w-4 h-4 text-orange-400" />
                  <span className="text-zinc-300 text-sm font-mono">activity_main.xml (Layout)</span>
                </div>
                <textarea 
                  value={xmlCode}
                  onChange={(e) => setXmlCode(e.target.value)}
                  placeholder={'<!-- Add your Button here -->\n<Button android:id="@+id/myBtn" android:text="Click Me" />'}
                  className="w-full h-48 bg-transparent text-zinc-300 font-mono text-sm p-4 resize-none outline-none focus:ring-1 ring-inset ring-orange-500/50"
                  spellCheck="false"
                />
              </div>

              {/* Java Editor */}
              <div className="flex-1 bg-[#1e1e1e] border border-zinc-700 rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-[#2d2d2d] border-b border-zinc-700 px-4 py-2 flex items-center gap-2 border-t-2 border-t-blue-500">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-zinc-300 text-sm font-mono">MainActivity.java (Logic)</span>
                </div>
                <textarea 
                  value={javaCode}
                  onChange={(e) => setJavaCode(e.target.value)}
                  placeholder={'// Find button and set listener\nButton btn = findViewById(R.id.myBtn);\nbtn.setOnClickListener(v -> toast("Hello!"));'}
                  className="w-full h-48 bg-transparent text-zinc-300 font-mono text-sm p-4 resize-none outline-none focus:ring-1 ring-inset ring-blue-500/50"
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Build Bar */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between mb-8">
              <div className="flex gap-4">
                <button onClick={loadSolution} className="text-zinc-500 hover:text-zinc-300 text-sm underline px-2 transition-colors">Load Solution</button>
              </div>
              <button 
                onClick={checkBuild}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-green-900/20"
              >
                <Play className="w-4 h-4 fill-white" /> Compile & Run
              </button>
            </div>

            {/* Console Output */}
            {output && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl border font-mono text-sm
                ${compiled ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}
              `}>
                {compiled && <CheckCircle2 className="inline w-4 h-4 mr-2 mb-1" />}
                {output}
              </motion.div>
            )}

            {compiled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-end">
                <button onClick={() => setStep(2)} className="px-8 py-3 bg-white text-zinc-950 hover:bg-zinc-200 font-bold rounded-xl transition-colors">Complete Curriculum</button>
              </motion.div>
            )}

          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Separation of Concerns</h2>
            <p className="text-zinc-300 mb-8 max-w-3xl leading-relaxed">
              By keeping the visual layout (XML) strictly separated from the programmatic logic (Java/Kotlin), engineers and designers can work on the same screen simultaneously without breaking each other's code. This is the foundation of modern App Architecture.
            </p>

            <ModuleQuiz 
              question="What is the primary method used in Android (Java/Kotlin) to link an XML UI element to a variable in your code so you can interact with it?"
              options={[
                "document.getElementById()",
                "findViewById()",
                "getXmlComponent()",
                "UI.bind()"
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
