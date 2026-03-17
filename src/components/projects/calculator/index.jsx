import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodePlayground from '../../interactive/CodePlayground';

export default function CalculatorProject() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [errorState, setErrorState] = useState(false);

  // Define the Build -> Test -> Debug sequence
  const segments = [
    {
      id: "layout",
      label: "1. BUILD: Grid Layout (XML)",
      language: "xml",
      code: `&lt;GridLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:rowCount="5"
    android:columnCount="4"&gt;

    &lt;TextView 
        android:id="@+id/tvDisplay"
        android:layout_columnSpan="4" /&gt;
    
    &lt;!-- Number and OP Buttons --&gt;
    &lt;Button android:text="7" /&gt;
    &lt;Button android:text="8" /&gt;
    &lt;Button android:text="/" /&gt;
&lt;/GridLayout&gt;`
    },
    {
      id: "logic_wire",
      label: "2. BUILD: Wire Logic (Java)",
      language: "java",
      code: `public class Calculator extends Activity {
    private String current = "";
    private double firstOp = 0;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        TextView display = findViewById(R.id.tvDisplay);
        // Buttons dynamically linked...
    }
}`
    },
    {
      id: "logic_math",
      label: "3. TEST: Operations Match (Java)",
      language: "java",
      code: `private void calculate(String op) {
    double secondOp = Double.parseDouble(current);
    double result = 0;
    
    switch (op) {
        case "+": result = firstOp + secondOp; break;
        case "-": result = firstOp - secondOp; break;
        case "*": result = firstOp * secondOp; break;
        case "/": result = firstOp / secondOp; break;
    }
    display.setText(String.valueOf(result));
}`
    },
    {
      id: "bug_fix",
      label: "4. DEBUG: Fix 'Divide by Zero' Crash (Java)",
      language: "java",
      code: `// BUG FIX: Prevent crash when dividing by zero
case "/": 
    if (secondOp == 0) {
        display.setText("Error");
        return;
    }
    result = firstOp / secondOp; 
    break;`
    }
  ];

  const handleNum = (num) => {
    if (errorState) { setDisplay(num); setErrorState(false); return; }
    setDisplay(prev => prev === '0' ? num : prev + num);
  };
  
  const handleOp = (op, hasBugFix) => {
    if (op === 'C') { setDisplay('0'); setEquation(''); setErrorState(false); return; }
    if (op === '=') {
      try {
        if (equation.includes('/') && display === '0') {
            if (!hasBugFix) {
                // Crash simulation
                setDisplay('FATAL CRASH');
                setErrorState(true);
                return;
            } else {
                setDisplay('Error');
                setErrorState(true);
                setEquation('');
                return;
            }
        }
        const res = eval(equation + display);
        // Handle JS infinity matching Java crash behavior loosely
        if (res === Infinity || isNaN(res)) {
            if (!hasBugFix) {
                setDisplay('FATAL CRASH');
                setErrorState(true);
            } else {
                setDisplay('Error');
                setErrorState(true);
                setEquation('');
            }
            return;
        }

        setDisplay(String(res));
        setEquation('');
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const renderPhone = (activeSegments) => {
    const hasLayout = activeSegments.includes("layout");
    const hasVars = activeSegments.includes("logic_wire");
    const hasMath = activeSegments.includes("logic_math");
    const hasBugFix = activeSegments.includes("bug_fix");

    if (!hasLayout) {
      return (
        <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-[20px] bg-zinc-900 border border-zinc-800 animate-pulse mb-4 flex items-center justify-center">
             <div className="w-8 h-8 opacity-20 bg-white rounded-lg"></div>
          </div>
          <p className="text-zinc-500 font-bold mb-2">Awaiting Step 1</p>
          <p className="text-zinc-600 text-sm">Activate the XML Layout block to structure the UI.</p>
        </div>
      );
    }

    if (errorState && display === 'FATAL CRASH') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-red-950 flex flex-col items-center justify-center p-6 text-center border-4 border-red-500 rounded-3xl z-50">
                <h3 className="text-red-500 text-2xl font-black mb-2">APP CRASHED</h3>
                <p className="text-red-300 mb-6 text-sm">ArithmeticException: divide by zero</p>
                <div className="bg-black/50 p-4 rounded-xl text-left w-full text-xs text-red-400 font-mono mb-6">
                    at java.math.BigDecimal.divide<br/>
                    at com.example.calc.calculate(MainActivity.java:45)
                </div>
                <button onClick={() => { setDisplay('0'); setEquation(''); setErrorState(false); }} className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg">Restart App</button>
                {!hasBugFix && (
                  <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 1}} className="absolute bottom-6 bg-zinc-900 p-4 rounded-xl border border-zinc-700 mx-4 max-w-[250px]">
                    <p className="text-white text-sm">Activate Step 4 to implement the bug fix.</p>
                  </motion.div>
                )}
            </motion.div>
        )
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-[#1c1c1e] flex flex-col h-full text-white"
      >
        <div className="flex-1 flex flex-col justify-end p-6 items-end relative">
          
          {/* Instruction overlays */}
          {!hasMath && hasVars && <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-blue-500/20 text-blue-400 p-3 rounded-lg text-sm text-right border border-blue-500/30">Layout is wired, but operations (+ - * /) aren't active.<br/>Activate Step 3.</div>}
          {hasMath && !hasBugFix && <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-yellow-500/20 text-yellow-500 p-3 rounded-lg text-sm text-right border border-yellow-500/30 font-bold animate-pulse">Test it! Calculate: 5 ÷ 0 =</div>}

          <div className="text-zinc-500 text-xl h-8">{hasVars ? equation : ''}</div>
          <div className="text-6xl font-light tracking-tight truncate max-w-full">
            {hasVars ? display : '0'}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-4 pb-12">
           {['C', '+/-', '%', '/'].map(op => (
             <button key={op} onClick={() => hasMath ? handleOp(op, hasBugFix) : null} className={`h-16 rounded-full text-xl font-medium transition-colors ${hasMath ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] active:bg-[#ff9f0a]/40' : 'bg-zinc-800 text-zinc-600'}`}>
               {op}
             </button>
           ))}
           {['7', '8', '9', '*'].map(n => (
             <button key={n} onClick={() => n==='*' ? (hasMath && handleOp(n, hasBugFix)) : (hasVars && handleNum(n))} className={`h-16 rounded-full text-xl font-medium transition-colors ${isNaN(n) ? (hasMath ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] active:bg-[#ff9f0a]/40' : 'bg-zinc-800 text-zinc-600') : (hasVars ? 'bg-zinc-800 text-white active:bg-zinc-700' : 'bg-zinc-900 border border-zinc-800 text-zinc-700')}`}>
               {n}
             </button>
           ))}
           {['4', '5', '6', '-'].map(n => (
             <button key={n} onClick={() => n==='-' ? (hasMath && handleOp(n, hasBugFix)) : (hasVars && handleNum(n))} className={`h-16 rounded-full text-xl font-medium transition-colors ${isNaN(n) ? (hasMath ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] active:bg-[#ff9f0a]/40' : 'bg-zinc-800 text-zinc-600') : (hasVars ? 'bg-zinc-800 text-white active:bg-zinc-700' : 'bg-zinc-900 border border-zinc-800 text-zinc-700')}`}>
               {n}
             </button>
           ))}
           {['1', '2', '3', '+'].map(n => (
             <button key={n} onClick={() => n==='+' ? (hasMath && handleOp(n, hasBugFix)) : (hasVars && handleNum(n))} className={`h-16 rounded-full text-xl font-medium transition-colors ${isNaN(n) ? (hasMath ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] active:bg-[#ff9f0a]/40' : 'bg-zinc-800 text-zinc-600') : (hasVars ? 'bg-zinc-800 text-white active:bg-zinc-700' : 'bg-zinc-900 border border-zinc-800 text-zinc-700')}`}>
               {n}
             </button>
           ))}
           <button onClick={() => hasVars && handleNum('0')} className={`col-span-2 h-16 rounded-full text-left pl-8 text-xl font-medium transition-colors ${hasVars ? 'bg-zinc-800 text-white active:bg-zinc-700' : 'bg-zinc-900 border border-zinc-800 text-zinc-700'}`}>0</button>
           <button onClick={() => hasVars && handleNum('.')} className={`h-16 rounded-full text-xl font-medium transition-colors ${hasVars ? 'bg-zinc-800 text-white active:bg-zinc-700' : 'bg-zinc-900 border border-zinc-800 text-zinc-700'}`}>.</button>
           <button onClick={() => hasMath && handleOp('=', hasBugFix)} className={`h-16 rounded-full text-xl font-medium transition-colors ${hasMath ? 'bg-[#ff9f0a] text-white active:bg-[#ff9f0a]/80' : 'bg-zinc-800 text-zinc-600'}`}>=</button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <CodePlayground 
        title="Calculator: Build, Test, Debug"
        description="Follow the steps to construct the layout, wire the math logic, test it by dividing by zero, and implement the bug fix."
        segments={segments}
        renderPhone={renderPhone}
        sequential={true}
      />
    </div>
  );
}
