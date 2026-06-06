/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data';
import { ShieldCheck, Heart, Users2, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const brandStats = [
    { number: "10,000+", label: "Happy Families", icon: <Users2 className="w-5 h-5 text-[#2E7D32]" /> },
    { number: "15+", label: "Select Grains", icon: <Award className="w-5 h-5 text-[#FFB300]" /> },
    { number: "0%", label: "Synthetic Additives", icon: <ShieldCheck className="w-5 h-5 text-[#2E7D32]" /> },
    { number: "4.9★", label: "Customer Score", icon: <Heart className="w-5 h-5 text-red-500 fill-red-500/10" /> }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden border-b border-neutral-100">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#F9FBE7]/40 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-[#F9FBE7] py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            Our Guarantees
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            Why Modern Families <span className="text-[#2E7D32]">Trust NutriMix</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Fostering honest, transparent cooking guidelines and sourcing only premium grains to keep your children and grandparents thriving.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Why Choose Us Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {WHY_CHOOSE_US.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#F9FBE7]/25 p-6 rounded-3xl border border-[#2E7D32]/5 hover:border-[#2E7D32]/20 hover:bg-[#F9FBE7]/40 group transition-all"
            >
              <div className="flex gap-4">
                {/* Emoji Emblem */}
                <span className="text-4xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm relative group-hover:scale-110 transition-transform">
                  {promise.icon}
                </span>

                {/* Promises block */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-extrabold text-neutral-800 text-base">{promise.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-sans">{promise.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats counter strip widget */}
        <div className="bg-neutral-900 text-[#F9FBE7] p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          
          {/* Accent decoration overlay */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#2E7D32]/10 rounded-full blur-2xl"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {brandStats.map((stat, idx) => (
              <div key={stat.label} className={`pt-6 lg:pt-0 ${idx === 0 ? 'pt-0' : ''}`}>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    {stat.icon}
                  </div>
                  <strong className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white block">
                    {stat.number}
                  </strong>
                  <span className="text-xs uppercase text-[#F9FBE7]/60 tracking-wider font-mono">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
