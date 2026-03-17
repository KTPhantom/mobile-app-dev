import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Code2, Play } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const CodePlayground = ({ 
  title, 
  description, 
  segments = [], 
  renderPhone,
  isLandscape = false,
  sequential = false // If true, must activate in order
}) => {
  const [activeSegments, setActiveSegments] = useState([]);

  const toggleSegment = (id) => {
    setActiveSegments((prev) => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };

  const isSegmentActive = (id) => activeSegments.includes(id);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full items-start justify-center">
      {/* Code / Actions Panel (Left) */}
      <div className="flex-1 w-full max-w-2xl flex flex-col gap-6">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Code2 className="text-purple-400" />
            {title}
          </h2>
          <p className="text-zinc-400">{description}</p>
        </div>

        <div className="flex flex-col gap-4">
          {segments.map((segment, index) => {
            const isActive = isSegmentActive(segment.id);
            const isLocked = sequential && !isActive && index > 0 && !isSegmentActive(segments[index-1].id);

            return (
              <motion.div 
                key={segment.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col border rounded-xl overflow-hidden transition-all duration-300
                  ${isActive ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-zinc-800'}
                  ${isLocked ? 'opacity-50 pointer-events-none grayscale' : ''}
                `}
              >
                {/* Segment Header / Button */}
                <button
                  onClick={() => toggleSegment(segment.id)}
                  disabled={isLocked}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors
                    ${isActive ? 'bg-cyan-950/20' : 'bg-zinc-900 hover:bg-zinc-800'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs
                      ${isActive ? 'bg-cyan-500 border-cyan-400 text-zinc-950' : 'border-zinc-700 text-zinc-400'}
                    `}>
                      {isActive ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className={`font-semibold ${isActive ? 'text-cyan-400' : 'text-zinc-200'}`}>
                      {segment.label}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-md ${isActive ? 'bg-cyan-900/50 text-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    <Play className="w-4 h-4" />
                  </div>
                </button>

                {/* Code Block (Animated reveal) */}
                <AnimatePresence>
                  {isActive && segment.code && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-zinc-950/50 border-t border-cyan-900/30"
                    >
                      <div className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto whitespace-pre">
                        <span className="text-zinc-500 select-none mr-4">{segment.language || 'java'}</span>
                        <code dangerouslySetInnerHTML={{ __html: segment.code }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Phone Mockup (Right) */}
      <div className="flex-[0.8] w-full flex justify-center sticky top-24">
        <PhoneMockup isLandscape={isLandscape}>
          {renderPhone(activeSegments)}
        </PhoneMockup>
      </div>
    </div>
  );
};

export default CodePlayground;
