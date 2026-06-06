import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Benefits } from '../components/Benefits';
import { Ingredients } from '../components/Ingredients';
import { Products } from '../components/Products';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Reviews } from '../components/Reviews';
import { Recipes } from '../components/Recipes';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { BackToTop } from '../components/BackToTop';

import heroImage from '../assets/images/hero_product_package_1780714500798.png';
import bowlImage from '../assets/images/bowl_of_mix_1780714517869.png';
import familyImage from '../assets/images/family_breakfast_1780714534261.png';

export function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { addedMessage } = useCart();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (value) {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 antialiased font-sans selection:bg-[#2E7D32]/20 selection:text-[#2E7D32]">
      <AnimatePresence>
        {addedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 right-6 left-6 sm:left-auto sm:w-96 z-55 bg-neutral-900 border border-neutral-700 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="bg-[#2E7D32] text-[#F9FBE7] p-2 rounded-xl text-xs font-bold leading-none animate-pulse">
              🌱
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-extrabold uppercase tracking-wide text-amber-400">Nutritional Mixture Added!</h5>
              <p className="text-[11px] text-neutral-300 mt-1">{addedMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar searchValue={searchValue} onSearchChange={handleSearchChange} />
      
      <main>
        <Hero heroImage={heroImage} />
        <About familyImage={familyImage} />
        <Benefits />
        <Ingredients />
        <Products searchValue={searchValue} onSearchChange={handleSearchChange} />
        <WhyChooseUs />
        <Reviews />
        <Recipes />
        <Gallery bowlImage={bowlImage} />
        <Contact />
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
