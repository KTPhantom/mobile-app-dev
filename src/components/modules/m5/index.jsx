import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, ShieldCheck, FileKey, XCircle, FileWarning, ArrowRight } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

export default function Module5({ onComplete }) {
  const [step, setStep] = useState(0);
  const [signed, setSigned] = useState(false);
  const [format, setFormat] = useState(null); // 'apk' or 'aab'
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, error, success

  const simulateUpload = () => {
    if (!signed) {
      setUploadStatus('error_unsigned');
      return;
    }
    if (format === 'apk') {
      setUploadStatus('error_apk');
      return;
    }
    setUploadStatus('success');
    setTimeout(() => setStep(2), 2000);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <h2 className="text-4xl font-black text-white mb-6 flex justify-center"><PlayCircle className="w-16 h-16 text-cyan-400" /></h2>
            <h3 className="text-2xl font-bold text-white mb-4">Mission: Launch Your App</h3>
            <p className="text-xl text-zinc-400 max-w-lg mx-auto mb-10">
              Your source code is finished. But you cannot just upload Java files to the Google Play Store. You need to package it, sign it cryptographically, and upload it correctly.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all"
            >
              Start Deployment Sequence
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Google Play Console Simulator</h3>

            <div className="mb-8">
              <h4 className="text-white font-medium mb-3">1. Build Format</h4>
              <div className="flex gap-4">
                <button 
                  onClick={() => setFormat('apk')}
                  className={`flex-1 p-4 rounded-xl border flex items-center justify-between ${format === 'apk' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
                >
                  Legacy APK (Single File) {format === 'apk' && '✓'}
                </button>
                <button 
                  onClick={() => setFormat('aab')}
                  className={`flex-1 p-4 rounded-xl border flex items-center justify-between ${format === 'aab' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
                >
                  AAB (Android App Bundle) {format === 'aab' && '✓'}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-white font-medium mb-3">2. Cryptographic Signature</h4>
              <button 
                onClick={() => setSigned(!signed)}
                className={`w-full p-4 rounded-xl border flex items-center justify-center gap-3 transition-colors
                  ${signed ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600'}
                `}
              >
                {signed ? <ShieldCheck className="w-5 h-5"/> : <FileKey className="w-5 h-5"/>}
                {signed ? 'App Cryptographically Signed (Keystore Attached)' : 'Attach Keystore & Sign App'}
              </button>
              {signed && <p className="text-xs text-green-500/80 mt-2 text-center">Caution: Never lose this keystore file, or you can never update your app again.</p>}
            </div>

            <button 
              onClick={simulateUpload}
              disabled={uploadStatus === 'success'}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Upload to Production Track <ArrowRight className="w-4 h-4"/>
            </button>

            {/* Error States */}
            {uploadStatus === 'error_unsigned' && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                Error: You cannot upload an unsigned application. Google Play must verify the author's identity cryptographically.
              </div>
            )}
            {uploadStatus === 'error_apk' && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl flex items-center gap-3 text-yellow-400 text-sm">
                <FileWarning className="w-5 h-5 shrink-0" />
                Error: New applications must be published using the Android App Bundle (AAB) format, which allows Google Play to generate optimized APKs per device profile.
              </div>
            )}
            {uploadStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center justify-center gap-2 text-green-400 font-bold">
                <ShieldCheck className="w-5 h-5" /> Upload Successful! Publishing...
              </div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Deployment Successful</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="text-white font-bold mb-2">Why AAB over APK?</h4>
                <p className="text-zinc-400 text-sm">
                  An APK forces every user to download assets they don't need (e.g., HD textures on a low-res screen, French strings for an English user). 
                  An AAB (Android App Bundle) defers generation to Google Play, which extracts the AAB and generates a highly optimized, smaller APK specific to the downloader's device.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="text-white font-bold mb-2">Why Sign Apps?</h4>
                <p className="text-zinc-400 text-sm">
                  If someone downloads your App, modifies the code to steal passwords, and redistributes it, how does a user know it's fake? 
                  The OS checks the cryptographic signature. Only you possess the private keystore capable of generating that signature.
                </p>
              </div>
            </div>

            <ModuleQuiz 
              question="What is the primary benefit of uploading an AAB (Android App Bundle) to the Google Play Store instead of a traditional APK?"
              options={[
                "AABs do not require cryptographic signing.",
                "AABs allow Google Play to generate smaller, optimized APKs tailored to the specific device downloading the app.",
                "AABs automatically translate your Java code to iOS Swift code.",
                "AABs bypass the Google Play Store review process."
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
