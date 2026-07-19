import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QRResult() {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://legacyqr.demo';
  const qrUrl = `${origin}/memorial`;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="w-full flex flex-col bg-bg min-h-[80vh]">
      <div className="container mx-auto px-6 md:px-12 py-16 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">
            Their Life Story is live
          </h1>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            Your unique QR code is ready. A permanent link to a beautiful memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-4xl">
          
          {/* QR Display */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="legacy-card p-8 bg-surface mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-xl" />
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
                <QRCodeSVG
                  value={qrUrl}
                  size={240}
                  level="H"
                  fgColor="currentColor"
                  bgColor="#ffffff"
                  className="text-accent-primary"
                  imageSettings={{
                    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23B8763A"><rect width="10" height="10" rx="2" x="2" y="2"/><rect width="10" height="10" rx="2" x="12" y="12"/><rect width="10" height="10" rx="2" x="12" y="2"/><rect width="10" height="10" rx="2" x="2" y="12"/></svg>',
                    x: undefined,
                    y: undefined,
                    height: 48,
                    width: 48,
                    excavate: true,
                  }}
                />
              </div>
              
              <p className="text-center text-xs font-mono text-text-secondary mt-6 select-all">
                LQ-2024-001
              </p>
            </div>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={handleDownload}
                className="legacy-button legacy-button-primary flex-1 py-3 gap-2"
              >
                <Download size={18} />
                {downloaded ? 'Downloaded!' : 'Download PNG'}
              </button>
              <button 
                onClick={handleDownload}
                className="legacy-button legacy-button-secondary flex-1 py-3 gap-2"
              >
                <Download size={18} />
                SVG Vector
              </button>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="legacy-card p-6 bg-surface">
              <h3 className="font-serif text-xl text-text-primary mb-4 flex items-center gap-2">
                <Printer className="text-accent-primary" size={20} />
                How to print this
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-primary text-sm mb-1">Weatherproof Vinyl (Recommended)</h4>
                  <p className="text-sm text-text-secondary">
                    Print on outdoor-grade vinyl with a UV laminate. Minimum size: 5×5cm. Ideal for adhering to smooth stone or existing plaques.
                  </p>
                </div>
                
                <div className="h-px w-full bg-border-subtle" />
                
                <div>
                  <h4 className="font-medium text-text-primary text-sm mb-1">Engraved Metal</h4>
                  <p className="text-sm text-text-secondary mb-2">
                    Provide the SVG file to an engraver. Works beautifully on brass, stainless steel, or anodized aluminum.
                  </p>
                  <a href="#" className="text-xs font-medium text-accent-primary hover:underline">
                    Contact us for professional engraving options →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-surface/50 border border-border-subtle rounded-xl p-4 text-center">
              <p className="text-sm text-text-secondary">
                A copy of this code has also been sent to your email.
              </p>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
