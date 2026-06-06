/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, Tag, ShieldCheck, Truck, ShoppingCart, CreditCard, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import axios from 'axios';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    promoCode,
    promoDiscount,
    applyPromo,
    isCartOpen,
    setCartOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState(false);
  
  // Checkout Multi-step flow state
  // 'cart' | 'shipping' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Shipping details state
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [cityName, setCityName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(false);

    if (!couponInput.trim()) return;

    const success = applyPromo(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code! Try "FRESH30" (30% off) or "NUTRI10" (10% off).');
    }
  };

  const getPriceOfItem = (product: Product, size: string) => {
    const isOneKg = size === '1kg';
    const finalPrice = isOneKg ? product.price * 1.85 : product.price;
    return Number(finalPrice.toFixed(2));
  };

  const handleSubtotal = () => {
    return cart.reduce((total, item) => total + getPriceOfItem(item.product, item.selectedSize) * item.quantity, 0);
  };

  const currentSubtotal = handleSubtotal();
  const discValue = currentSubtotal * promoDiscount;
  const deliveryCharge = currentSubtotal > 499 ? 0 : 40;
  const taxCharge = currentSubtotal * 0.05; // 5% GST/VAT
  const grandTotal = currentSubtotal - discValue + deliveryCharge + taxCharge;

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !shippingAddress.trim() || !cityName.trim() || !zipCode.trim() || !cardNumber.trim() || !cardCvv.trim() || !cardName.trim()) {
      setFormError('Please fill out all mandatory shipping & secure billing details!');
      return;
    }

    setIsProcessing(true);

    // Build purchase payload: map each cart item to { productId, quantity }
    const purchaseItems = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    try {
      await axios.post('/api/purchase', purchaseItems);
      // Stock deducted successfully — proceed to success screen
      setCheckoutStep('success');
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        'Purchase failed. Please try again or contact support.';
      setFormError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetCheckout = () => {
    clearCart();
    setCheckoutStep('cart');
    setCartOpen(false);
    // Reset forms
    setFullName('');
    setShippingAddress('');
    setContactPhone('');
    setCityName('');
    setZipCode('');
    setCardNumber('');
    setCardName('');
    setCardExp('');
    setCardCvv('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay shade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#1e251f]/80 z-50 backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            
            {/* Header Area */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="font-extrabold text-neutral-800 text-base font-sans leading-none">
                  Your Nutritional Bag
                </h3>
                <span className="bg-[#2E7D32] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartCount} items
                </span>
              </div>
              
              <button
                id="cart-drawer-close"
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Inner Flow Panels based on Step */}
            <div className="flex-grow overflow-y-auto p-5 scrollbar-thin">
              
              {/* STEP 1: CART ITEMS REVIEW */}
              {checkoutStep === 'cart' && (
                <div className="space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 bg-[#F9FBE7]/10 p-8 rounded-3xl border border-dashed border-neutral-200">
                      <span className="text-4xl mb-4 block">🌾</span>
                      <h4 className="font-bold text-neutral-700 text-sm">Your Bag is Empty</h4>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        Add our slow-roasted, freshly milled NutriMix Classic, Kids, or Millet packets to start checkout.
                      </p>
                      <button
                        id="empty-cart-shop"
                        onClick={() => setCartOpen(false)}
                        className="mt-6 bg-[#2E7D32] text-white py-2 px-6 rounded-xl font-bold text-xs"
                      >
                        Browse Collections
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Products list row */}
                      <div className="space-y-4">
                        {cart.map((item) => {
                          const itemPrice = getPriceOfItem(item.product, item.selectedSize);
                          return (
                            <div
                              key={`${item.product.id}-${item.selectedSize}`}
                              className="flex gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 items-center justify-between"
                            >
                              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-neutral-100 shrink-0 border border-neutral-100">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1 space-y-1">
                                <h4 className="font-extrabold text-neutral-800 text-xs sm:text-sm leading-tight">
                                  {item.product.name}
                                </h4>
                                <div className="flex items-center gap-1.5 select-none">
                                  <span className="bg-emerald-50 text-[#2E7D32] border border-[#2E7D32]/20 font-sans font-bold text-[9px] rounded px-1.5 py-0.5">
                                    {item.selectedSize}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-mono">
                                    ₹{itemPrice} each
                                  </span>
                                </div>
                              </div>

                              {/* Quantity manipulators */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center border border-neutral-200 bg-white rounded-lg p-0.5 shadow-sm">
                                  <button
                                    id={`qty-minus-${item.product.id}`}
                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                    className="p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-mono font-bold px-2 text-neutral-700">
                                    {item.quantity}
                                  </span>
                                  <button
                                    id={`qty-plus-${item.product.id}`}
                                    onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                    className="p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  id={`remove-item-${item.product.id}`}
                                  onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                                  className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Promo Coupons block */}
                      <div className="bg-[#F9FBE7]/30 border border-[#2E7D32]/10 p-4 rounded-2xl">
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <div className="relative flex-1">
                            <input
                              id="promo-input-field"
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              placeholder="Have promo? e.g. FRESH30"
                              className="w-full bg-white text-xs border border-neutral-200 rounded-xl py-2 pl-8 pr-3 text-neutral-800 focus:outline-none focus:border-[#2E7D32]"
                            />
                            <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                          </div>
                          
                          <button
                            id="apply-coupon-btn"
                            type="submit"
                            className="bg-[#2E7D32] hover:bg-[#1a4b1c] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>

                        {/* Coupon Success/Failure Alerts */}
                        {couponError && (
                          <p className="text-[10px] text-red-500 mt-1.5 font-sans leading-relaxed">{couponError}</p>
                        )}
                        {couponSuccess && (
                          <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg p-2 mt-2 font-sans flex items-center gap-1">
                            <strong>✓ Promotion applied:</strong> Saved {promoDiscount * 100}% off subtotal items!
                          </div>
                        )}
                        {promoCode && !couponSuccess && (
                          <div className="text-[10px] text-emerald-700 font-sans mt-1.5 flex items-center justify-between">
                            <span>Active Coupon: <strong className="font-mono bg-[#2E7D32]/10 px-1.5 rounded">{promoCode}</strong></span>
                            <button
                              id="remove-promo-btn"
                              onClick={() => applyPromo('')}
                              className="text-red-500 underline font-bold"
                            >
                              Remove Coupon
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: SHIPPING DETAILS & CREDIT CARD INFORMATION FORM */}
              {checkoutStep === 'shipping' && (
                <form id="shipping-checkout-form" onSubmit={handleShippingSubmit} className="space-y-5 font-sans">
                  <div className="border-b border-neutral-100 pb-3 mb-1">
                    <h4 className="font-extrabold text-neutral-800 text-sm">Shipping & Solid Billing Details</h4>
                    <p className="text-[10px] text-neutral-400 mt-1">Specify destination address for high-quality packaging delivery.</p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-sans font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Personal */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Recipient Name *</label>
                    <input
                      id="bill-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Iyer"
                      className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Local Street Address *</label>
                    <input
                      id="bill-address"
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="e.g. Apartment, Suite, Street name"
                      className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">City *</label>
                      <input
                        id="bill-city"
                        type="text"
                        required
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="Coimbatore"
                        className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">ZIP / PIN Code *</label>
                      <input
                        id="bill-zip"
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="641018"
                        className="w-full bg-neutral-50 text-xs border border-neutral-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>

                  {/* Payment block with safe padlock visual */}
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-[10px] text-neutral-600 uppercase tracking-wider flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#2E7D32]" />
                        Secure 128-bit Payment (INR)
                      </h5>
                      <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold font-mono">ENCRYPTED</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-neutral-500 block">Cardholder Name *</label>
                      <input
                        id="pay-cardholder"
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Priyadharsini Iyer"
                        className="w-full bg-white text-xs border border-neutral-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-neutral-500 block">Card Number *</label>
                      <input
                        id="pay-cardnum"
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        maxLength={19}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-white text-xs border border-neutral-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#2E7D32]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-neutral-500 block">Expiry (MM/YY) *</label>
                        <input
                          id="pay-cardexp"
                          type="text"
                          required
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          maxLength={5}
                          placeholder="12/28"
                          className="w-full bg-white text-xs border border-neutral-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#2E7D32]"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-neutral-500 block">CVV Guard *</label>
                        <input
                          id="pay-cardcvv"
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={3}
                          placeholder="***"
                          className="w-full bg-white text-xs border border-neutral-200 rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#2E7D32]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      id="shipping-back-btn"
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2.5 rounded-xl text-center cursor-pointer"
                    >
                      Back to Bag
                    </button>
                    
                    <button
                      id="shipping-pay-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="bg-[#2E7D32] hover:bg-[#1a4a1c] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-xl text-center cursor-pointer"
                    >
                      {isProcessing ? 'Processing...' : 'Authorize Payment'}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: CONVERSIONS SUCCESS SCREEN */}
              {checkoutStep === 'success' && (
                <div className="text-center py-10 space-y-6 font-sans">
                  
                  {/* Confetti-like success star */}
                  <div className="bg-[#F9FBE7] text-[#2E7D32] w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-white relative animate-bounce">
                    <Sparkles className="w-10 h-10 text-[#FFB300] fill-[#FFB300]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-[#2E7D32] tracking-tight">Order Dispatched!</h3>
                    <p className="text-xs text-neutral-500">Transaction code: <strong className="font-mono text-neutral-700">NUTRIMIX-TXN-{Date.now()}</strong></p>
                  </div>

                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 text-left space-y-3">
                    <h5 className="font-bold text-xs text-neutral-800 uppercase tracking-widest border-b border-neutral-200 pb-2">Receipt Details</h5>
                    
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Delivery Name:</span>
                      <strong className="text-neutral-800">{fullName}</strong>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Address:</span>
                      <strong className="text-neutral-800 text-right max-w-[200px] leading-snug">{shippingAddress}, {cityName} - {zipCode}</strong>
                    </div>

                    <div className="flex justify-between text-xs text-neutral-500 border-t border-neutral-200 pt-3">
                      <span>Total Secure Charged:</span>
                      <strong className="text-[#2E7D32] font-mono text-sm font-black">₹{grandTotal.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-xs text-amber-800 text-left leading-relaxed">
                    <strong>📦 Organic Dispatch Notification:</strong> Your multi-grain seeds are roasted, milled, and packed airtight. Shipping labels have been generated. Dynamic tracking link sent to your phone!
                  </div>

                  <button
                    id="success-checkout-reset"
                    onClick={handleResetCheckout}
                    className="w-full bg-[#2E7D32] hover:bg-[#1f5621] text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                  >
                    Return to healthy Store
                  </button>

                </div>
              )}

            </div>

            {/* Sticky Pricing Summary Footer (Omitted in Success state) */}
            {cart.length > 0 && checkoutStep !== 'success' && (
              <div className="p-5 border-t border-neutral-100 bg-neutral-50 shadow-inner shrink-0 space-y-4 select-none font-sans">
                
                {/* Cost lines */}
                <div className="space-y-1.5 text-xs text-neutral-500">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <strong className="text-neutral-800 font-mono">₹{currentSubtotal.toFixed(2)}</strong>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promotion Discount ({promoDiscount * 100}%):</span>
                      <strong className="font-mono">-₹{discValue.toFixed(2)}</strong>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <strong className="text-neutral-800 font-mono">
                      {deliveryCharge === 0 ? <span className="text-[#2E7D32] font-semibold">FREE</span> : `₹${deliveryCharge}`}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>State GST / Processing (5%):</span>
                    <strong className="text-neutral-800 font-mono">₹{taxCharge.toFixed(2)}</strong>
                  </div>

                  <div className="flex justify-between border-t border-neutral-200 pt-2.5 text-sm font-black text-neutral-800">
                    <span>Grand Total:</span>
                    <strong className="text-[#2E7D32] font-mono text-base">₹{grandTotal.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Main Action based on step */}
                {checkoutStep === 'cart' && (
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full bg-[#2E7D32] hover:bg-[#205822] text-white py-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
                  >
                    Proceed to Safe Checkout
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                  </button>
                )}

                {/* Secure certificate logs */}
                <div className="flex items-center justify-center gap-2 text-[9px] text-neutral-400 font-mono uppercase tracking-wider select-none leading-none pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span>100% Encrypted Transactions</span>
                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
