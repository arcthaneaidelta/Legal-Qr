import React from 'react';
import { Link } from 'wouter';
import { QRModuleField } from '../components/QRModuleField';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, PenTool, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      
      {/* Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
        <QRModuleField parallaxRate={0.15} opacity={0.12} className="z-0" />
        
        <div className="container mx-auto px-6 md:px-12 xl:px-24 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6 items-start"
            >
              <span className="text-sm font-medium tracking-wider text-accent-primary uppercase">
                A digital memorial platform
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif leading-[1.1] text-text-primary max-w-xl">
                Their story, kept alive.
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md mb-4">
                Preserve the memories of those who came before. A beautiful, permanent digital Life Story, accessed instantly from a weatherproof QR plaque at their resting place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Magnetic button effect placeholder - standard button here */}
                <Link href="/memorial" className="legacy-button legacy-button-primary px-8 py-4 text-base shadow-lg shadow-accent-primary/20">
                  Preview a Life Story
                </Link>
                <a href="#how-it-works" className="legacy-button legacy-button-secondary px-8 py-4 text-base group">
                  See how it works
                  <span className="ml-2 group-hover:translate-y-1 transition-transform">↓</span>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md mx-auto lg:mx-0 flex justify-center"
            >
              {/* Plaque / Device mockup */}
              <div className="relative rounded-[2rem] border-8 border-surface bg-bg shadow-2xl overflow-hidden aspect-[9/19] w-full max-w-[320px]">
                {/* Simulated auto-scrolling content */}
                <div className="absolute inset-0 bg-surface flex flex-col">
                  {/* Mockup header */}
                  <div className="h-48 bg-gradient-to-br from-accent-primary/20 to-accent-ember/20" />
                  <div className="px-6 py-6 text-center -mt-16">
                    <div className="w-24 h-24 rounded-full border-4 border-surface bg-bg mx-auto mb-3 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-border-subtle" />
                    </div>
                    <h3 className="font-serif text-xl mb-1 text-text-primary">Eleanor M. Whitfield</h3>
                    <p className="text-xs text-text-secondary font-mono mb-4">1941 — 2023</p>
                    <div className="h-2 w-3/4 mx-auto bg-border-subtle rounded-full mb-3" />
                    <div className="h-2 w-full mx-auto bg-border-subtle rounded-full mb-3" />
                    <div className="h-2 w-5/6 mx-auto bg-border-subtle rounded-full mb-3" />
                    <div className="h-2 w-2/3 mx-auto bg-border-subtle rounded-full mb-8" />
                    
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="aspect-square bg-border-subtle rounded-md" />
                      <div className="aspect-square bg-border-subtle rounded-md" />
                      <div className="aspect-square bg-border-subtle rounded-md" />
                      <div className="aspect-square bg-border-subtle rounded-md" />
                    </div>
                  </div>
                </div>
                {/* Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
              </div>
              
              {/* Floating QR Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:-right-12 bg-surface p-4 rounded-xl shadow-xl border border-border-subtle flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-text-primary rounded flex items-center justify-center p-1">
                  <div className="w-full h-full grid grid-cols-3 gap-0.5">
                    <div className="bg-bg" /><div className="bg-bg" /><div className="bg-bg" />
                    <div className="bg-bg" /><div className="bg-bg opacity-0" /><div className="bg-bg" />
                    <div className="bg-bg" /><div className="bg-bg" /><div className="bg-bg" />
                  </div>
                </div>
                <div className="pr-4">
                  <p className="text-xs text-text-secondary font-medium">Scan to remember</p>
                  <p className="text-sm font-serif text-text-primary">Always accessible</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-24 bg-surface relative z-10 border-t border-border-subtle">
        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-4">How it works</h2>
            <p className="text-text-secondary">A simple, enduring way to connect physical memorials to digital memories.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', icon: PenTool, title: "Create a profile", desc: "Add photos, a life story, and key dates in our simple platform." },
              { num: '02', icon: Smartphone, title: "We generate a QR", desc: "A unique, permanent link is created specifically for your loved one." },
              { num: '03', icon: ShieldCheck, title: "Print your plaque", desc: "Order a weatherproof sticker or engraved metal plaque." },
              { num: '04', icon: Check, title: "Visitors scan", desc: "Anyone at the memorial can scan to read, remember, and reflect." }
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-bg border border-border-subtle flex items-center justify-center mb-6 relative">
                  <span className="absolute -top-3 -left-3 text-sm font-mono text-text-secondary bg-surface px-1">{step.num}</span>
                  <step.icon className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LegacyQR */}
      <section className="w-full py-24 bg-bg relative z-10">
        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 flex flex-col gap-8">
              <div className="legacy-card p-8 bg-surface">
                <blockquote className="text-lg text-text-primary font-serif italic mb-4">
                  "Having all her recipes, photos, and stories in one place... it feels like she's still sitting right there with us when we visit."
                </blockquote>
                <p className="text-xs text-text-secondary uppercase tracking-wider">— Illustrative example — a family reflecting on a parent's life.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 border border-border-subtle rounded-xl bg-surface/50">
                  <h4 className="font-medium text-text-primary mb-2">Built to Last</h4>
                  <p className="text-sm text-text-secondary">Weatherproof materials designed for outdoor permanence.</p>
                </div>
                <div className="p-6 border border-border-subtle rounded-xl bg-surface/50">
                  <h4 className="font-medium text-text-primary mb-2">Easily Updated</h4>
                  <p className="text-sm text-text-secondary">Families can add new photos and memories over time.</p>
                </div>
                <div className="p-6 border border-border-subtle rounded-xl bg-surface/50">
                  <h4 className="font-medium text-text-primary mb-2">Ad-Free Privacy</h4>
                  <p className="text-sm text-text-secondary">No tracking, no ads. Just a quiet space for reflection.</p>
                </div>
                <div className="p-6 border border-border-subtle rounded-xl bg-surface/50">
                  <h4 className="font-medium text-text-primary mb-2">Accessible</h4>
                  <p className="text-sm text-text-secondary">Anyone with a smartphone can read their story.</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-6">A space for reflection, anywhere.</h2>
              <p className="text-lg text-text-secondary mb-8">
                Traditional headstones offer only a name and dates. A digital memorial provides a window into their lived experience.
              </p>
              <Link href="/memorial" className="legacy-button legacy-button-secondary px-6 py-3">
                View Sample Memorial
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-24 bg-surface relative z-10 border-t border-border-subtle">
        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-4">Simple, one-time pricing</h2>
            <p className="text-text-secondary">No subscriptions. No hidden fees. Just peace of mind.</p>
            {/* PRICING: Confirm exact figures with client before launch */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1 */}
            <div className="legacy-card p-8 md:p-10 border-border-subtle">
              <h3 className="text-2xl font-serif text-text-primary mb-2">Single Life Story</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-text-primary">£49</span>
                <span className="text-text-secondary">one-time</span>
              </div>
              <p className="text-text-secondary mb-8">Perfect for honoring an individual.</p>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">One beautiful profile page</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Permanent QR code hosting</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Weatherproof vinyl sticker included</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Unlimited text and photos</span></li>
              </ul>
              <Link href="/auth" className="legacy-button legacy-button-secondary w-full py-3">Get Started</Link>
            </div>

            {/* Tier 2 */}
            <div className="legacy-card p-8 md:p-10 border-accent-primary bg-bg shadow-md relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent-primary text-surface text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-2xl font-serif text-text-primary mb-2">Family Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-text-primary">£129</span>
                <span className="text-text-secondary">one-time</span>
              </div>
              <p className="text-text-secondary mb-8">For preserving multiple generations.</p>
              <ul className="flex flex-col gap-4 mb-8">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Up to 5 profile pages</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Permanent QR hosting for all</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Priority customer support</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">Engraved metal plaque option</span></li>
              </ul>
              <Link href="/auth" className="legacy-button legacy-button-primary w-full py-3">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 bg-bg relative z-10">
        <div className="container mx-auto px-6 md:px-12 xl:px-24 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-12 text-center">Frequently asked questions</h2>
          
          <div className="flex flex-col gap-6">
            <details className="group border-b border-border-subtle pb-6 cursor-pointer">
              <summary className="font-medium text-lg text-text-primary flex justify-between items-center list-none">
                How durable is the QR sticker outdoors?
                <span className="transition group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm">
                Our standard stickers are printed on industrial-grade weatherproof vinyl with a UV-resistant laminate, designed to withstand rain, frost, and direct sunlight for years. We also offer laser-engraved metal plaques for ultimate permanence.
              </p>
            </details>
            <details className="group border-b border-border-subtle pb-6 cursor-pointer">
              <summary className="font-medium text-lg text-text-primary flex justify-between items-center list-none">
                Can the family update the page after purchase?
                <span className="transition group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm">
                Yes. You retain login access to the dashboard where you can edit the biography, add new photos, or update milestones at any time. The QR code will automatically point to the updated page.
              </p>
            </details>
            <details className="group border-b border-border-subtle pb-6 cursor-pointer">
              <summary className="font-medium text-lg text-text-primary flex justify-between items-center list-none">
                Who can see the memorial page?
                <span className="transition group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm">
                The pages are public and designed to be easily accessed by anyone visiting the memorial site without needing an app or login. 
              </p>
            </details>
            <details className="group border-b border-border-subtle pb-6 cursor-pointer">
              <summary className="font-medium text-lg text-text-primary flex justify-between items-center list-none">
                What if the sticker gets damaged?
                <span className="transition group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed text-sm">
                You can download your unique QR code at any time from your dashboard to reprint it yourself, or order replacement stickers directly from us for a small fee.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="w-full py-20 bg-accent-primary relative overflow-hidden">
        <QRModuleField parallaxRate={0} opacity={0.15} className="z-0" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-surface mb-8">Start their story today.</h2>
          <Link href="/auth" className="legacy-button bg-surface text-accent-primary hover:bg-bg px-8 py-4 text-base">
            Create an Account
          </Link>
        </div>
      </section>

    </div>
  );
}
