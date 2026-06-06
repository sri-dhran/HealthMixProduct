/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ZoomIn, Images } from 'lucide-react';

interface GalleryProps {
  bowlImage: string;
}

export const Gallery: React.FC<GalleryProps> = ({ bowlImage }) => {
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string, desc: string } | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const galleryItems = [
    {
      id: "gal-1",
      category: "product",
      title: "Steaming NutriMix Porridge Bowl",
      desc: "Fresh, steaming healthy multigrain meal served with toasted almonds & raw honey.",
      url: bowlImage
    },
    {
      id: "gal-2",
      category: "ingredients",
      title: "Ancient Organic Millets Sourcing",
      desc: "Sun-dried raw Ragi kernels, foxtail millet, and sorghum grains sorted in small batches.",
      url: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gal-3",
      category: "process",
      title: "Hygienic Slow Wooden Roasting",
      desc: "Controlling griddle roasting temperatures on modern automated machinery to preserve bio-active enzymes.",
      url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gal-4",
      category: "customer",
      title: "Morning Health Toast",
      desc: "Parents and grandparents starting their mornings with deep grain nourishment.",
      url: "https://images.unsplash.com/photo-1511153051129-c5253b3e8a75?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gal-5",
      category: "ingredients",
      title: "Selected California Badam Nuts",
      desc: "Slow roasted premium almonds providing sustained brain vitamins.",
      url: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "gal-6",
      category: "process",
      title: "Airtight Nitrogen-Flushed Packing",
      desc: "Every stand-up pouch is double-sealed in clean, dust-free packaging bays to ensure zero mold.",
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const filteredItems = galleryItems.filter(item => filter === 'all' || item.category === filter);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-[#F9FBE7] py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            Brand Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            Glimpse Inside <span className="text-[#2E7D32]">Our World</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Witness our authentic stone ingredients, state-of-the-art sterile manufacturing, and daily moments of pure family health.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Gallery category filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-bold uppercase tracking-wider font-mono">
          <Images className="w-4.5 h-4.5 text-[#2E7D32]" />
          <span>Filter Photos:</span>
          
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'product', label: 'Culinary Dishes' },
            { id: 'ingredients', label: 'Raw Sourcing' },
            { id: 'process', label: 'Hygiene Process' },
            { id: 'customer', label: 'Happy Families' }
          ].map(opt => (
            <button
              key={opt.id}
              id={`gal-tab-${opt.id}`}
              onClick={() => setFilter(opt.id)}
              className={`py-1.5 px-3 rounded-lg border transition-all ${
                filter === opt.id
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                  : 'bg-white text-neutral-600 border-neutral-100 hover:border-[#2E7D32]/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActivePhoto({ url: item.url, title: item.title, desc: item.desc })}
                className="relative group rounded-3xl overflow-hidden aspect-[4/3] shadow-sm border border-neutral-100 cursor-pointer h-full"
              >
                
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Cover Overlay hover state */}
                <div className="absolute inset-0 bg-[#2E7D32]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <ZoomIn className="w-8 h-8 text-[#F9FBE7] mb-2" />
                  <h4 className="font-sans font-bold text-sm text-[white] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#F9FBE7]/80 mt-1 max-w-xs leading-relaxed hidden sm:block">
                    {item.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Zoom Modal overlay */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl relative flex flex-col"
            >
              
              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-neutral-900/80 text-white rounded-full p-2 hover:bg-neutral-900 shadow-md transition-colors z-20"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid content inside Lightbox */}
              <div className="grid md:grid-cols-12 max-h-[90vh]">
                <div className="md:col-span-8 bg-neutral-100">
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-96 md:h-full max-h-[60vh] md:max-h-[80vh] object-cover"
                  />
                </div>
                <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-center space-y-4 bg-white">
                  <span className="text-[#2E7D32] text-[10px] font-extrabold uppercase font-mono tracking-widest block leading-none">
                    NutriMix Audit Trail
                  </span>
                  <h3 className="font-extrabold text-xl text-neutral-800 leading-snug">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                    {activePhoto.desc}
                  </p>
                  <div className="border-t border-neutral-100 pt-4 flex items-center gap-2 font-mono text-[9px] text-[#2E7D32] font-extrabold uppercase">
                    <span>★ ISO-22000 GMP certified Sourcing facility</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
