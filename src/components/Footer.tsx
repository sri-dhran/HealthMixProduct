/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Mail, Send, CheckCircle, Github, Instagram, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3500);
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-900 text-[#F9FBE7] pt-16 pb-8 border-t-2 border-[#FFB300] relative overflow-hidden select-none">
      
      {/* Visual Organic Accent circle */}
      <div className="absolute top-1/4 -right-16 w-64 h-64 bg-[#2E7D32]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" onClick={() => handleScrollTo('#home')} className="flex items-center gap-2 group">
              <div className="bg-[#2E7D32] p-2 rounded-xl text-[#F9FBE7] transition-transform duration-300 group-hover:rotate-12 shadow-sm">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-2xl tracking-tight text-white">
                Nutri<span className="text-[#2E7D32]">Mix</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              NutriMix is a premium, family-friendly organic superfood brand dedicated to restoring genuine, Slow Wood-Roasted ancient grains and millets to modern quick break-time meals. 
            </p>

            {/* Socials Icons */}
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 hover:text-[#FFB300] text-neutral-300 rounded-xl transition-colors" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 hover:text-[#FFB300] text-neutral-300 rounded-xl transition-colors" aria-label="GitHub">
                <Github className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2 & 3: Quick Links & Legal Policies */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white font-mono">Organic Index</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <a href="#products" onClick={(e) => { e.preventDefault(); handleScrollTo('#products'); }} className="hover:text-[#FFB300] transition-colors flex items-center gap-1.5">
                    <Link2 className="w-3 h-3 text-[#2E7D32]" /> Shop Collection
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo('#about'); }} className="hover:text-[#FFB300] transition-colors flex items-center gap-1.5">
                    <Link2 className="w-3 h-3 text-[#2E7D32]" /> Brand Story
                  </a>
                </li>
                <li>
                  <a href="#benefits" onClick={(e) => { e.preventDefault(); handleScrollTo('#benefits'); }} className="hover:text-[#FFB300] transition-colors flex items-center gap-1.5">
                    <Link2 className="w-3 h-3 text-[#2E7D32]" /> Family Benefits
                  </a>
                </li>
                <li>
                  <a href="#ingredients" onClick={(e) => { e.preventDefault(); handleScrollTo('#ingredients'); }} className="hover:text-[#FFB300] transition-colors flex items-center gap-1.5">
                    <Link2 className="w-3 h-3 text-[#2E7D32]" /> Ancient Ingredients
                  </a>
                </li>
                <li>
                  <a href="#recipes" onClick={(e) => { e.preventDefault(); handleScrollTo('#recipes'); }} className="hover:text-[#FFB300] transition-colors flex items-center gap-1.5">
                    <Link2 className="w-3 h-3 text-[#2E7D32]" /> Cooking Recipies
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-white font-mono">Legal Policies</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <a href="#privacy" className="hover:text-[#FFB300] transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-[#FFB300] transition-colors">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#shipping" className="hover:text-[#FFB300] transition-colors">Shipping & Returns</a>
                </li>
                <li>
                  <a href="#refund" className="hover:text-[#FFB300] transition-colors">Refund Guidelines</a>
                </li>
                <li>
                  <a href="#sitemap" className="hover:text-[#FFB300] transition-colors">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Bio Sourcing & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white font-mono">Dynamic Dispatch Alert</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Join our monthly organic health digest list. Receive clinical multigrain porridge nutritional logs and coupon discounts directly.
            </p>

            <AnimatePresence mode="wait">
              {newsletterSuccess ? (
                <div className="bg-emerald-950/40 text-emerald-300 border border-emerald-900 rounded-2xl p-4 text-xs font-sans flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Subscription complete!</strong> Check your inbox for our slow-roasted recipe guide PDF and 15% discount voucher code.
                  </div>
                </div>
              ) : (
                <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="flex gap-2 font-sans pt-1">
                  <div className="relative flex-1">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your secure email..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 pl-8 text-xs text-white focus:outline-none focus:border-[#2E7D32]"
                    />
                    <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
                  </div>
                  
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="bg-[#2E7D32] hover:bg-[#1a4a1c] text-[#F9FBE7] px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center shadow-md transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footnote Copyright block */}
        <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
          <p>© 2026 NutriMix Grains Private Limited. All Traditional Rights Reserved.</p>
          <div className="flex gap-4">
            <span>FSSAI License: #12423003000452</span>
            <span>Made in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
