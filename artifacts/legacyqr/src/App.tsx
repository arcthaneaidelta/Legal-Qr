import React, { useEffect, useState } from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QRModuleField } from './components/QRModuleField';

// Pages
import NotFound from '@/pages/not-found';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import CreateWizard from '@/pages/CreateWizard';
import Checkout from '@/pages/Checkout';
import MemorialPage from '@/pages/MemorialPage';
import QRResult from '@/pages/QRResult';
import AdminDashboard from '@/pages/AdminDashboard';

const queryClient = new QueryClient();

// Loading state manager
function AppRouter() {
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show loading screen on initial load for root path
    if (location !== '/') {
      setLoading(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setLoading(false), 500); // fade out duration
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div 
        className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out cursor-pointer"
        style={{ opacity: exiting ? 0 : 1 }}
        onClick={() => { setExiting(true); setTimeout(() => setLoading(false), 500); }}
      >
        <QRModuleField assemble opacity={0.6} />
        <div className="z-10 text-center mt-32">
          <div className="w-32 h-px bg-border-subtle mx-auto overflow-hidden rounded-full">
            <div className="h-full bg-accent-ember animate-[progress_2s_ease-in-out_forwards]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full">
      <Navbar />
      <main className="flex-grow flex flex-col relative w-full pt-20">
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create" component={CreateWizard} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/memorial" component={MemorialPage} />
          <Route path="/qr-result" component={QRResult} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
