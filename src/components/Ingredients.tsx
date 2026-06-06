/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INGREDIENTS } from '../data';
import { Check, ClipboardList, Info, Sparkles } from 'lucide-react';

export const Ingredients: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>(INGREDIENTS[0].id);
  const currentIng = INGREDIENTS.find(i => i.id === selectedIngredient) || INGREDIENTS[0];

  const nutritionTableData = [
    { nutrient: "Calories / Energy", qtyClassic: "115 kcal", qtyProtein: "128 kcal", qtyKids: "118 kcal", value: "6%" },
    { nutrient: "Dietary Protein", qtyClassic: "4.2 g", qtyProtein: "8.2 g", qtyKids: "4.8 g", value: "14%" },
    { nutrient: "Carbohydrates", qtyClassic: "22.5 g", qtyProtein: "17.4 g", qtyKids: "21.2 g", value: "8%" },
    { nutrient: "Healthy Fats", qtyClassic: "1.2 g", qtyProtein: "3.2 g", qtyKids: "1.8 g", value: "3%" },
    { nutrient: "Dietary Prebiotic Fiber", qtyClassic: "3.1 g", qtyProtein: "4.2 g", qtyKids: "3.4 g", value: "16%" },
    { nutrient: "Calcium", qtyClassic: "95 mg", qtyProtein: "110 mg", qtyKids: "140 mg", value: "15%" },
    { nutrient: "Iron", qtyClassic: "1.8 mg", qtyProtein: "2.9 mg", qtyKids: "2.4 mg", value: "20%" },
    { nutrient: "Zinc", qtyClassic: "0.8 mg", qtyProtein: "1.6 mg", qtyKids: "0.9 mg", value: "10%" },
    { nutrient: "Magnesium", qtyClassic: "42 mg", qtyProtein: "68 mg", qtyKids: "38 mg", value: "18%" }
  ];

  return (
    <section id="ingredients" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-[#F9FBE7] py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            What's Inside
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            10 Premium Ingredients <span className="text-[#2E7D32]">Grown with Integrity</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Handpicked, thoroughly cleaned, slow-graded grains and nutrient-dense nuts that make NutriMix a powerhouse of minerals and vitamins.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Outer Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Beautiful Ingredient selection wheel/grid */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-bold text-neutral-800 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2E7D32]" />
              Tap on any ingredient to learn nutritional value
            </h3>
            
            {/* Ingredients Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {INGREDIENTS.map((ing) => {
                const isSelected = ing.id === selectedIngredient;
                return (
                  <button
                    key={ing.id}
                    id={`ing-btn-${ing.id}`}
                    onClick={() => setSelectedIngredient(ing.id)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 border ${
                      isSelected
                        ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-lg shadow-[#2E7D32]/10 scale-102'
                        : 'bg-[#F9FBE7]/40 text-neutral-700 hover:bg-[#F9FBE7] border-neutral-100 hover:border-[#2E7D32]/30'
                    }`}
                  >
                    <span className="text-2xl">{ing.icon}</span>
                    <span className="text-xs font-bold leading-none">{ing.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Display Box for Selected Ingredient */}
            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIng.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-12 gap-6 items-center"
                >
                  {/* Photo inside detail card */}
                  <div className="sm:col-span-5 h-44 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={currentIng.image}
                      alt={currentIng.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="sm:col-span-7 space-y-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentIng.icon}</span>
                      <div>
                        <h4 className="font-sans font-extrabold text-xl text-neutral-800 leading-none">
                          {currentIng.name}
                        </h4>
                        {currentIng.tamilName && (
                          <span className="text-[10px] text-neutral-400 font-mono block mt-1 uppercase tracking-wide">
                            Botanical / Traditional: {currentIng.tamilName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {currentIng.description}
                    </p>

                    <div className="pt-2 bg-[#2E7D32]/5 p-3 rounded-xl border border-[#2E7D32]/10">
                      <h5 className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider font-mono">Core Health Support:</h5>
                      <p className="text-xs text-neutral-700 mt-1 flex items-start gap-1.5 font-sans">
                        <Check className="w-4 h-4 shrink-0 text-[#2E7D32] mt-0.5" />
                        {currentIng.benefits}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Column Right: Scientific Nutritional Information Table */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-neutral-800 p-5 rounded-2xl shadow-lg relative font-sans">
              
              {/* Table header mimicking real FDA facts label */}
              <div className="border-b-4 border-neutral-800 pb-3 mb-3">
                <div className="flex items-center gap-2 text-[#2E7D32]">
                  <ClipboardList className="w-5 h-5" />
                  <span className="text-[10px] font-extrabold uppercase font-mono tracking-widest leading-none">Registered Health Data</span>
                </div>
                <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mt-1">Nutrition Facts</h3>
                <p className="text-xs text-neutral-500 mt-1">Values based on dry powder mixture sample of 30g serving size.</p>
              </div>

              {/* Servings block */}
              <div className="border-b border-neutral-200 pb-1.5 mb-1.5 flex justify-between font-mono text-[11px] text-neutral-600">
                <span>Serving Size</span>
                <strong>30g (Approx. 2 tbsp)</strong>
              </div>

              {/* Table titles */}
              <div className="grid grid-cols-12 gap-1 border-b-2 border-neutral-800 pb-1 mb-2 text-neutral-500 font-bold uppercase tracking-wider font-mono text-[9px]">
                <div className="col-span-5">Core Nutrient</div>
                <div className="col-span-2 text-right">Classic</div>
                <div className="col-span-2 text-right">Protein</div>
                <div className="col-span-2 text-right">Kids</div>
                <div className="col-span-1 text-right">DV%*</div>
              </div>

              {/* Table rows */}
              <div className="space-y-2 border-b-4 border-neutral-800 pb-2 mb-2">
                {nutritionTableData.map((row, index) => (
                  <div
                    key={row.nutrient}
                    className={`grid grid-cols-12 gap-1 text-xs pb-1.5 border-b border-neutral-100 ${
                      index < 2 ? 'font-bold text-neutral-900 border-b-2' : 'text-neutral-700'
                    }`}
                  >
                    <div className="col-span-5 flex items-center gap-1">
                      {row.nutrient}
                    </div>
                    <div className="col-span-2 text-right font-mono">{row.qtyClassic}</div>
                    <div className="col-span-2 text-right font-mono text-[#2E7D32]">{row.qtyProtein}</div>
                    <div className="col-span-2 text-right font-mono text-[#FFB300]">{row.qtyKids}</div>
                    <div className="col-span-1 text-right text-[10px] font-mono text-neutral-500">{row.value}</div>
                  </div>
                ))}
              </div>

              {/* Footer footnotes */}
              <div className="text-[10px] text-neutral-400 leading-snug">
                <div className="flex items-start gap-1 pb-1">
                  <Info className="w-3 h-3 shrink-0 mt-0.5 text-neutral-400" />
                  <p>* The Daily Value (DV)% represents intake recommendations set by Indian Pediatric and nutritional food standards.</p>
                </div>
                <p className="font-mono text-[8px] uppercase tracking-wide">NutriMix Quality assurance laboratory report no: FSSAI-2026-NUTRIMIX009.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
