/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

export const Hero: React.FC<HeroProps> = ({ heroImage }) => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#F9FBE7] to-white pt-8 pb-16 md:py-24 overflow-hidden">
      
      {/* Background Organic blob illustrations with pure CSS */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2E7D32]/5 rounded-full filter blur-3xl -z-10 animate-pulse duration-5000"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#FFB300]/5 rounded-full filter blur-3xl -z-10 animate-pulse duration-3000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Text & CTA Content */}
          <div className="lg:col-span-7 space-y-8 select-none">
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-3.5 py-1.5 rounded-full"
            >
              <Star className="w-4 h-4 text-[#FFB300] fill-[#FFB300]" />
              <span className="text-xs font-semibold text-[#2E7D32] tracking-wider uppercase font-mono">
                100% Traditional Multigrain Superfood
              </span>
            </motion.div>

            {/* Headline and Subheading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-neutral-800 leading-[1.1] tracking-tight"
              >
                Natural Nutrition <br />
                <span className="text-[#2E7D32] inline-block relative">
                  for Every Generation
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#FFB300] rounded-full"></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-neutral-600 max-w-2xl font-sans"
              >
                Made with Millets, Grains, Pulses, Nuts & Traditional Ingredients. Slow-roasted to perfection to nurture toddlers, kids, active couples, and elders.
              </motion.p>
            </div>

            {/* Highlights in Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-xl pb-2"
            >
              <div className="bg-white/60 backdrop-blur-md border border-neutral-100 p-3 rounded-2xl flex items-center gap-2.5 shadow-sm">
                <span className="text-lg">🚫</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 leading-none">Chemical Free</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">No Preservatives</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-neutral-100 p-3 rounded-2xl flex items-center gap-2.5 shadow-sm">
                <span className="text-lg">💪</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 leading-none">Rich Protein</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Build Muscle</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-neutral-100 p-3 rounded-2xl flex items-center gap-2.5 shadow-sm">
                <span className="text-lg">🌾</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 leading-none">Slow Roasted</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Bio-Active Nutrition</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2"
            >
              <button
                id="hero-shop-now-btn"
                onClick={() => handleScrollTo('#products')}
                className="bg-[#2E7D32] text-white hover:bg-[#225c25] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#2E7D32]/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5 animate-bounce" />
                Shop Now
              </button>
              
              <button
                id="hero-learn-more-btn"
                onClick={() => handleScrollTo('#about')}
                className="bg-white text-neutral-700 hover:text-[#2E7D32] border border-neutral-200 hover:border-[#2E7D32] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                Learn Brand Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Micro proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4 border-t border-neutral-100"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                <span className="text-xs text-neutral-500 font-medium">FSSAI Approved Formulation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-5 h-5 text-[#2E7D32]" />
                <span className="text-xs text-neutral-500 font-medium">100% Vegetarian & Safe</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right: Product Packaging Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Frame surrounding the product */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
              className="relative w-full max-w-md md:max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              {/* Product Packaging Image */}
              <img
                src={heroImage}
                alt="NutriMix Premium Multigrain Health Mix Product Packaging Bag"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />

              {/* Decorative Floating Promo Badge */}
              <div className="absolute top-4 right-4 bg-[#FFB300] text-neutral-900 border border-white px-4 py-2 rounded-2xl shadow-lg ring-4 ring-[#FFB300]/20 flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-neutral-700 leading-none">Save 30% Today</span>
                <span className="text-lg font-extrabold tracking-tight leading-tight">Code: FRESH30</span>
              </div>

              {/* Organic tag */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-neutral-200 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2">
                <span className="text-xl">👩‍🍳</span>
                <div>
                  <h4 className="text-[11px] font-extrabold text-neutral-800 uppercase leading-none tracking-wide">Tradition-Inspected</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5 leading-none">Slow Wood Roasting</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
