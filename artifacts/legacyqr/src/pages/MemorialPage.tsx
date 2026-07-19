import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockProfiles } from '@/lib/mockData';

export default function MemorialPage() {
  const { toast } = useToast();
  const profile = mockProfiles[0]; // Eleanor
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The URL has been copied to your clipboard.",
    });
  };

  // Gallery images — real photos fitting Eleanor's story (Cornwall, roses, books, baking, watercolours, family)
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc51?w=600&h=600&fit=crop&q=80', caption: 'Her rose garden, Edinburgh' },
    { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop&q=80', caption: 'A lifelong reader' },
    { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop&q=80', caption: 'Summers in Cornwall' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80', caption: 'Her famous scones' },
    { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop&q=80', caption: 'Watercolour afternoons' },
    { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop&q=80', caption: 'The cottage garden' },
  ];

  return (
    <div className="w-full bg-surface min-h-screen relative flex flex-col font-sans selection:bg-accent-primary/20">
      
      {/* Cover / Hero Area */}
      <div className="w-full h-[40vh] min-h-[300px] relative bg-gradient-to-b from-bg to-surface overflow-hidden flex items-center justify-center">
        {/* Soft abstract dappled background */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-screen"
             style={{
               background: 'radial-gradient(circle at 20% 30%, var(--color-accent-ember) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--color-accent-primary) 0%, transparent 50%)',
               filter: 'blur(60px)'
             }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 xl:px-24 max-w-4xl -mt-24 relative z-10 pb-24">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-surface shadow-md mx-auto mb-6 overflow-hidden">
             <img
               src="https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=320&h=320&fit=crop&q=85"
               alt="Eleanor Margaret Whitfield"
               className="w-full h-full object-cover"
             />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-4 leading-tight">
            {profile.name}
          </h1>
          <p className="font-mono text-text-secondary tracking-widest text-sm md:text-base mb-6">
            {profile.birthDate.split('-')[0]} <span className="mx-2 font-serif text-lg italic">—</span> {profile.passingDate.split('-')[0]}
          </p>
          <div className="w-12 h-px bg-accent-ember mx-auto mb-6" />
          <p className="text-lg md:text-xl font-serif italic text-text-primary max-w-2xl mx-auto">
            "{profile.tagline}"
          </p>
        </motion.div>

        {/* Share Button Floating */}
        <div className="absolute top-8 right-6 md:right-12 flex items-center gap-4">
          <button onClick={handleShare} className="p-3 bg-surface/80 backdrop-blur border border-border-subtle rounded-full text-text-secondary hover:text-text-primary hover:scale-105 transition-all shadow-sm flex items-center gap-2">
            <Share2 size={18} /> <span className="text-xs font-medium pr-1 hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Biography */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-2xl mx-auto text-center md:text-left"
        >
          <p className="text-lg text-text-primary leading-[1.8] font-serif font-light mb-6">
            Born in a small coastal village in Cornwall, Eleanor found her way to Edinburgh where she touched the lives of countless children as a beloved schoolteacher.
          </p>
          <p className="text-lg text-text-primary leading-[1.8] font-serif font-light mb-6">
            She had a passion for gardening and watercolors, often spending her weekends tending to her roses or capturing the Scottish landscape on canvas. Her home was always filled with the smell of fresh baking and the sound of classical music.
          </p>
          <p className="text-lg text-text-primary leading-[1.8] font-serif font-light">
            But above all, she loved her three children and seven grandchildren, whose lives are brighter for having known her warmth, her quiet wisdom, and her perfect scones.
          </p>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <h2 className="text-center font-serif text-2xl text-text-primary mb-12">Life Milestones</h2>
          <div className="max-w-xl mx-auto relative border-l border-border-subtle/50 ml-4 md:mx-auto md:border-l-0">
            
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-subtle/50 -translate-x-1/2" />
            
            {profile.milestones.map((ms, i) => (
              <div key={i} className={`relative flex items-center mb-10 md:justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Node */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-ember ring-4 ring-surface" />
                
                {/* Content */}
                <div className={`pl-8 md:pl-0 w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <span className="font-mono text-sm text-accent-primary font-medium block mb-1">{ms.year}</span>
                  <p className="text-base text-text-primary">{ms.note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h2 className="text-center font-serif text-2xl text-text-primary mb-12">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-sm overflow-hidden cursor-pointer relative group"
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <p className="text-white text-xs px-3 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <button className="absolute top-6 right-6 p-2 text-text-primary hover:bg-surface rounded-full">
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-3xl aspect-square md:aspect-video rounded-lg shadow-2xl overflow-hidden"
            >
              <img src={lightboxImg} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
