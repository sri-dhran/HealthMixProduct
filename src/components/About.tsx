/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Award } from 'lucide-react';

interface AboutProps {
  familyImage: string;
}

export const About: React.FC<AboutProps> = ({ familyImage }) => {
  const brandHighlights = [
    { title: "No Preservatives", desc: "No dynamic shelf-life chemicals or sulfur treatments. Pure shelf-grade stability via slow moisture dehydration." },
    { title: "No Artificial Colors", desc: "Only the breathtaking organic color signatures of sprouted finger ragi, almonds, and ground millets." },
    { title: "Rich in Protein", desc: "Naturally sourced protein peptides from green gram, chickpea germs, and selected badam kernels." },
    { title: "Rich in Dietary Fiber", desc: "Supports prebiotic colonization for comfortable digestion and continuous morning metabolic clearance." },
    { title: "Suitable for Kids & Adults", desc: "From babies starting 6 months old as healthy baby mush, to senior parents seeking easily swallowed vitality drink." }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* About Column Left: Aesthetic Family Image Container */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative p-2 bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <img
                src={familyImage}
                alt="Happy active family enjoying a healthy organic breakfast fueled by NutriMix"
                referrerPolicy="no-referrer"
                className="rounded-2xl w-full aspect-[4/3] object-cover"
              />
              {/* Overlapping trust box */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-2 md:-right-2 bg-[#2E7D32] text-[#F9FBE7] p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block border-4 border-white">
                <div className="flex items-start gap-3">
                  <Award className="w-8 h-8 text-[#FFB300] shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">3 Sibling Generations Tested</h4>
                    <p className="text-[11px] text-[#F9FBE7]/80 mt-1">Starting as a grandmother's private family prescription, now shared globally with modern food hygiene standards.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* About Column Right: Brand Story Text content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[#2E7D32] text-xs font-extrabold uppercase tracking-widest font-mono block">
                The Brand Story of NutriMix
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
                Traditional Recipe Perfected with <span className="text-[#2E7D32]">Modern Nutrition</span>
              </h2>
              <div className="w-20 h-1 bg-[#FFB300] rounded"></div>
            </div>

            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
              <p>
                In an era dominated by processed fast food, refined white sugars, and bulk synthetic fillers, <strong className="text-neutral-800">NutriMix</strong> emerged to restore the integrity of your morning fuel. Inspired by ancestral food prescriptions, our process begins with slow-roasting 15 distinct traditional grains and nuts on warm traditional griddles to peak aromatic moisture levels.
              </p>
              <p>
                By preserving these ancient methods of processing, we avoid using cheap texturizers, binding emulsifiers, or cane sugars entirely. We then partner with senior food scientists to test bio-accessible calcium, prebiotic fibers, and trace iron so your family gets clinically clean, traditional everyday nourishment.
              </p>
            </div>

            {/* Benefit Highlights List */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-neutral-800 text-base">Key Nutrition Standards:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {brandHighlights.map((hl, index) => (
                  <motion.div
                    key={hl.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-2.5 p-3.5 bg-white border border-neutral-100 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-neutral-800 leading-snug">{hl.title}</h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{hl.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
