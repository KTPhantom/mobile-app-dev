import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="modules" element={<Modules />} />
          <Route path="module/:id" element={<ModuleDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
