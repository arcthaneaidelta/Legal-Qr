import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { LiveBackground } from '../components/LiveBackground';
import { QRModuleField } from '../components/QRModuleField';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, PenTool, Smartphone } from 'lucide-react';

// Mock profiles cycling in the phone mockup
const PROFILES = [
  {
    name: 'Eleanor M. Whitfield',
    years: '1941 — 2023',
    tagline: 'Devoted mother, avid reader,\nmaker of perfect scones',
    accentFrom: 'from-[#4C7764]/30',
    accentTo: 'to-[#C46E3C]/20',
    photoColor: 'bg-[#4C7764]/40',
    blocks: ['bg-[#4C7764]/20', 'bg-[#C46E3C]/15', 'bg-[#4C7764]/25', 'bg-[#4C7764]/15'],
  },
  {
    name: 'George R. Harrison',
    years: '1938 — 2021',
    tagline: 'Engineer, jazz lover,\ngrandfather extraordinaire',
    accentFrom: 'from-[#C46E3C]/30',
    accentTo: 'to-[#4C7764]/20',
    photoColor: 'bg-[#C46E3C]/40',
    blocks: ['bg-[#C46E3C]/20', 'bg-[#4C7764]/15', 'bg-[#C46E3C]/25', 'bg-[#C46E3C]/15'],
  },
  {
    name: 'Rose A. Pemberton',
    years: '1952 — 2024',
    tagline: 'Teacher, gardener,\nheart of the neighbourhood',
    accentFrom: 'from-[#8B7355]/30',
    accentTo: 'to-[#4C7764]/20',
    photoColor: 'bg-[#8B7355]/40',
    blocks: ['bg-[#8B7355]/20', 'bg-[#4C7764]/15', 'bg-[#8B7355]/25', 'bg-[#8B7355]/15'],
  },
];

function CyclingPhone() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % PROFILES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const profile = PROFILES[idx];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 flex justify-center lg:justify-end">
      {/* Glow behind phone */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full opacity-50 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(76,119,100,0.35) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Phone frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden w-full max-w-[300px]"
        style={{
          border: '1px solid rgba(150,210,180,0.35)',
          aspectRatio: '9/19',
          background: 'linear-gradient(160deg, #243d30 0%, #1a2e22 100%)',
          boxShadow: '0 0 0 6px rgba(76,119,100,0.12), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(76,119,100,0.25)',
        }}
      >
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center z-20">
          <div className="w-20 h-5 rounded-full bg-black/60" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Hero gradient */}
            <div className={`h-40 bg-gradient-to-br ${profile.accentFrom} ${profile.accentTo} relative flex-shrink-0`}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
            </div>

            {/* Content */}
            <div className="flex-1 px-5 pb-6 -mt-12 flex flex-col items-center text-center overflow-hidden">
              {/* Avatar */}
              <div className={`w-20 h-20 rounded-full border-2 border-white/10 ${profile.photoColor} mb-3 shadow-lg flex-shrink-0`} />

              {/* Name */}
              <h3
                className="mb-0.5 leading-tight text-white/90"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1rem', fontWeight: 500 }}
              >
                {profile.name}
              </h3>
              <p className="text-white/40 mb-3 flex-shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem' }}>
                {profile.years}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-[#C46E3C]/60 mb-3 flex-shrink-0" />

              {/* Tagline */}
              <p className="text-white/50 mb-4 flex-shrink-0 leading-snug whitespace-pre-line"
                style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '0.65rem' }}>
                {profile.tagline}
              </p>

              {/* Skeleton text lines */}
              <div className="w-full flex flex-col gap-1.5 mb-4 flex-shrink-0">
                <div className="h-1.5 w-full rounded-full bg-white/8" />
                <div className="h-1.5 w-5/6 rounded-full bg-white/6" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/8" />
                <div className="h-1.5 w-3/4 rounded-full bg-white/5" />
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 gap-1.5 w-full">
                {profile.blocks.map((cls, i) => (
                  <div key={i} className={`aspect-square rounded ${cls} border border-white/5`} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Shine */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0" />

        {/* Bottom bar */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <div className="flex gap-1.5">
            {PROFILES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === idx ? '16px' : '4px',
                  height: '4px',
                  background: i === idx ? '#C46E3C' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating QR badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 md:-left-10 p-3 rounded-xl flex items-center gap-3 shadow-2xl"
        style={{ background: 'rgba(14,23,20,0.9)', border: '1px solid rgba(76,119,100,0.3)', backdropFilter: 'blur(12px)' }}
      >
        <div className="w-10 h-10 rounded flex items-center justify-center p-1 flex-shrink-0"
          style={{ background: '#4C7764' }}>
          <div className="w-full h-full grid grid-cols-3 gap-0.5">
            {[1,1,1,1,0,1,1,1,1].map((v,i) => (
              <div key={i} className={`rounded-sm ${v ? 'bg-white/90' : 'bg-transparent'}`} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-white/40 font-medium leading-none mb-0.5" style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace" }}>SCAN TO REMEMBER</p>
          <p className="text-white/80 leading-none" style={{ fontSize: '0.75rem', fontFamily: "'Fraunces', serif" }}>Always accessible</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">

      {/* ── HERO ── full-bleed dark cinematic */}
      <section
        className="relative w-full min-h-[100vh] flex items-center pt-16 pb-24 overflow-hidden"
        style={{ background: '#07100e' }}
      >
        {/* Living background */}
        <LiveBackground className="z-0" />

        {/* Vignette edge darkening */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7,16,14,0.7) 100%)' }} />

        <div className="container mx-auto px-6 md:px-12 xl:px-24 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div className="flex flex-col gap-6 items-start">
              {/* Eyebrow with live pulsing dot */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#C46E3C' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#C46E3C' }} />
                </span>
                <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: '#C46E3C', fontFamily: "'IBM Plex Mono', monospace" }}>
                  A Digital Memorial Platform
                </span>
              </div>

              <h1
                className="leading-[1.05]"
                style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 400, color: '#f0f5f2' }}
              >
                Their story,<br />
                <span style={{ color: '#6db898' }}>kept alive.</span>
              </h1>

              <p className="leading-relaxed max-w-md" style={{ color: 'rgba(220,240,230,0.72)', fontFamily: "'Public Sans', sans-serif", fontSize: '1.05rem' }}>
                Preserve the memories of those who came before. A beautiful, permanent digital Life Story, accessed instantly from a weatherproof QR plaque at their resting place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/memorial"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: '#4C7764', color: '#fff', fontFamily: "'Public Sans', sans-serif", boxShadow: '0 0 32px rgba(76,119,100,0.35)' }}
                >
                  Preview a Life Story
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-medium transition-all duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: "'Public Sans', sans-serif" }}
                >
                  See how it works
                  <span className="ml-2 transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {['#4C7764','#C46E3C','#8B7355','#4C7764'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#07100e', background: c, opacity: 0.7 }} />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontFamily: "'Public Sans', sans-serif" }}>
                  Trusted by families across the UK
                </p>
              </div>
            </div>

            {/* Right — cycling phone */}
            <div>
              <CyclingPhone />
            </div>

          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #07100e)' }} />
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
              { num: '01', icon: PenTool, title: 'Create a profile', desc: 'Add photos, a life story, and key dates in our simple platform.' },
              { num: '02', icon: Smartphone, title: 'We generate a QR', desc: 'A unique, permanent link is created specifically for your loved one.' },
              { num: '03', icon: ShieldCheck, title: 'Print your plaque', desc: 'Order a weatherproof sticker or engraved metal plaque.' },
              { num: '04', icon: Check, title: 'Visitors scan', desc: 'Anyone at the memorial can scan to read, remember, and reflect.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
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
                {[
                  { title: 'Built to Last', desc: 'Weatherproof materials designed for outdoor permanence.' },
                  { title: 'Easily Updated', desc: 'Families can add new photos and memories over time.' },
                  { title: 'Ad-Free Privacy', desc: 'No tracking, no ads. Just a quiet space for reflection.' },
                  { title: 'Accessible', desc: 'Anyone with a smartphone can read their story.' },
                ].map(f => (
                  <div key={f.title} className="p-6 border border-border-subtle rounded-xl bg-surface/50">
                    <h4 className="font-medium text-text-primary mb-2">{f.title}</h4>
                    <p className="text-sm text-text-secondary">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-6">A space for reflection, anywhere.</h2>
              <p className="text-lg text-text-secondary mb-8">Traditional headstones offer only a name and dates. A digital memorial provides a window into their lived experience.</p>
              <Link href="/memorial" className="legacy-button legacy-button-secondary px-6 py-3">View Sample Memorial</Link>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="legacy-card p-8 md:p-10 border-border-subtle">
              <h3 className="text-2xl font-serif text-text-primary mb-2">Single Life Story</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-text-primary">£49</span>
                <span className="text-text-secondary">one-time</span>
              </div>
              <p className="text-text-secondary mb-8">Perfect for honoring an individual.</p>
              <ul className="flex flex-col gap-4 mb-8">
                {['One beautiful profile page','Permanent QR code hosting','Weatherproof vinyl sticker included','Unlimited text and photos'].map(f => (
                  <li key={f} className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">{f}</span></li>
                ))}
              </ul>
              <Link href="/auth" className="legacy-button legacy-button-secondary w-full py-3">Get Started</Link>
            </div>
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
                {['Up to 5 profile pages','Permanent QR hosting for all','Priority customer support','Engraved metal plaque option'].map(f => (
                  <li key={f} className="flex gap-3 items-start"><Check className="w-5 h-5 text-accent-primary shrink-0" /><span className="text-sm">{f}</span></li>
                ))}
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
            {[
              { q: 'How durable is the QR sticker outdoors?', a: 'Our standard stickers are printed on industrial-grade weatherproof vinyl with a UV-resistant laminate, designed to withstand rain, frost, and direct sunlight for years. We also offer laser-engraved metal plaques for ultimate permanence.' },
              { q: 'Can the family update the page after purchase?', a: 'Yes. You retain login access to the dashboard where you can edit the biography, add new photos, or update milestones at any time. The QR code will automatically point to the updated page.' },
              { q: 'Who can see the memorial page?', a: 'The pages are public and designed to be easily accessed by anyone visiting the memorial site without needing an app or login.' },
              { q: 'What if the sticker gets damaged?', a: 'You can download your unique QR code at any time from your dashboard to reprint it yourself, or order replacement stickers directly from us for a small fee.' },
            ].map(({ q, a }) => (
              <details key={q} className="group border-b border-border-subtle pb-6 cursor-pointer">
                <summary className="font-medium text-lg text-text-primary flex justify-between items-center list-none">
                  {q}
                  <span className="transition group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-4 text-text-secondary leading-relaxed text-sm">{a}</p>
              </details>
            ))}
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
