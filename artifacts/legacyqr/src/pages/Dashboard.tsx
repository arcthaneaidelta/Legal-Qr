import React from 'react';
import { Link } from 'wouter';
import { mockProfiles } from '@/lib/mockData';
import { Plus, Settings, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const PROFILE_COVERS: Record<string, string> = {
  'LQ-2024-001': 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=600&h=256&fit=crop&q=80', // Eleanor — roses
  'LQ-2024-002': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=256&fit=crop&q=80', // George — jazz/vintage
  'LQ-2024-003': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=256&fit=crop&q=80', // Rose — cottage garden
};

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col bg-bg min-h-[80vh]">
      <div className="container mx-auto px-6 md:px-12 xl:px-24 py-12">
        
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-text-primary mb-2">My Life Stories</h1>
            <p className="text-text-secondary">Manage and update the memorials you've created.</p>
          </div>
          <Link href="/create" className="legacy-button legacy-button-primary px-6 py-2.5 whitespace-nowrap gap-2">
            <Plus size={18} />
            Create New Profile
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfiles.map((profile, i) => (
            <motion.div 
              key={profile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="legacy-card overflow-hidden flex flex-col h-full"
            >
              <div className="h-32 relative overflow-hidden bg-accent-primary/10">
                <img
                  src={PROFILE_COVERS[profile.id] ?? PROFILE_COVERS['eleanor-whitfield']}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm border border-border-subtle rounded-full px-3 py-1 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${profile.status === 'Live' ? 'bg-success' : 'bg-accent-ember'}`} />
                  <span className="text-xs font-medium text-text-primary">{profile.status}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl text-text-primary mb-1">{profile.name}</h3>
                <p className="text-xs font-mono text-text-secondary mb-4">
                  {profile.birthDate.split('-')[0]} — {profile.passingDate.split('-')[0]}
                </p>
                <p className="text-sm text-text-secondary italic mb-6 flex-grow line-clamp-2">
                  "{profile.tagline}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border-subtle">
                  {profile.status === 'Live' && (
                    <Link href={`/qr-result`} className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg rounded-md transition-colors" title="Get QR Code">
                      <QrCode size={18} />
                    </Link>
                  )}
                  <Link href="/create" className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg rounded-md transition-colors" title="Edit Profile">
                    <Settings size={18} />
                  </Link>
                  <div className="flex-grow"></div>
                  <Link href="/memorial" className="legacy-button legacy-button-secondary text-xs px-4 py-1.5">
                    View Page
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mockProfiles.length * 0.1 }}
            className="h-full min-h-[300px]"
          >
            <Link href="/create" className="w-full h-full border-2 border-dashed border-border-subtle rounded-xl flex flex-col items-center justify-center p-8 text-text-secondary hover:bg-surface hover:text-accent-primary hover:border-accent-primary/50 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-bg border border-border-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <h3 className="font-medium text-lg mb-1 group-hover:text-text-primary transition-colors">Start a new story</h3>
              <p className="text-sm text-center">Preserve another memory</p>
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
