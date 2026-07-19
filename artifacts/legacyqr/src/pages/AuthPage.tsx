import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake auth - just route to dashboard
    setLocation('/dashboard');
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 bg-bg relative">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-sm border border-border-subtle relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-text-primary mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-text-secondary">
            {isLogin ? 'Sign in to manage your Life Stories' : 'Start preserving memories today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
              <input 
                required 
                type="text" 
                className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
                placeholder="Jane Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input 
              required 
              type="email" 
              className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
              placeholder="jane@example.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-text-primary">Password</label>
              {isLogin && <a href="#" className="text-xs text-text-secondary hover:text-accent-primary">Forgot?</a>}
            </div>
            <input 
              required 
              type="password" 
              className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="legacy-button legacy-button-primary w-full py-3 mt-2">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-border-subtle"></div>
            <span className="relative bg-surface px-4 text-xs text-text-secondary">or</span>
          </div>
          
          <Link href="/dashboard" className="text-sm font-medium text-accent-primary hover:text-accent-primary/80">
            Continue as guest (View Demo)
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
