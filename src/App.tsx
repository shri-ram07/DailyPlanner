import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { CalendarPage } from '@/pages/CalendarPage';
import { TodayPage } from '@/pages/TodayPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { useStudyStore } from '@/store/useStudyStore';

function App() {
  const { theme } = useStudyStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <TooltipProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
