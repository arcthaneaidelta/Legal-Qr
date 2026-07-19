import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ThemeContext } from '../ThemeProvider';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';
  
  // Fake login state check based on if we visited /dashboard
  // Just for demo purposes we check path
  const isLoggedIn = location.includes('/dashboard') || location.includes('/create') || location.includes('/admin');

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-surface shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4 opacity-80">
              <div className="bg-accent-primary rounded-sm" />
              <div className="bg-accent-primary rounded-sm" />
              <div className="bg-accent-primary rounded-sm" />
              <div className="bg-accent-ember rounded-sm" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-text-primary">
              LegacyQR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent-ember transition-all duration-200 group-hover:w-full group-hover:left-0" />
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent-ember transition-all duration-200 group-hover:w-full group-hover:left-0" />
            </Link>
            <Link href="/memorial" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group">
              Sample Memorial
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent-ember transition-all duration-200 group-hover:w-full group-hover:left-0" />
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent-ember transition-all duration-200 group-hover:w-full group-hover:left-0" />
            </Link>
            <Link href="/admin" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2">
              Admin
              <span className="text-[10px] uppercase tracking-wider bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded-sm">Demo</span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-surface"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {isLoggedIn ? (
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                  EH
                </div>
                E. Hartley
              </Link>
            ) : (
              <Link
                href="/memorial"
                className="legacy-button legacy-button-primary px-5 py-2.5 text-sm"
              >
                Preview a Life Story
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-surface flex flex-col pt-24 px-6 pb-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl font-serif">
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              </motion.div>
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                <Link href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</Link>
              </motion.div>
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link href="/memorial" onClick={() => setMenuOpen(false)}>Sample Memorial</Link>
              </motion.div>
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
                <Link href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
              </motion.div>
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin Demo</Link>
              </motion.div>
            </nav>
            
            <div className="mt-auto flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-bg rounded-full text-text-primary"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              {isLoggedIn ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="legacy-button legacy-button-secondary w-full py-4 text-base">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="legacy-button legacy-button-primary w-full py-4 text-base">
                  Sign In / Create Account
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
