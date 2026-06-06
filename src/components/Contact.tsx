/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircleCode, CheckCircle, Handshake } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Query');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Thank you, ${name}! Your query regarding "${subject}" has been successfully received. Our packaging managers will reach out to you at ${email} shortly!`);
      
      // Clear inputs
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5 text-[#2E7D32]" />,
      title: "Phone Support",
      value: "+1-800-555-NUTRIMIX",
      link: "tel:+18005556887",
      subText: "Mon-Sat, 9AM to 6PM IST"
    },
    {
      icon: <Mail className="w-5 h-5 text-[#2E7D32]" />,
      title: "Email Support",
      value: "care@nutrimixorganic.com",
      link: "mailto:care@nutrimixorganic.com",
      subText: "Average reply time: 3 hours"
    },
    {
      icon: <MessageCircleCode className="w-5 h-5 text-emerald-600" />,
      title: "WhatsApp Direct",
      value: "+91 98450 12345",
      link: "https://wa.me/919845012345?text=Hello%20NutriMix!%20I%20have%20a%20question%20about%20your%20organic%20health%20mixtures.",
      subText: "Rapid response chat help"
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#FFB300]" />,
      title: "Traditional Mill",
      value: "NutriMix Grains Private Limited, Plot 45A, Traditional Food SIDCO Industrial Estate, Coimbatore, TN, India",
      link: "https://maps.google.com",
      subText: "Open for plant audits & visits"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-neutral-50 relative overflow-hidden">
      
      {/* Background decoration with CSS */}
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#F9FBE7]/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#2E7D32] text-xs font-mono font-extrabold uppercase tracking-widest bg-white py-1 px-3 rounded-full border border-neutral-100 shadow-sm inline-block">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
            Start Your Health journey. <span className="text-[#2E7D32]">Contact Us</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Have questions about grain sprouting, toddler serving sizes, bulk orders, or custom fitness diets? Write to our certified clinical dietitians.
          </p>
          <div className="w-24 h-1 bg-[#FFB300] mx-auto rounded"></div>
        </div>

        {/* Outer Grid split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Contact Details & Leaf illustration */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#2E7D32] text-[#F9FBE7] p-8 rounded-3xl shadow-lg relative overflow-hidden">
              
              {/* Background leaf overlay */}
              <div className="absolute bottom-[-50px] right-[-50px] text-[180px] text-white/5 font-bold leading-none select-none pointer-events-none">
                🌾
              </div>

              <div className="space-y-4 relative z-10">
                <h3 className="font-sans font-extrabold text-2xl tracking-tight flex items-center gap-2">
                  <Handshake className="text-[#FFB300]" />
                  Direct Brand Touchpoints
                </h3>
                <p className="text-xs text-[#F9FBE7]/80 leading-relaxed font-sans">
                  We are highly committed to providing transparent packaging guidelines. Skip intermediaries and dial our mill office directly.
                </p>
              </div>
            </div>

            {/* Icons list cards */}
            <div className="space-y-4">
              {contactOptions.map((opt) => (
                <a
                  key={opt.title}
                  href={opt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 p-4 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow group cursor-pointer"
                >
                  {/* Icon holder */}
                  <span className="bg-[#F9FBE7] w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {opt.icon}
                  </span>

                  {/* Descriptions block */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-neutral-800 text-xs sm:text-sm">{opt.title}</h4>
                    <p className="text-xs text-neutral-700 font-mono select-all leading-snug break-all sm:break-normal">
                      {opt.value}
                    </p>
                    <span className="text-[10px] text-neutral-400 block font-sans">
                      {opt.subText}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column Right: Validated Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-neutral-100 p-6 sm:p-10 rounded-3xl shadow-xl relative">
              <AnimatePresence mode="wait">
                {successMessage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="text-center py-10 space-y-5"
                  >
                    <div className="bg-emerald-50 text-[#2E7D32] w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-extrabold text-2xl text-neutral-800">Query Received Safely!</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
                      {successMessage}
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={() => setSuccessMessage(null)}
                      className="bg-[#2E7D32] text-white hover:bg-[#1f5622] py-2.5 px-6 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                    <h3 className="text-lg font-extrabold text-neutral-800 border-b border-neutral-100 pb-3">
                      Drop us an organic line
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block">Your name *</label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priya Iyer"
                          className="w-full bg-neutral-50 text-xs sm:text-sm border border-neutral-200 rounded-xl py-2.5 px-4 text-neutral-800 focus:outline-none focus:border-[#2E7D32] transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block">Email Address *</label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. priya@gamil.com"
                          className="w-full bg-neutral-50 text-xs sm:text-sm border border-neutral-200 rounded-xl py-2.5 px-4 text-neutral-800 focus:outline-none focus:border-[#2E7D32] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block">Phone Number</label>
                        <input
                          id="contact-phone-input"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 97XXXXXX55"
                          className="w-full bg-neutral-50 text-xs sm:text-sm border border-neutral-200 rounded-xl py-2.5 px-4 text-neutral-800 focus:outline-none focus:border-[#2E7D32] transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block">Message Subject *</label>
                        <select
                          id="contact-subject-select"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-neutral-50 text-xs sm:text-sm border border-neutral-200 rounded-xl py-2.5 px-4 text-neutral-800 focus:outline-none focus:border-[#2E7D32] transition-colors"
                        >
                          <option value="Product Query">Query about Grains/Ingredients</option>
                          <option value="Toddler Feeding Dosage">Toddler Dosage advice</option>
                          <option value="Bulk Order">Bulk Order pricing</option>
                          <option value="Franchise">Franchise or partnership</option>
                          <option value="Order Status">Shipping / Order status help</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block">How can our dietitians help you? *</label>
                      <textarea
                        id="contact-message-input"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your family's custom nutrition requests, toddler physical milestones questions, digestive sensitivities, etc..."
                        className="w-full bg-neutral-50 text-xs sm:text-sm border border-neutral-200 rounded-xl py-2.5 px-4 text-neutral-800 focus:outline-none focus:border-[#2E7D32] transition-colors"
                      ></textarea>
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#2E7D32] hover:bg-[#1e5821] text-white hover:shadow-lg rounded-xl py-3 text-xs sm:text-sm font-bold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Transmitting data...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Query
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
