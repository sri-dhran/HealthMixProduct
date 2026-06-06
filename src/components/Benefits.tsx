/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Activity, ShieldPlus, Flame, Apple, Dumbbell, Flower2, HeartHandshake } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitList = [
    {
      title: "Boosts Energy",
      desc: "Complex carbohydrate chains release sugars slowly, providing consistent focus-stamina for up to 4 full morning hours.",
      icon: <Flame className="w-6 h-6 text-[#FFB300]" />,
      bg: "bg-amber-50 border-amber-100",
      iconBg: "bg-amber-100/80"
    },
    {
      title: "Improves Digestion",
      desc: "High content of whole grain kodo & pearl millets feeds good gut bacteria, healing flatulence and continuous bloating.",
      icon: <Activity className="w-6 h-6 text-[#2E7D32]" />,
      bg: "bg-emerald-50 border-emerald-100",
      iconBg: "bg-emerald-100/80"
    },
    {
      title: "Supports Immunity",
      desc: "Crucial trace elements like Zinc, Copper, and Manganese shield children and old folks against seasonal virus bugs.",
      icon: <ShieldPlus className="w-6 h-6 text-[#2E7D32]" />,
      bg: "bg-teal-50 border-teal-100",
      iconBg: "bg-teal-100/80"
    },
    {
      title: "Rich in Protein",
      desc: "Delivers complete vegetarian essential amino acids. Supports cellular repair, weight maintenance, and lean growth.",
      icon: <Dumbbell className="w-6 h-6 text-[#2E7D32]" />,
      bg: "bg-green-50 border-green-100",
      iconBg: "bg-[#2E7D32]/15"
    },
    {
      title: "High Fiber",
      desc: "Lowers toxic glycemic spikes while optimizing modern cholesterol profiles naturally without artificial synthetic seeds.",
      icon: <Apple className="w-6 h-6 text-[#FFB300]" />,
      bg: "bg-yellow-50 border-yellow-100",
      iconBg: "bg-yellow-100/80"
    },
    {
      title: "Strengthens Bones",
      desc: "Dense concentrations of ragi-calcium construct healthy bone architecture, preventing elderly hip joint fractures.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50 border-indigo-100",
      iconBg: "bg-indigo-100/80"
    },
    {
      title: "Natural Ingredients",
      desc: "Hand-harvested pulses, stone-milled grains, cardamoms, almonds. Completely allergen-friendly, untainted plant power.",
      icon: <Flower2 className="w-6 h-6 text-emerald-600" />,
      bg: "bg-lime-50 border-lime-100",
      iconBg: "bg-lime-100/80"
    },
    {
      title: "Daily Nutrition Support",
      desc: "One single steaming brass tumbler equips your body with 80% of necessary daily trace elements in an easy meal.",
      icon: <HeartHandshake className="w-6 h-6 text-[#2E7D32]" />,
      bg: "bg-emerald-50 border-emerald-100",
      iconBg: "bg-emerald-100/80"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 60, damping: 12 }
    }
  };

  return (
    <section id="benefits" className="py-20 bg-[#F9FBE7]/30 border-y border-[#F9FBE7] relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/20 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-white py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            Proven Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            How NutriMix Powers Your <span className="text-[#2E7D32]">Daily Wellness</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Scientifically balanced multigrain formulas that deliver profound benefits, empowering childhood milestones, youthful active stamina, and robust elderly longevity.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefitList.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
              className={`p-6 bg-white border border-neutral-100 rounded-2xl flex flex-col items-start gap-4 transition-all duration-200 shadow-sm relative overflow-hidden`}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#2E7D32] opacity-20"></div>

              {/* Icon Holder */}
              <div className={`p-3 rounded-xl ${benefit.iconBg} flex items-center justify-center shrink-0`}>
                {benefit.icon}
              </div>

              {/* Text Area */}
              <div className="space-y-2">
                <h3 className="font-bold text-neutral-800 text-base font-sans">{benefit.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
