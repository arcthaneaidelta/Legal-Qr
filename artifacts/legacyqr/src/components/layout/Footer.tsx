import React, { useState } from 'react';
import { Link } from 'wouter';

export function Footer() {
  const [email, setEmail] = useState('');
  const [msgSent, setMsgSent] = useState(false);
  const [subSent, setSubSent] = useState(false);

  return (
    <footer className="bg-surface border-t border-border-subtle pt-20 pb-8 mt-auto">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-semibold tracking-tight text-text-primary">
                LegacyQR
              </span>
              <div className="grid grid-cols-2 gap-0.5 w-3 h-3 opacity-80">
                <div className="bg-accent-primary rounded-sm" />
                <div className="bg-accent-primary rounded-sm" />
                <div className="bg-accent-primary rounded-sm" />
                <div className="bg-accent-ember rounded-sm" />
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Connecting the living with the memories of those who came before.
            </p>
          </div>

          {/* Explore */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-3">
            <h4 className="font-medium text-text-primary mb-2">Explore</h4>
            <Link href="/" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Home</Link>
            <Link href="/memorial" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Sample Memorial</Link>
            <Link href="/auth" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Sign In</Link>
            <Link href="/admin" className="text-sm text-text-secondary hover:text-accent-primary transition-colors">Admin Demo</Link>
          </div>

          {/* Contact Form */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-medium text-text-primary mb-4">Contact</h4>
            {msgSent ? (
              <p className="text-sm text-success bg-success/10 p-3 rounded-md border border-success/20">Message sent successfully.</p>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setMsgSent(true); }}>
                <input required type="text" placeholder="Name" className="bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50" />
                <input required type="email" placeholder="Email" className="bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50" />
                <textarea required placeholder="Message" rows={2} className="bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-none"></textarea>
                <button type="submit" className="legacy-button legacy-button-secondary py-2 text-sm w-full">Send Message</button>
              </form>
            )}
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-medium text-text-primary mb-4">Stay updated</h4>
            {subSent ? (
              <p className="text-sm text-success bg-success/10 p-3 rounded-md border border-success/20">Subscribed successfully.</p>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setSubSent(true); }}>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address" 
                  className="bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50" 
                />
                <button type="submit" className="legacy-button bg-text-primary text-bg py-2 text-sm w-full hover:bg-accent-primary">
                  Subscribe
                </button>
              </form>
            )}
          </div>
          
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © 2026 LegacyQR. All rights reserved. M Akram
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-text-secondary hover:text-text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-text-secondary hover:text-text-primary cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
