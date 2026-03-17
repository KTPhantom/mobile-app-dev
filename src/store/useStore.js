import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      completedModules: [],
      currentModuleId: null,
      
      markModuleComplete: (moduleId) => set((state) => {
        if (!state.completedModules.includes(moduleId)) {
          return { completedModules: [...state.completedModules, moduleId] };
        }
        return state;
      }),
      
      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
      
      resetProgress: () => set({ completedModules: [], currentModuleId: null })
    }),
    {
      name: 'mobile-dev-progress-storage', // unique name
    }
  )
);

export default useStore;
