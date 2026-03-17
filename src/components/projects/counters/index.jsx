import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, RotateCcw, Box } from 'lucide-react';
import CodePlayground from '../../interactive/CodePlayground';

export default function CountersProject() {
  const [count, setCount] = useState(0);

  const segments = [
    {
      id: "state_def",
      label: "1. BUILD: State Architecture (Java)",
      language: "java",
      code: `public class CounterActivity extends Activity {
    // STATE: The single source of truth
    private int itemCount = 0;
    
    // UI References
    private TextView tvCount;
    private Button btnPlus, btnMinus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // ... find views ...
    }
}`
    },
    {
      id: "logic_inc",
      label: "2. TEST: Increment Logic (Java)",
      language: "java",
      code: `btnPlus.setOnClickListener(v -> {
    // 1. Mutate State
    itemCount++;
    
    // 2. Update UI to reflect new State
    tvCount.setText(String.valueOf(itemCount));
});`
    },
    {
      id: "logic_dec",
      label: "3. TEST: Decrement Logic (Java)",
      language: "java",
      code: `btnMinus.setOnClickListener(v -> {
    // Bug alert: No lower bound!
    itemCount--;
    tvCount.setText(String.valueOf(itemCount));
});

// TEST IT: Try keeping the "-" button pressed.`
    },
    {
      id: "bug_fix",
      label: "4. DEBUG: Floor Limit Check (Java)",
      language: "java",
      code: `// BUG FIX: Prevent negative inventory
btnMinus.setOnClickListener(v -> {
    if (itemCount > 0) {
        itemCount--;
        tvCount.setText(String.valueOf(itemCount));
    } else {
        toast("Cannot have negative items");
    }
});`
    }
  ];

  const handlePlus = (hasInc) => {
    if (!hasInc) return;
    setCount(c => c + 1);
  };

  const handleMinus = (hasDec, hasBugFix) => {
    if (!hasDec) return;
    if (hasBugFix && count <= 0) {
        // Bug fixed scenario
        const toast = document.createElement("div");
        toast.className = "absolute bottom-12 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-medium z-50 animate-bounce";
        toast.innerText = "Cannot have negative items";
        document.getElementById("phone-screen-counters").appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
        return;
    }
    // Bug exists scenario (can go negative)
    setCount(c => c - 1);
  };

  const renderPhone = (activeSegments) => {
    const hasState = activeSegments.includes("state_def");
    const hasInc = activeSegments.includes("logic_inc");
    const hasDec = activeSegments.includes("logic_dec");
    const hasBugFix = activeSegments.includes("bug_fix");

    if (!hasState) {
      return (
        <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
           <Box className="w-16 h-16 text-zinc-800 mb-6" />
           <p className="text-zinc-500 font-bold mb-2">Awaiting Step 1</p>
           <p className="text-zinc-600 text-sm">Define the integer State variable to track the count.</p>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        id="phone-screen-counters"
        className="flex-1 bg-zinc-50 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 p-4 bg-white shadow-sm flex items-center justify-between z-10">
            <h2 className="font-bold text-zinc-900">Inventory Tracker</h2>
            <button onClick={() => setCount(0)} className="text-zinc-400 p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <RotateCcw className="w-5 h-5"/>
            </button>
        </div>
        
        <div className="flex flex-col items-center gap-12 w-full px-8 mt-12">
            
            <div className="text-center relative">
                {count < 0 && !hasBugFix && (
                    <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="absolute -top-16 -left-16 -right-16 text-center bg-red-100 text-red-600 border border-red-200 text-xs p-2 rounded-lg shadow-lg z-20 font-bold">
                        BUG: You have negative inventory. How is that physically possible? Activate Step 4.
                    </motion.div>
                )}
                <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2 block">Stock Count</span>
                <AnimatePresence mode="popLayout">
                    <motion.div 
                        key={count} 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 20 }}
                        className={`text-8xl font-light tracking-tighter ${count < 0 ? 'text-red-500' : 'text-zinc-900'}`}
                    >
                        {count}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex w-full gap-4">
                <button 
                  onClick={() => handleMinus(hasDec, hasBugFix)}
                  className={`flex-1 aspect-square rounded-[32px] flex items-center justify-center text-3xl shadow-lg border-2
                    ${hasDec ? 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 active:scale-95' : 'bg-zinc-100 border-zinc-200/50 text-zinc-300 cursor-not-allowed'}
                    ${count < 0 && !hasBugFix ? 'shadow-red-500/20 shadow-xl' : ''}
                  `}
                >
                    <Minus className="w-10 h-10" />
                </button>
                <button 
                  onClick={() => handlePlus(hasInc)}
                  className={`flex-1 aspect-square rounded-[32px] flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20 border-2
                    ${hasInc ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 active:scale-95' : 'bg-blue-100 border-blue-200/50 text-blue-300 cursor-not-allowed'}
                  `}
                >
                    <Plus className="w-10 h-10" strokeWidth={3} />
                </button>
            </div>

            <div className="text-center text-xs text-zinc-400 mt-4 h-8">
                {!hasInc && "Plus button logic is not wired. Tap to test."}
                {hasInc && !hasDec && "Minus button logic is not wired. Tap to test."}
                {hasInc && hasDec && !hasBugFix && "Logic wired. Try making stock negative!"}
                {hasBugFix && "Floor limit active. Safe mode enabled."}
            </div>

        </div>

      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <CodePlayground 
        title="State Counter & Limit Checks"
        description="Follow the steps to establish state, wire the increment/decrement logic, and implement a check to prevent physically impossible negative numbers from being recorded."
        segments={segments}
        renderPhone={renderPhone}
        sequential={true}
      />
    </div>
  );
}
