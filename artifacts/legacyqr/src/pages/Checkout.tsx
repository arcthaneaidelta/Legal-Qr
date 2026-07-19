import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, CreditCard, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const formatCard = (val: string) => {
    return val.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Fake processing delay
    setTimeout(() => {
      setLocation('/qr-result');
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col bg-bg min-h-[90vh] py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-text-primary mb-2">Complete your purchase</h1>
          <p className="text-text-secondary flex items-center justify-center gap-2">
            <Lock size={14} /> Secure checkout process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Order Summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="legacy-card p-6 bg-surface">
              <h3 className="font-medium text-text-primary mb-4 pb-4 border-b border-border-subtle">Order Summary</h3>
              
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-medium text-sm text-text-primary">Single Life Story Plan</p>
                  <p className="text-xs text-text-secondary">Permanent hosting + QR Plaque</p>
                </div>
                <p className="font-medium text-sm text-text-primary">£49.00</p>
              </div>
              
              <div className="flex justify-between mb-4">
                <p className="text-sm text-text-secondary">Standard Shipping</p>
                <p className="text-sm text-text-secondary">Free</p>
              </div>
              
              <div className="pt-4 border-t border-border-subtle flex justify-between items-center mb-6">
                <p className="font-serif text-lg text-text-primary">Total</p>
                <p className="font-serif text-xl text-text-primary">£49.00</p>
              </div>
              
              <div className="bg-bg rounded p-4 border border-border-subtle">
                <ul className="space-y-2">
                  <li className="flex gap-2 items-center text-xs text-text-secondary"><Check size={14} className="text-success" /> One-time payment</li>
                  <li className="flex gap-2 items-center text-xs text-text-secondary"><Check size={14} className="text-success" /> Money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <form onSubmit={handleCheckout} className="legacy-card p-6 md:p-8 bg-surface">
              <h3 className="font-medium text-text-primary mb-6 flex items-center gap-2">
                <CreditCard size={18} className="text-accent-primary" />
                Payment Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cardholder Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Card Number</label>
                  <input 
                    required 
                    type="text" 
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    className="w-full font-mono tracking-wider bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Expiry Date</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">CVC</label>
                    <input 
                      required 
                      type="password" 
                      placeholder="•••"
                      maxLength={4}
                      className="w-full bg-bg border border-border-subtle rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  disabled={processing}
                  type="submit" 
                  className="legacy-button legacy-button-primary w-full py-4 text-base relative"
                >
                  {processing ? (
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-surface"
                    >
                      <Check className="text-surface" /> Processing...
                    </motion.div>
                  ) : (
                    "Complete Purchase — £49.00"
                  )}
                </button>
                <p className="text-center text-xs text-text-secondary mt-4">
                  By completing this purchase, you agree to our Terms of Service.
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
