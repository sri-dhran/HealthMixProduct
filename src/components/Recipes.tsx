/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RECIPES } from '../data';
import { Clock, ChefHat, CheckSquare, ListOrdered, Sparkles, BookOpen } from 'lucide-react';

export const Recipes: React.FC = () => {
  const [activeRecipeId, setActiveRecipeId] = useState<string>(RECIPES[0].id);
  const currentRecipe = RECIPES.find(r => r.id === activeRecipeId) || RECIPES[0];
  
  // Track checked ingredients as cook proceeds
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (key: string) => {
    setCheckedIngredients(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="recipes" className="py-20 bg-neutral-50 relative overflow-hidden">
      {/* Background ambient bubble */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-white py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            Culinary Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            Quick Recipes: <span className="text-[#2E7D32]">Delightful Ways to Serve</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            NutriMix isn't just for traditional porridge. Discover delicious healthy drink smoothies, pancakes, and raw fuel balls that fit modern breakfasts.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Recipe Toggle Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              id={`recipe-pill-${recipe.id}`}
              onClick={() => {
                setActiveRecipeId(recipe.id);
                setCheckedIngredients({});
              }}
              className={`py-2.5 px-5 rounded-2xl text-xs font-bold transition-all duration-200 shadow-sm whitespace-nowrap cursor-pointer border ${
                activeRecipeId === recipe.id
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] scale-102 font-extrabold'
                  : 'bg-white text-neutral-700 hover:bg-[#F9FBE7] border-neutral-100 hover:border-[#2E7D32]/30'
              }`}
            >
              {recipe.category}
            </button>
          ))}
        </div>

        {/* Recipe Content Frame */}
        <div className="bg-white border border-neutral-100 rounded-3xl shadow-md p-6 sm:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRecipe.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-10 items-stretch"
            >
              
              {/* Recipe Left: Food Display */}
              <div className="lg:col-span-4 relative flex flex-col justify-between gap-6">
                <div className="relative h-64 sm:h-72 lg:h-full rounded-2xl overflow-hidden shadow-lg border border-neutral-100 bg-neutral-100">
                  <img
                    src={currentRecipe.image}
                    alt={currentRecipe.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Stamp */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-neutral-800 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-neutral-100">
                    <BookOpen className="w-3.5 h-3.5 text-[#2E7D32]" />
                    {currentRecipe.category}
                  </div>
                </div>

                {/* Micro indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100 flex items-center gap-2.5 select-none font-sans">
                    <Clock className="w-5 h-5 text-[#2E7D32]" />
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold leading-none block">Cook Time:</span>
                      <strong className="text-xs text-neutral-800">{currentRecipe.time}</strong>
                    </div>
                  </div>
                  <div className="bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100 flex items-center gap-2.5 select-none font-sans">
                    <ChefHat className="w-5 h-5 text-[#FFB300]" />
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold leading-none block">Difficulty:</span>
                      <strong className="text-xs text-neutral-800">{currentRecipe.difficulty}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipe Right: Cooking Instructions */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-8 h-full">
                
                {/* Titles */}
                <div className="space-y-2">
                  <h3 className="font-sans font-extrabold text-2xl text-neutral-800 leading-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FFB300] fill-[#FFB300]" />
                    {currentRecipe.name}
                  </h3>
                  <div className="w-16 h-1 bg-[#2E7D32] rounded"></div>
                </div>

                {/* Sub-grid Content: Ingredients checklist vs Cooking steps */}
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Sub Left: Required Ingredients checklist */}
                  <div className="md:col-span-5 bg-neutral-50 p-5 rounded-2xl border border-neutral-100 space-y-4">
                    <h4 className="font-black text-xs text-[#2E7D32] uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                      <CheckSquare className="w-4 h-4" /> Cooking Checklist
                    </h4>
                    
                    <div className="space-y-2.5">
                      {currentRecipe.ingredients.map((ing, idx) => {
                        const uniqueKey = `${currentRecipe.id}-${idx}`;
                        const isChecked = !!checkedIngredients[uniqueKey];
                        return (
                          <label
                            key={idx}
                            className={`flex items-start gap-2.5 cursor-pointer select-none text-xs ${
                              isChecked ? 'text-neutral-400 line-through' : 'text-neutral-700 font-medium'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleIngredient(uniqueKey)}
                              className="accent-[#2E7D32] w-4 h-4 shrink-0 rounded border-neutral-300 focus:ring-[#2E7D32] mt-0.5"
                            />
                            <span>{ing}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sub Right: Cooking Steps */}
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="font-black text-xs text-neutral-800 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-[#2E7D32]" /> Step-by-Step Instructions
                    </h4>

                    <div className="space-y-4 relative pl-2">
                      {/* Vertical line helper */}
                      <div className="absolute top-1 bottom-1 left-2.5 w-0.5 bg-neutral-100"></div>

                      {currentRecipe.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-3.5 relative">
                          {/* Circle step pointer */}
                          <div className="w-5 h-5 font-mono text-[9px] font-bold rounded-full bg-[#2E7D32] text-white flex items-center justify-center shrink-0 shadow-sm z-10 pt-0.5">
                            {idx + 1}
                          </div>
                          
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Helpful Tip banner */}
                <div className="bg-[#F9FBE7]/60 border border-[#2E7D32]/10 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    <strong>Cooking Tip:</strong> Replacing refined cane sugars with brown coconut sugar, pure honey, or soft smashed dates brings out the roasted grain aromas of NutriMix wonderfully.
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
