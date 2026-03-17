import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Settings, ShoppingBag, Menu, ArrowRight } from 'lucide-react';
import ModuleQuiz from '../ModuleQuiz';

// Drag & Drop simulation fallback for simple click-to-assign
export default function Module3({ onComplete }) {
  const [step, setStep] = useState(0);

  // App restructuring state
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([
    { id: 1, label: 'Feed', icon: Home, assigned: false },
    { id: 2, label: 'Search', icon: Search, assigned: false },
    { id: 3, label: 'Cart', icon: ShoppingBag, assigned: false },
    { id: 4, label: 'Profile', icon: User, assigned: false },
  ]);
  const [navSlots, setNavSlots] = useState([null, null, null, null]);

  const assignItemToSlot = (itemIndex, slotIndex) => {
    if (navSlots[slotIndex]) return; // slot full
    
    setItems(prev => prev.map((item, i) => i === itemIndex ? { ...item, assigned: true } : item));
    setNavSlots(prev => prev.map((slot, i) => i === slotIndex ? items[itemIndex] : slot));
  };

  const resetNavigation = () => {
    setItems(prev => prev.map(item => ({...item, assigned: false})));
    setNavSlots([null, null, null, null]);
  };

  const isNavComplete = navSlots.every(slot => slot !== null);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <h2 className="text-4xl font-black text-white mb-6">The E-Commerce disaster.</h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-xl mx-auto mb-8">
              <p className="text-red-400 font-medium text-lg text-left">
                "Users are uninstalling our app. They say they can't find their shopping carts or figure out how to search for products because everything is hidden inside a complicated side menu!"
              </p>
            </div>
            <p className="text-zinc-400 max-w-xl mx-auto mb-10">
              You've been hired as the Lead UX Designer to fix their Mobile Information Architecture. Your job is to bring the most critical features directly to the user's thumb.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Start Restructuring
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Rebuild the Bottom Navigation</h2>
            <p className="text-zinc-400 text-center mb-8">
              Move the core features out of the hidden 'Hamburger' menu and onto a persistent Tab Bar. Click a feature, then click an empty slot below to assign it.
            </p>

            {/* Unassigned Items */}
            <div className="flex gap-4 mb-12">
              {items.map((item, i) => (
                <button 
                  key={item.id}
                  disabled={item.assigned}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                    ${item.assigned ? 'opacity-30 border-zinc-800 bg-zinc-950/50' : 'bg-zinc-900 border-cyan-500/50 hover:bg-cyan-900/20 text-white cursor-pointer'}
                  `}
                >
                  <item.icon className={`w-6 h-6 ${item.assigned ? 'text-zinc-600' : 'text-cyan-400'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* The Phone Outline / Bottom Nav */}
            <div className="w-[320px] h-[400px] border-[8px] border-zinc-800 bg-zinc-950 rounded-[40px] flex flex-col justify-between relative shadow-2xl">
              <div className="p-6 opacity-30 pointer-events-none">
                <div className="w-1/2 h-4 bg-zinc-800 rounded-full mb-4" />
                <div className="w-full h-32 bg-zinc-800 rounded-xl mb-4" />
                <div className="w-3/4 h-32 bg-zinc-800 rounded-xl" />
              </div>
              
              {/* Bottom Nav Slots */}
              <div className="h-20 bg-zinc-900 border-t border-zinc-800 rounded-b-[32px] flex justify-between items-center px-6">
                {navSlots.map((slot, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                       // Find first unassigned item and put it here
                       const firstUnassigned = items.findIndex(item => !item.assigned);
                       if (firstUnassigned !== -1 && !slot) {
                         assignItemToSlot(firstUnassigned, i);
                       }
                    }}
                    className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${!slot ? 'border-dashed border-zinc-700 hover:border-cyan-500 text-zinc-700 cursor-pointer' : 'border-transparent text-cyan-400 bg-cyan-500/10'}`}
                  >
                    {slot ? <slot.icon className="w-6 h-6" /> : '+'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4 w-full max-w-[320px]">
              <button onClick={resetNavigation} className="flex-1 py-3 border border-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors">Reset</button>
              {isNavComplete && (
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-colors animate-pulse">
                  Submit Design
                </button>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-white mb-6">Excellent Redesign</h2>
            <p className="text-zinc-300 mb-8 leading-relaxed">
              By exposing the core navigation on a persistent Bottom Tab Bar, users no longer have to hunt for the search bar or their shopping cart. 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <Menu className="w-6 h-6 text-red-400" />
                  <h4 className="text-white font-bold">Hamburger Menus</h4>
                </div>
                <p className="text-sm text-zinc-400">Great for secondary options (Settings, Terms of Service, Help), but terrible for primary navigation because they hide options off-screen ("Out of sight, out of mind").</p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-green-400" />
                  <h4 className="text-white font-bold">Bottom Tab Bars</h4>
                </div>
                <p className="text-sm text-zinc-400">Ideal for 3-5 top-level destinations. They are immediately visible and fall perfectly within the comfortable "Thumb Zone" at the bottom of the device.</p>
              </div>
            </div>

            <ModuleQuiz 
              question="Why did major apps like Facebook and Spotify transition away from Hamburgers (Side Drawers) and towards Bottom Navigation Tabs?"
              options={[
                "Because Google required them to do so.",
                "Because Bottom Tabs hide the navigation, freeing up screen real estate for content.",
                "Because Bottom Tabs expose primary destinations instantly and place them within comfortable reach of the user's thumb.",
                "Because Hamburger menus use more battery power to animate."
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
