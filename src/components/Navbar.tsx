/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X, Search, Leaf, PhoneCall, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSearchChange: (val: string) => void;
  searchValue: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange, searchValue }) => {
  const { cartCount, setCartOpen } = useCart();
  const { isLoggedIn, userIdentifier, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About Brand', href: '#about' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Recipes', href: '#recipes' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Banner Alert */}
      <div className="bg-[#2E7D32] text-[#F9FBE7] text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-between items-center sm:px-12">
        <span>🌱 Free Roasting & Fast Shipping on all orders above ₹499!</span>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+18005556887" className="flex items-center gap-1 hover:underline">
            <PhoneCall className="w-3.5 h-3.5" /> Call Toll Free: 1-800-555-NUTRIMIX
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-3 border-b border-[#F9FBE7]'
            : 'bg-[#F9FBE7]/90 backdrop-blur-md py-5 border-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" onClick={() => handleLinkClick('#home')} className="flex items-center gap-2 group">
            <div className="bg-[#2E7D32] p-2 rounded-xl text-[#F9FBE7] transition-transform duration-300 group-hover:rotate-12 shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-bold text-2xl tracking-tight text-neutral-800 block">
                Nutri<span className="text-[#2E7D32]">Mix</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#2E7D32]/80 font-mono -mt-1 block">
                Organic Superfood
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-neutral-600 hover:text-[#2E7D32] transition-colors font-medium text-sm py-2 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2E7D32] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Section Tools */}
          <div className="flex items-center space-x-4">
            
            {/* Search Input Toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mr-2"
                  >
                    <input
                      id="nav-search-input"
                      type="text"
                      placeholder="Search healthy products..."
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full bg-white text-sm border border-[#2E7D32]/20 rounded-full py-1.5 px-4 focus:outline-none focus:border-[#2E7D32] shadow-sm text-neutral-800"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                id="search-toggle-btn"
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (!showSearch) {
                    setTimeout(() => {
                      document.getElementById('nav-search-input')?.focus();
                    }, 200);
                  }
                }}
                className="p-2 text-neutral-600 hover:text-[#2E7D32] hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setCartOpen(true)}
              className="p-2 text-neutral-600 hover:text-[#2E7D32] hover:bg-neutral-100 rounded-full transition-colors relative"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#FFB300] text-neutral-900 border border-white font-mono text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="hidden md:flex items-center gap-2 hover:bg-neutral-100 py-1.5 px-3 rounded-full transition-colors cursor-pointer group">
                  <div className="w-6 h-6 bg-[#2E7D32] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {userIdentifier?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-neutral-600 group-hover:text-[#2E7D32] max-w-[120px] truncate">
                    {userIdentifier}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1"
                  aria-label="Log Out"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-neutral-600 hover:text-[#2E7D32] hover:bg-neutral-100 rounded-full transition-colors relative flex items-center gap-2"
                aria-label="Login or Sign Up"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">Log In</span>
              </Link>
            )}

            {/* Mobile Hamburger menu */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-[#2E7D32] hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-b border-[#F9FBE7] overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {/* Mobile Search Row */}
                <div className="pb-3 border-b border-gray-100 mb-2">
                  <div className="relative">
                    <input
                      id="mobile-search-input"
                      type="text"
                      placeholder="Search healthy products..."
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full bg-neutral-50 text-sm border border-neutral-200 rounded-lg py-2 pl-9 pr-4 focus:outline-none focus:border-[#2E7D32]"
                    />
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  </div>
                </div>

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-700 hover:bg-[#F9FBE7] hover:text-[#2E7D32] transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="pt-4 flex flex-col gap-2">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center bg-white border border-[#2E7D32]/20 text-[#2E7D32] py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-[#F9FBE7] transition-colors flex items-center justify-center gap-2"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center bg-red-50 text-red-600 py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full text-center bg-neutral-100 text-neutral-700 py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-neutral-200 transition-colors"
                    >
                      Log In / Sign Up
                    </Link>
                  )}
                  <a
                    href="#products"
                    onClick={() => handleLinkClick('#products')}
                    className="w-full text-center bg-[#2E7D32] text-white py-2.5 px-4 rounded-xl font-medium shadow-sm hover:bg-[#256428] transition-colors"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
