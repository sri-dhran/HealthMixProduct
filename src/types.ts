/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'classic' | 'kids' | 'millet' | 'protein';
  tagline: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  benefits: string[];
  ingredients: string[];
  nutritionalInfo: {
    servingSize: string;
    calories: string;
    protein: string;
    carbohydrates: string;
    fat: string;
    dietaryFiber: string;
    calcium: string;
    iron: string;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  icon: string;
  benefits: string;
  image: string;
}

export interface Recipe {
  id: string;
  name: string;
  time: string;
  difficulty: 'Easy' | 'Medium';
  category: string;
  ingredients: string[];
  steps: string[];
  image: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string; // e.g. "500g", "1kg"
}
