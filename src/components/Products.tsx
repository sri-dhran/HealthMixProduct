/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { getImageUrl } from '../utils/imageUrl';
import { Star, Flame, ShoppingCart, Percent, ClipboardSignature, Search, RefreshCw, Sparkles } from 'lucide-react';

interface ProductsProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ searchValue, onSearchChange }) => {
  const { addToCart, setCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Track selected weights per product to support dynamic pricing
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '500g' | '1kg'>>({
    'prod-classic': '500g',
    'prod-kids': '500g',
    'prod-millet': '500g',
    'prod-protein': '500g'
  });

  const categories = [
    { id: 'all', label: 'All Mixtures' },
    { id: 'classic', label: 'Classic Grains' },
    { id: 'kids', label: 'For Growing Kids' },
    { id: 'millet', label: 'Millet Superfood' },
    { id: 'protein', label: 'High Protein Athlete' }
  ];

  const handleSizeChange = (productId: string, size: '500g' | '1kg') => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  // Filter & Search Logic
  // 'kids' tab shows ALL products — all health mixes are suitable for growing kids
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'all' || selectedCategory === 'kids' || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchValue.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                          product.benefits.some(b => b.toLowerCase().includes(searchValue.toLowerCase())) ||
                          product.ingredients.some(i => i.toLowerCase().includes(searchValue.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchValue]);

  const handleBuyNow = (product: Product, size: string) => {
    addToCart(product, 1, size);
    setCartOpen(true);
  };

  const getPrice = (product: Product, size: '500g' | '1kg') => {
    const isOneKg = size === '1kg';
    const originalPrice = isOneKg ? product.originalPrice * 1.85 : product.originalPrice;
    const finalPrice = isOneKg ? product.price * 1.85 : product.price;
    return {
      finalPrice: Number(finalPrice.toFixed(2)),
      originalPrice: Number(originalPrice.toFixed(2))
    };
  };

  return (
    <section id="products" className="py-20 bg-[#F9FBE7]/10 scroll-mt-10 relative">
      <div className="absolute top-1/3 left-0 w-44 h-44 bg-amber-100/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-emerald-50 py-1 px-3 rounded-full border border-emerald-100/40 shadow-sm inline-block">
            Verified Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            Shop Our Premium <span className="text-[#2E7D32]">NutriMix Collection</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Select standard 100% natural, freshly slow-roasted blends customized for specific digestive, pediatric, and bodybuilding requirements.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Categories + Search Bar Control Panel */}
        <div className="bg-white border border-neutral-100 p-4 sm:p-6 rounded-3xl shadow-sm mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          {/* Category Filter Pills scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none shrink-0 pr-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2E7D32] text-[#F9FBE7] shadow-md shadow-[#2E7D32]/10'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-[#F9FBE7] hover:text-[#2E7D32]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Inputs inside container */}
          <div className="relative w-full md:max-w-sm">
            <input
              id="catalog-search-input"
              type="text"
              placeholder="Filter products or ingredients..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-50 text-sm border border-neutral-200 rounded-2xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#2E7D32] text-neutral-800 transition-colors"
            />
            <Search className="w-4.5 h-4.5 text-neutral-400 absolute left-3.5 top-3" />
            
            {searchValue && (
              <button
                id="clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-3 text-xs font-mono font-bold text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Kids banner — shown when 'For Growing Kids' tab is active */}
        {selectedCategory === 'kids' && (
          <div className="mb-8 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/60 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-4xl shrink-0">🌱</span>
            <div>
              <h3 className="font-extrabold text-neutral-800 text-base mb-1">All 4 Health Mixes — Perfect for Growing Kids!</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every NutriMix blend is crafted with clean, natural ingredients — no preservatives, no artificial colors, no refined sugar. 
                Rich in <strong>calcium, iron, and dietary fiber</strong>, each mix supports healthy bone growth, brain development, and sustained energy for active children.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['✅ No Preservatives', '✅ Rich in Calcium', '✅ High Dietary Fiber', '✅ Zero Artificial Colors', '✅ Suitable for All Ages'].map(tag => (
                  <span key={tag} className="text-xs font-semibold bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active search filter states */}
        {searchValue && (
          <div className="text-sm text-neutral-500 mb-6 flex items-center gap-2">
            <span>Filtering search catalog for:</span>
            <strong className="bg-[#FFB300]/20 text-neutral-800 px-2.5 py-0.5 rounded-lg border border-[#FFB300]/30 font-mono">
              "{searchValue}"
            </strong>
            <button
              id="reset-filter-btn"
              onClick={() => { onSearchChange(''); setSelectedCategory('all'); }}
              className="text-xs text-[#2E7D32] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Reset filters
            </button>
          </div>
        )}

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl border border-dashed border-neutral-200 p-8 max-w-lg mx-auto shadow-sm"
          >
            <div className="text-4xl mb-4">🌾</div>
            <h3 className="font-bold text-neutral-800 text-base">No Matching Mixtures Found</h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              We couldn't locate any products matching your search keyword. Try searching for raw ingredients like "ragi", "almond", or select "All Mixtures" above.
            </p>
            <button
              id="empty-reset-btn"
              onClick={() => { onSearchChange(''); setSelectedCategory('all'); }}
              className="mt-6 bg-[#2E7D32] text-white py-2 px-5 rounded-xl text-xs font-bold shadow-md hover:bg-[#205723]"
            >
              Reset Search Filter
            </button>
          </motion.div>
        )}

        {/* Products Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const currentSize = selectedSizes[product.id] || '500g';
              const { finalPrice, originalPrice } = getPrice(product, currentSize);
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.08)" }}
                  className="bg-white rounded-3xl overflow-hidden border border-neutral-100 flex flex-col justify-between shadow-sm relative group"
                >
                  
                  {/* Decorative Special Tag */}
                  {product.category === 'kids' && (
                    <div className="absolute top-4 left-4 bg-amber-400 text-neutral-900 font-mono text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm flex items-center gap-1 border border-white">
                      <Sparkles className="w-2.5 h-2.5 fill-current" /> Sprouted & Tasty
                    </div>
                  )}
                  {product.category === 'protein' && (
                    <div className="absolute top-4 left-4 bg-teal-500 text-white font-mono text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm flex items-center gap-1 border border-white animate-pulse">
                      <Flame className="w-2.5 h-2.5 fill-current" /> Active Athlete Peak
                    </div>
                  )}

                  {/* Thumbnail / Image with Hover details block */}
                  <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Size selectors overlaid */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-xl p-1.5 shadow-md flex gap-1 z-10 border border-white">
                      <button
                        id={`size-500g-${product.id}`}
                        onClick={() => handleSizeChange(product.id, '500g')}
                        className={`px-3 py-1 text-[10px] font-extrabold rounded-lg transition-all ${
                          currentSize === '500g'
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        500g
                      </button>
                      <button
                        id={`size-1kg-${product.id}`}
                        onClick={() => handleSizeChange(product.id, '1kg')}
                        className={`px-3 py-1 text-[10px] font-extrabold rounded-lg transition-all relative ${
                          currentSize === '1kg'
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        1kg
                        {currentSize !== '1kg' && (
                          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[7px] px-1 rounded-full py-0">
                            -15%
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Customer Rating layer */}
                    <div className="absolute bottom-3 right-3 bg-neutral-900/80 text-[#FFB300] backdrop-blur-md flex items-center gap-1 py-1 px-2.5 rounded-xl border border-white/20 select-none font-mono text-[10px]" title="Customer Score">
                      <Star className="w-3.5 h-3.5 fill-[#FFB300] stroke-none" />
                      <strong>{product.rating}</strong>
                      <span className="text-white/60">({product.reviewCount})</span>
                    </div>

                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    
                    {/* Info text block */}
                    <div className="space-y-2">
                      <span className="text-[#2E7D32] text-[10px] font-extrabold uppercase font-mono tracking-widest block leading-none">
                        {product.tagline}
                      </span>
                      <h3 className="font-extrabold text-lg text-neutral-800 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Ingredients chip lists */}
                    <div className="border-t border-b border-neutral-100 py-3">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wide mb-1 flex items-center gap-1 select-none">
                        <ClipboardSignature className="w-3.5 h-3.5" /> Ingredient Blend:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.ingredients.slice(0, 5).map((ing, i) => (
                          <span key={i} className="bg-[#F9FBE7] text-[#2E7D32] border border-[#2E7D32]/10 rounded-lg px-2 py-0.5 text-[9px] font-bold">
                            {ing}
                          </span>
                        ))}
                        {product.ingredients.length > 5 && (
                          <span className="bg-neutral-50 text-neutral-400 rounded-lg px-2 py-0.5 text-[9px] font-bold">
                            +{product.ingredients.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dynamic Price & Checkout Actions column */}
                    <div>
                      {/* Price row */}
                      <div className="flex items-baseline justify-between mb-3.5 select-none">
                        <span className="text-[10px] uppercase font-bold text-neutral-400">Total Price:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-300 line-through text-xs sm:text-sm font-semibold font-mono">
                            ₹{originalPrice}
                          </span>
                          <span className="text-[#2E7D32] font-black font-mono text-lg tracking-tight">
                            ₹{finalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id={`add-cart-btn-${product.id}`}
                          onClick={() => addToCart(product, 1, currentSize)}
                          className="bg-[#F9FBE7] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white border border-[#2E7D32]/30 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5"
                          title="Add to shopping cart basket"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                        
                        <button
                          id={`buy-now-btn-${product.id}`}
                          onClick={() => handleBuyNow(product, currentSize)}
                          className="bg-[#2E7D32] text-white hover:bg-[#1a4a1c] text-xs font-bold py-2.5 rounded-xl transition-all duration-300 shadow-sm shadow-[#2E7D32]/10"
                        >
                          Buy Now
                        </button>
                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
