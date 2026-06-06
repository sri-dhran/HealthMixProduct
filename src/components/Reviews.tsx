/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, PenTool, Check, MessageSquareCode } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  
  // Custom Reviews submission state
  const [showAddForm, setShowAddForm] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorRole, setVisitorRole] = useState('');
  const [visitorRating, setVisitorRating] = useState(5);
  const [visitorComment, setVisitorComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredReviews = reviewsList.filter((rev) => {
    return ratingFilter === 'all' || rev.rating === ratingFilter;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorComment.trim()) return;

    const newReview: Review = {
      id: `visitor-rev-${Date.now()}`,
      name: visitorName,
      role: visitorRole || "Verified Buyer",
      rating: visitorRating,
      comment: visitorComment,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop`
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsSubmitted(true);
    setTimeout(() => {
      setShowAddForm(false);
      setIsSubmitted(false);
      setVisitorName('');
      setVisitorRole('');
      setVisitorComment('');
      setVisitorRating(5);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-neutral-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-white py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
              Parent & Physician <span className="text-[#2E7D32]">Reviews</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Trusted by pediatricians, fitness instructors, grandmothers, and over 10,000 health-conscious homes. See actual verified experiences.
            </p>
            <div className="w-24 h-1 bg-[#FFB300] mx-auto md:mx-0 rounded"></div>
          </div>

          <button
            id="write-review-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#2E7D32] text-white hover:bg-[#1f5822] cursor-pointer rounded-2xl py-3 px-5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <PenTool className="w-4 h-4" />
            {showAddForm ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* Collapsible Write a Review Form block */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white border border-neutral-100 p-6 sm:p-8 rounded-3xl shadow-md max-w-xl mx-auto">
                {isSubmitted ? (
                  <div className="text-center py-6 space-y-4">
                    <span className="bg-emerald-50 text-[#2E7D32] w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </span>
                    <h4 className="font-extrabold text-[#2D7C31]">Review Added Successfully!</h4>
                    <p className="text-xs text-neutral-500">Your authentic experience has been recorded and posted in the timeline below.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans">
                    <h3 className="font-extrabold text-neutral-800 text-sm border-b border-neutral-100 pb-3">Share your NutriMix experience</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase">Your full name *</label>
                        <input
                          id="rev-visitor-name"
                          type="text"
                          required
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 text-neutral-800 focus:outline-none focus:border-[#2E7D32]"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase">Who are you? (Role/Profession)</label>
                        <input
                          id="rev-visitor-role"
                          type="text"
                          value={visitorRole}
                          onChange={(e) => setVisitorRole(e.target.value)}
                          placeholder="e.g. Mother of 3 kids / Marathon Runner"
                          className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 text-neutral-800 focus:outline-none focus:border-[#2E7D32]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block">Product Rating</label>
                      <div className="flex gap-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setVisitorRating(star)}
                            className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star className={`w-6 h-6 ${visitorRating >= star ? 'text-[#FFB300] fill-[#FFB300]' : 'text-neutral-200'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase block">Detailed Comment *</label>
                      <textarea
                        id="rev-visitor-comment"
                        required
                        rows={3}
                        value={visitorComment}
                        onChange={(e) => setVisitorComment(e.target.value)}
                        placeholder="Write details about product taste, consistency, daily energy, digests easily, etc..."
                        className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 text-neutral-800 focus:outline-none focus:border-[#2E7D32]"
                      ></textarea>
                    </div>

                    <button
                      id="submit-review-btn"
                      type="submit"
                      className="w-full bg-[#2E7D32] hover:bg-[#1a4b1c] text-white rounded-xl py-3 text-xs font-bold shadow-md transition-colors text-center"
                    >
                      Post Testimonial
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Timeline / Filtering Row */}
        <div className="flex items-center gap-3 border-b border-neutral-200 pb-4 mb-8 text-neutral-500 text-xs font-bold uppercase tracking-wider font-mono">
          <MessageSquareCode className="w-4 h-4 text-[#2E7D32]" />
          <span>Sort testimonials:</span>
          
          <button
            id="rev-filter-all"
            onClick={() => setRatingFilter('all')}
            className={`py-1.5 px-3 rounded-lg ${
              ratingFilter === 'all' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'hover:text-neutral-800'
            }`}
          >
            All
          </button>
          
          <button
            id="rev-filter-5star"
            onClick={() => setRatingFilter(5)}
            className={`py-1.5 px-3 rounded-lg flex items-center gap-1 ${
              ratingFilter === 5 ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'hover:text-neutral-800'
            }`}
          >
            5 <Star className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Reviews Cards masonry/grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-neutral-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                
                {/* Visual decoration - green quote */}
                <span className="absolute top-4 right-6 text-7xl font-serif text-[#2E7D32]/5 select-none leading-none pointer-events-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Rating Stars row */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'text-[#FFB300] fill-[#FFB300]' : 'text-neutral-200'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed italic pr-2 font-sans">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Reviewer Profile Row */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-100 mt-6 select-none shrink-0 border-dashed">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-800 text-xs sm:text-sm leading-tight">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-mono tracking-wide leading-none mt-1 block uppercase">
                      {rev.role}
                    </span>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                      <span className="text-[8px] font-extrabold uppercase font-mono tracking-widest text-emerald-700">Verified Grains Buyer</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
