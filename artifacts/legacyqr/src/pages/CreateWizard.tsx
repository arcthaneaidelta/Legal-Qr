import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Plus, CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Photos' },
  { id: 3, name: 'Their Story' },
  { id: 4, name: 'Preview & Confirm' }
];

export default function CreateWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: 'Eleanor Margaret Whitfield',
    birthDate: '1941-03-14',
    passingDate: '2023-11-02',
    tagline: 'Devoted mother, avid reader, maker of perfect scones',
    bio: 'Born in a small coastal village in Cornwall, Eleanor found her way to Edinburgh where she touched the lives of countless children as a beloved schoolteacher.',
    milestones: [{ year: '1964', note: 'Married David Whitfield' }],
    photos: [] as string[]
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const finish = () => setLocation('/checkout');

  // Photo upload simulation
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, photos: [...prev.photos, url] }));
    }
  };
  const removePhoto = (index: number) => {
    setFormData(prev => {
      const newPhotos = [...prev.photos];
      newPhotos.splice(index, 1);
      return { ...prev, photos: newPhotos };
    });
  };

  const addMilestone = () => {
    setFormData(prev => ({ ...prev, milestones: [...prev.milestones, { year: '', note: '' }] }));
  };

  return (
    <div className="w-full bg-bg min-h-[90vh] pb-24">
      {/* Wizard Header */}
      <div className="bg-surface border-b border-border-subtle sticky top-20 z-40">
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-text-primary">Create a Life Story</h2>
            <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text-primary flex items-center gap-1">
              <X size={16} /> Cancel
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center gap-2 text-sm font-medium ${currentStep >= step.id ? 'text-accent-primary' : 'text-text-secondary opacity-50'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep >= step.id ? 'bg-accent-primary text-surface' : 'bg-border-subtle text-text-primary'}`}>
                    0{step.id}
                  </span>
                  <span className="hidden md:inline">{step.name}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-grow h-px mx-2 ${currentStep > step.id ? 'bg-accent-primary' : 'bg-border-subtle'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard Content */}
      <div className="container mx-auto px-6 md:px-12 py-8 max-w-3xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="legacy-card p-6 md:p-8 bg-surface"
          >
            
            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-text-primary mb-6">The Essentials</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                    className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Birth Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.birthDate}
                        onChange={e => setFormData(p => ({...p, birthDate: e.target.value}))}
                        className="w-full bg-bg border border-border-subtle rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Passing Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.passingDate}
                        onChange={e => setFormData(p => ({...p, passingDate: e.target.value}))}
                        className="w-full bg-bg border border-border-subtle rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Short Tagline <span className="text-text-secondary font-normal">(max 120 chars)</span></label>
                  <input 
                    type="text"
                    maxLength={120}
                    value={formData.tagline}
                    onChange={e => setFormData(p => ({...p, tagline: e.target.value}))}
                    className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-text-primary"
                    placeholder="e.g. Beloved mother, avid gardener..."
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-text-primary mb-6">Gallery</h3>
                
                <div className="border-2 border-dashed border-border-subtle rounded-xl p-8 text-center bg-bg relative hover:bg-surface transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-accent-primary" size={24} />
                  </div>
                  <p className="font-medium text-text-primary mb-1">Click or drag images to upload</p>
                  <p className="text-sm text-text-secondary">JPG, PNG up to 10MB each</p>
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                    {formData.photos.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border-subtle group">
                        <img src={src} alt="Uploaded" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 bg-bg/80 backdrop-blur rounded p-1 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Their Story */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-text-primary mb-6">The Narrative</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Biography</label>
                  <textarea 
                    rows={8}
                    value={formData.bio}
                    onChange={e => setFormData(p => ({...p, bio: e.target.value}))}
                    className="w-full bg-bg border border-border-subtle rounded-md px-4 py-3 font-serif text-text-primary leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-primary/50 resize-y"
                    placeholder="Tell their story..."
                  />
                </div>
                
                <div className="pt-4 border-t border-border-subtle">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-text-primary">Timeline & Milestones (Optional)</label>
                    <button onClick={addMilestone} className="text-xs text-accent-primary hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add Milestone
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.milestones.map((ms, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <input 
                          type="text" 
                          placeholder="Year" 
                          value={ms.year}
                          onChange={e => {
                            const newM = [...formData.milestones];
                            newM[i].year = e.target.value;
                            setFormData(p => ({...p, milestones: newM}));
                          }}
                          className="w-24 bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        />
                        <input 
                          type="text" 
                          placeholder="Event description..." 
                          value={ms.note}
                          onChange={e => {
                            const newM = [...formData.milestones];
                            newM[i].note = e.target.value;
                            setFormData(p => ({...p, milestones: newM}));
                          }}
                          className="flex-grow bg-bg border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Preview */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-text-primary mb-2">Review your page</h3>
                <p className="text-text-secondary text-sm mb-6">This is a preview of how the memorial will look. You can always edit this later.</p>
                
                <div className="border border-border-subtle rounded-xl overflow-hidden bg-bg max-h-[500px] overflow-y-auto">
                  {/* Mini Preview rendering */}
                  <div className="p-8 text-center border-b border-border-subtle bg-gradient-to-br from-accent-primary/5 to-surface">
                    <h1 className="font-serif text-3xl text-text-primary mb-2">{formData.name || 'Name'}</h1>
                    <p className="font-mono text-sm text-text-secondary mb-4">{formData.birthDate} — {formData.passingDate}</p>
                    <p className="italic text-text-secondary max-w-md mx-auto">{formData.tagline}</p>
                  </div>
                  <div className="p-8 bg-surface">
                    <div className="max-w-xl mx-auto">
                      <p className="font-serif text-text-primary leading-relaxed whitespace-pre-wrap mb-8">
                        {formData.bio || 'Biography content...'}
                      </p>
                      
                      {formData.milestones.length > 0 && formData.milestones[0].year && (
                        <div className="border-l-2 border-accent-ember/30 pl-4 py-2 space-y-4">
                          {formData.milestones.map((ms, i) => ms.year && (
                            <div key={i}>
                              <span className="font-mono text-xs font-bold text-accent-primary block mb-1">{ms.year}</span>
                              <span className="text-sm text-text-secondary">{ms.note}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Wizard Footer Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`legacy-button legacy-button-secondary px-5 py-2 gap-2 ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {currentStep < 4 ? (
            <button onClick={nextStep} className="legacy-button legacy-button-primary px-6 py-2 gap-2 ml-auto">
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={finish} className="legacy-button legacy-button-primary px-6 py-2 gap-2 ml-auto bg-success text-surface hover:bg-success/90">
              Looks Good — Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
