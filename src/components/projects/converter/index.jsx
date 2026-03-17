import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, AlertCircle } from 'lucide-react';
import CodePlayground from '../../interactive/CodePlayground';

export default function ConverterProject() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [errorState, setErrorState] = useState(false);

  // In this simulation, editing Celsius updates Fahrenheit if logic is active
  const segments = [
    {
      id: "layout",
      label: "1. BUILD: Input Fields (XML)",
      language: "xml",
      code: `&lt;!-- activity_main.xml --&gt;
&lt;EditText
    android:id="@+id/etCelsius"
    android:hint="Degrees Celsius" /&gt;

&lt;TextView
    android:id="@+id/tvFahrenheit"
    android:text="Degrees Fahrenheit" /&gt;`
    },
    {
      id: "logic_watcher",
      label: "2. BUILD: Bind TextWatcher (Java)",
      language: "java",
      code: `EditText etCelsius = findViewById(R.id.etCelsius);

etCelsius.addTextChangedListener(new TextWatcher() {
    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        // We hear the typing! 
        // But the math isn't done yet.
    }
});`
    },
    {
      id: "logic_math",
      label: "3. TEST: Conversion Math (Java)",
      language: "java",
      code: `// Inside onTextChanged:
String input = s.toString();
double c = Double.parseDouble(input);
double f = (c * 9/5) + 32;

tvFahrenheit.setText(String.format("%.1f °F", f));

// TEST IT: Try typing "100"`
    },
    {
      id: "bug_fix",
      label: "4. DEBUG: Input Validation Crash",
      language: "java",
      code: `// BUG FIX: Prevent crash when input is empty or non-numeric
String input = s.toString();
if (input.isEmpty()) {
    tvFahrenheit.setText("--");
    return;
}
try {
    double c = Double.parseDouble(input);
    double f = (c * 9/5) + 32;
    tvFahrenheit.setText(String.format("%.1f °F", f));
} catch (NumberFormatException e) {
    // Graceful error handling
    tvFahrenheit.setText("Invalid Number");
}`
    }
  ];

  const handleInputChange = (e, hasMath, hasBugFix) => {
    const val = e.target.value;
    setCelsius(val);

    if (!hasMath) {
        // Text changes but no math happens yet
        setFahrenheit('');
        setErrorState(false);
        return;
    }

    if (val === '') {
        if (!hasBugFix) {
            // Empty string crash simulation (Double.parseDouble(""))
            setErrorState(true);
            setFahrenheit('CRASH');
            return;
        } else {
            setFahrenheit('--');
            setErrorState(false);
            return;
        }
    }

    const num = Number(val);
    if (isNaN(num)) {
        if (!hasBugFix) {
            // NumberFormatException crash simulation
            setErrorState(true);
            setFahrenheit('CRASH');
        } else {
            setFahrenheit('Invalid Number');
            setErrorState(false);
        }
        return;
    }

    // Happy Path
    setErrorState(false);
    const result = (num * 9/5) + 32;
    setFahrenheit(result.toFixed(1) + ' °F');
  };

  const renderPhone = (activeSegments) => {
    const hasLayout = activeSegments.includes("layout");
    const hasWatcher = activeSegments.includes("logic_watcher");
    const hasMath = activeSegments.includes("logic_math");
    const hasBugFix = activeSegments.includes("bug_fix");

    if (!hasLayout) {
      return (
        <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
           <div className="w-full h-12 border-b-2 border-dashed border-zinc-700 mb-8 opacity-50" />
           <div className="w-full h-12 border-b-2 border-dashed border-zinc-700 opacity-50 mb-8" />
           <p className="text-zinc-500 font-bold mb-2">Awaiting Step 1</p>
           <p className="text-zinc-600 text-sm">Draw the Input and Text fields.</p>
        </div>
      );
    }

    if (errorState && fahrenheit === 'CRASH') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 bg-red-950 flex flex-col items-center justify-center p-6 text-center border-4 border-red-500 rounded-3xl z-50">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-red-500 text-2xl font-black mb-2">APP CRASHED</h3>
                <p className="text-red-300 mb-4 text-sm font-mono">NumberFormatException: empty String input</p>
                <div className="bg-black/50 p-4 rounded-xl text-left w-full text-xs text-red-400 font-mono mb-6">
                    at java.lang.Double.parseDouble<br/>
                    at MainActivity$1.onTextChanged(MainActivity.java:34)
                </div>
                <button onClick={() => { setCelsius('0'); setFahrenheit('32.0 °F'); setErrorState(false); }} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg transition-colors">Restart App</button>
            </motion.div>
        )
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-white flex flex-col h-full relative overflow-hidden"
      >
        <div className="bg-orange-500 text-white p-4 shadow-md text-center font-medium">
          Temperature Converter
        </div>

        <div className="p-8 flex-1 flex flex-col items-center justify-center gap-12 relative">
            
            {!hasWatcher && hasLayout && (
                <div className="absolute top-4 left-4 right-4 bg-zinc-100 border border-zinc-300 p-3 rounded-lg text-sm text-center text-zinc-600 shadow-sm z-10">
                    The UI exists, but without a <strong>TextWatcher</strong>, Android doesn't know when you type.
                </div>
            )}

            {hasWatcher && !hasMath && (
                <div className="absolute top-4 left-4 right-4 bg-blue-100 border border-blue-300 p-3 rounded-lg text-sm text-center text-blue-800 shadow-sm z-10 font-medium">
                    Typing is being detected! But no math logic exists to calculate Fahnrenheit. Activate Step 3.
                </div>
            )}

            {hasMath && !hasBugFix && (
                <div className="absolute bottom-4 left-4 right-4 bg-yellow-100 border border-yellow-400 p-3 rounded-lg text-sm text-center text-yellow-800 font-bold shadow-sm z-10 animate-bounce">
                    Try deleting all numbers so the input is totally empty. What happens?
                </div>
            )}

            <div className="w-full relative">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Degrees Celsius (°C)</label>
                <input 
                    type="text"
                    value={celsius}
                    onChange={(e) => hasWatcher ? handleInputChange(e, hasMath, hasBugFix) : setCelsius(e.target.value)}
                    placeholder="Enter value"
                    className="w-full text-5xl font-light text-zinc-800 border-b-2 border-zinc-200 focus:border-orange-500 outline-none pb-2 bg-transparent transition-colors"
                />
            </div>

            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shadow-sm">
                <ArrowDownUp className="w-6 h-6" />
            </div>

            <div className="w-full">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Degrees Fahrenheit (°F)</label>
                <div className={`w-full text-5xl font-light border-b-2 pb-2 transition-colors ${fahrenheit === 'Invalid Number' ? 'text-red-500 border-red-500/30' : 'text-orange-500 border-transparent'}`}>
                    {hasMath ? (fahrenheit || '--') : '--'}
                </div>
            </div>

        </div>

      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <CodePlayground 
        title="Unit Converter Simulator"
        description="Follow the steps to construct the layout, bind a TextWatcher to achieve live reloading, test the conversion logic, and fix the fatal empty-string parsing crash."
        segments={segments}
        renderPhone={renderPhone}
        sequential={true}
      />
    </div>
  );
}
