import { motion } from 'framer-motion';
import { Wifi, Signal, Battery, Fingerprint } from 'lucide-react';
import { useState, useEffect } from 'react';

const PhoneMockup = ({ children, isLandscape = false }) => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    // Simulate iOS native time styling
    const updateTime = () => {
      const date = new Date();
      setTime(`${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      layout
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`relative mx-auto border-zinc-800 bg-zinc-950 border-[8px] rounded-[3rem] shadow-2xl flex-shrink-0
        ${isLandscape ? 'w-[600px] h-[300px]' : 'w-[320px] h-[650px]'}
      `}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Notch */}
      <div 
        className={`absolute bg-zinc-800 z-50 rounded-b-3xl flex justify-center items-end pb-1
          ${isLandscape ? 'left-0 top-1/2 -translate-y-1/2 w-[30px] h-[100px] rounded-r-3xl rounded-bl-none left-notch' : 'top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] top-notch'}
        `}
      >
        <div className="w-[40px] h-[4px] rounded bg-zinc-950 mb-3" /> {/* Speaker */}
        <div className="w-[8px] h-[8px] rounded-full bg-indigo-900 absolute right-6 top-[10px] flex items-center justify-center">
          <div className="w-[3px] h-[3px] rounded-full bg-cyan-400/50" /> {/* Camera */}
        </div>
      </div>

      {/* Screen Container */}
      <div className={`relative w-full h-full bg-white dark:bg-[#121212] rounded-[2.2rem] overflow-hidden flex flex-col`}>
        
        {/* Status Bar */}
        <div className={`absolute top-0 w-full z-40 px-6 py-2 flex justify-between items-center text-[11px] font-semibold transition-colors duration-300 text-zinc-400`}>
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-[18px] h-[18px]" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full h-full pt-8 pb-8 flex flex-col relative z-10 overflow-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-zinc-600/50 rounded-full z-40" />
      </div>

      {/* Physical Buttons (Volume/Power) */}
      <div className="absolute -left-[10px] top-[120px] w-[2px] h-[40px] bg-zinc-700 rounded-l-md" /> {/* Vol Up */}
      <div className="absolute -left-[10px] top-[170px] w-[2px] h-[40px] bg-zinc-700 rounded-l-md" /> {/* Vol Down */}
      <div className="absolute -right-[10px] top-[140px] w-[2px] h-[60px] bg-zinc-700 rounded-r-md" /> {/* Power */}
    </motion.div>
  );
};

export default PhoneMockup;
