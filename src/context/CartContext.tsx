/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  promoCode: string;
  promoDiscount: number;
  applyPromo: (code: string) => boolean;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addedMessage: string | null;
  triggerAddedMessage: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nutrimix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCartOpen, setCartOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('nutrimix_cart', JSON.stringify(cart));
  }, [cart]);

  const triggerAddedMessage = (msg: string) => {
    setAddedMessage(msg);
    setTimeout(() => {
      setAddedMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, size = "500g") => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { product, quantity, selectedSize: size }];
    });
    
    triggerAddedMessage(`Added ${quantity} x ${product.name} (${size}) to your cart!`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const applyPromo = (code: string): boolean => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'FRESH30') {
      setPromoCode('FRESH30');
      setPromoDiscount(0.30); // 30% discount
      return true;
    } else if (formatted === 'NUTRI10') {
      setPromoCode('NUTRI10');
      setPromoDiscount(0.10); // 10% discount
      return true;
    }
    return false;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const baseTotal = cart.reduce((total, item) => {
    let sizeMultiplier = 1;
    if (item.selectedSize === '1kg') sizeMultiplier = 1.85; // 15% discount for bulk
    return total + (item.product.price * sizeMultiplier) * item.quantity;
  }, 0);

  const cartTotal = baseTotal * (1 - promoDiscount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        promoCode,
        promoDiscount,
        applyPromo,
        isCartOpen,
        setCartOpen,
        addedMessage,
        triggerAddedMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
