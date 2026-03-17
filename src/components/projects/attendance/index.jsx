import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Users } from 'lucide-react';
import CodePlayground from '../../interactive/CodePlayground';

export default function AttendanceProject() {
  const initialStudents = [
    { id: 1, name: 'Alice Smith', present: false },
    { id: 2, name: 'Bob Johnson', present: false },
    { id: 3, name: 'Charlie Davis', present: false },
    { id: 4, name: 'Diana Prince', present: false },
    { id: 5, name: 'Ethan Hunt', present: false },
    { id: 6, name: 'Fiona Gallagher', present: false }
  ];

  const [students, setStudents] = useState(initialStudents);

  const segments = [
    {
      id: "layout",
      label: "1. BUILD: RecyclerView (XML)",
      language: "xml",
      code: `&lt;!-- activity_main.xml --&gt;
&lt;androidx.recyclerview.widget.RecyclerView
    android:id="@+id/rvStudents"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutManager="LinearLayoutManager" /&gt;`
    },
    {
      id: "logic",
      label: "2. BUILD: Item Adapter (Java)",
      language: "java",
      code: `public void onBindViewHolder(ViewHolder holder, int pos) {
    Student s = students.get(pos);
    holder.nameText.setText(s.getName());
    holder.checkBox.setChecked(s.isPresent());
    
    // UI is wired, but clicks don't save state yet!
}`
    },
    {
      id: "test",
      label: "3. TEST: Toggle State (Java)",
      language: "java",
      code: `// Test: State Persistence
holder.itemView.setOnClickListener(v -> {
    s.setPresent(!s.isPresent());
    notifyItemChanged(pos); 
    updateTotalCount();
});`
    },
    {
      id: "challenge",
      label: "4. CHALLENGE: 'Select All' Feature",
      language: "java",
      code: `// CHALLENGE IMPLEMENTATION
Button selectAllBtn = findViewById(R.id.btnSelectAll);

selectAllBtn.setOnClickListener(v -> {
    for(Student s : students) {
        s.setPresent(true); 
    }
    adapter.notifyDataSetChanged();
});`
    }
  ];

  const toggleStudent = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, present: !s.present } : s
    ));
  };

  const selectAll = () => {
    setStudents(students.map(s => ({ ...s, present: true })));
  };

  const renderPhone = (activeSegments) => {
    const hasLayout = activeSegments.includes("layout");
    const hasLogic = activeSegments.includes("logic");
    const hasTest = activeSegments.includes("test");
    const hasChallenge = activeSegments.includes("challenge");

    // "logic" renders the list but clicks don't work (visual only)
    // "test" enables the click toggling
    // "challenge" shows and enables the select all button

    if (!hasLayout) {
      return (
        <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
           <div className="w-64 h-32 border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center rounded-xl mb-4 text-zinc-600 font-mono text-sm">RecyclerView Placeholder</div>
           <p className="text-zinc-500 font-bold mb-2">Awaiting Step 1</p>
           <p className="text-zinc-600 text-sm">Initialize the RecyclerView XML layout.</p>
        </div>
      );
    }

    const presentCount = students.filter(s => s.present).length;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-white flex flex-col h-full overflow-hidden relative"
      >
        {/* App Header */}
        <div className="bg-blue-600 text-white p-4 shadow-md z-10 flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">CS101 Attendance</h2>
            {hasTest ? (
               <p className="text-blue-200 text-sm">{presentCount} / {students.length} Present</p>
            ) : (
               <p className="text-blue-200 text-sm">-- / -- Present</p>
            )}
          </div>
          {hasChallenge && (
            <motion.button 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              onClick={selectAll}
              className="px-3 py-1.5 bg-white text-blue-600 text-xs font-bold rounded shadow-sm flex items-center gap-1 active:scale-95"
            >
              <Users className="w-3 h-3"/> Select All
            </motion.button>
          )}
        </div>

        {/* Content Area */}
        {hasLogic ? (
           <div className="flex-1 overflow-y-auto bg-zinc-50 p-2 relative">
             
             {!hasTest && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded-lg text-sm z-20 font-medium shadow-sm flex items-start gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    The Adapter is rendering visually, but State clicks aren't wired up. Try clicking a row—nothing happens. Activate Step 3.
                  </div>
                </div>
             )}

             {students.map((student, i) => (
               <motion.div 
                 key={student.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 onClick={() => hasTest ? toggleStudent(student.id) : null}
                 className={`flex items-center p-4 mb-2 bg-white rounded-xl shadow-sm border transition-all ${
                   student.present ? 'border-blue-500 bg-blue-50/30' : 'border-zinc-200 hover:border-zinc-300'
                 } ${!hasTest ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
               >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                   student.present ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'
                 }`}>
                   <User className="w-5 h-5" />
                 </div>
                 <div className="flex-1 text-zinc-800 font-medium">{student.name}</div>
                 <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${
                   student.present ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-300 bg-zinc-50'
                 }`}>
                   {student.present && <Check className="w-4 h-4" />}
                 </div>
               </motion.div>
             ))}
           </div>
        ) : (
           <div className="flex-1 bg-zinc-100 flex flex-col items-center justify-center p-6 text-center border-t border-zinc-200">
             <p className="text-zinc-400 font-medium mb-2">RecyclerView is empty.</p>
             <p className="text-zinc-500 text-sm">Activate Step 2 to bind the Java formatting Logic (The ViewAdapter).</p>
           </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full">
      <CodePlayground 
        title="Student Attendance Simulator"
        description="Follow the steps to construct the list view, bind the data, test the state toggles, and implement the 'Select All' feature challenge."
        segments={segments}
        renderPhone={renderPhone}
        sequential={true}
      />
    </div>
  );
}
