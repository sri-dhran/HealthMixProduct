/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Ingredient, Recipe, Review } from './types';

export const BRAND_NAME = "NutriMix";

export const PRODUCTS: Product[] = [
  {
    id: "prod-classic",
    name: "Manna Health Mix",
    category: "classic",
    tagline: "Popular Multigrain & Millet Blend",
    description: "A multigrain and millet-based nutrition mix suitable for the whole family. Extremely popular across Tamil Nadu for daily health and energy.",
    detailedDescription: "Manna Health Mix is a traditional, time-tested combination of millets, cereals, pulses, and nuts. Roasted carefully to retain natural goodness, it is suitable for all ages, making it the perfect family breakfast option. Formulated to provide wholesome nutrition and sustained energy throughout the day.",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 1420,
    image: "/images/manna_health_mix.png",
    benefits: ["Popular across Tamil Nadu", "Multigrain & millet-based nutrition", "Suitable for the entire family", "Available in multiple pack sizes"],
    ingredients: ["Ragi (Finger Millet)", "Bajra", "Jowar", "Wheat", "Green Gram", "Almonds", "Cashews", "Cardamom"],
    nutritionalInfo: {
      servingSize: "30g (Approx. 2-3 tablespoons)",
      calories: "115 kcal",
      protein: "4.2g",
      carbohydrates: "22.5g",
      fat: "1.2g",
      dietaryFiber: "3.1g",
      calcium: "95mg",
      iron: "1.8mg"
    }
  },
  {
    id: "prod-kids",
    name: "Sweet Karam Coffee Millet Health Mix",
    category: "millet",
    tagline: "Zero Added Sugar & No Preservatives",
    description: "100% natural millet-based nutrition mix with zero added sugar and no preservatives. Guilt-free traditional wellness.",
    detailedDescription: "Crafted cleanly by Sweet Karam Coffee, this millet health mix features zero added sugar and absolutely no chemical preservatives. Combining various healthy millets and traditional ingredients, it delivers premium, wholesome nutrition in every serving.",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviewCount: 950,
    image: "/images/sweet_karam_coffee.png",
    benefits: ["Zero added sugar", "No artificial preservatives or colorings", "Millet-based organic nutrition mix"],
    ingredients: ["Sprouted Ragi", "Wheat", "Green Gram", "Sprouted Moong", "Almonds", "Walnuts", "Cardamom", "Organic Palm Candy"],
    nutritionalInfo: {
      servingSize: "30g (Approx. 2-3 tablespoons)",
      calories: "118 kcal",
      protein: "4.8g",
      carbohydrates: "21.2g",
      fat: "1.8g",
      dietaryFiber: "3.4g",
      calcium: "140mg",
      iron: "2.4mg"
    }
  },
  {
    id: "prod-millet",
    name: "Organic Health Mix",
    category: "classic",
    tagline: "Budget-Friendly Organic Ingredients",
    description: "A cost-effective blend of organic grains and millets. Wholesome nutrition made affordable for everyone.",
    detailedDescription: "Get the best of nature without breaking the bank. Our Organic Health Mix is made with certified organic ingredients sourced directly from local farms. It provides high fiber and minerals in a budget-friendly package, ensuring healthy living is accessible to all families.",
    price: 329,
    originalPrice: 429,
    rating: 4.7,
    reviewCount: 780,
    image: "/images/organic_health_mix.png",
    benefits: ["100% organic certified ingredients", "Budget-friendly family option", "Rich in dietary fiber and essential minerals"],
    ingredients: ["Ragi (Finger Millet)", "Foxtail Millet", "Bajra (Pearl Millet)", "Jowar (Sorghum)", "Barnyard Millet", "Kodo Millet", "Horse Gram"],
    nutritionalInfo: {
      servingSize: "30g (Approx. 2-3 tablespoons)",
      calories: "108 kcal",
      protein: "3.8g",
      carbohydrates: "23.1g",
      fat: "0.9g",
      dietaryFiber: "4.8g",
      calcium: "80mg",
      iron: "2.1mg"
    }
  },
  {
    id: "prod-protein",
    name: "Aachi Health Mix 200g",
    category: "protein",
    tagline: "Easily Available Supermarket Starter Option",
    description: "An affordable starter pack of the traditional health mix. Easily available in local supermarkets for convenient purchasing.",
    detailedDescription: "Aachi Health Mix is the perfect introductory pack for those beginning their health mix journey. Conveniently sized at 200g and readily available in all major supermarkets, it offers a quick, nutritious, and extremely affordable breakfast choice.",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewCount: 540,
    image: "/images/aachi_health_mix.png",
    benefits: ["Easily available in local supermarkets", "Affordable 200g starter pack", "Quick and simple to prepare"],
    ingredients: ["Roasted Almonds", "Cashews", "Green Gram", "Horse Gram", "Flaxseed", "Chia Seed", "Peanut Powder", "Cardamom"],
    nutritionalInfo: {
      servingSize: "30g (Approx. 2-3 tablespoons)",
      calories: "128 kcal",
      protein: "8.2g",
      carbohydrates: "17.4g",
      fat: "3.2g",
      dietaryFiber: "4.2g",
      calcium: "110mg",
      iron: "2.9mg"
    }
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    id: "ragi",
    name: "Ragi",
    tamilName: "Finger Millet",
    description: "The ultimate bone-strength supergrain, containing 3x the calcium of milk.",
    icon: "🌾",
    benefits: "Rich in calcium, builds bone density, low-glycemic, keeps body temperature cool.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "foxtail",
    name: "Foxtail Millet",
    tamilName: "Thinai",
    description: "Ancient grain packed with smart carbs and mineral iron.",
    icon: "🌾",
    benefits: "Combats anemia, high in antioxidant polyphenols, regulates neurological health.",
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "bajra",
    name: "Bajra",
    tamilName: "Pearl Millet",
    description: "Powerful source of phosphorus and thermogenic slow-burning fuel.",
    icon: "🌾",
    benefits: "Excellent general heart guard, highly alkaline, balances stomach acid secretions.",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "jowar",
    name: "Jowar",
    tamilName: "Sorghum",
    description: "Gluten-free traditional fuel packed with copper and potassium.",
    icon: "🌾",
    benefits: "High copper boosts hair & blood flow, rich in cell-protecting beta-carotene.",
    image: "https://images.unsplash.com/photo-1574316071389-7815cf1be782?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "wheat",
    name: "Wheat Grains",
    tamilName: "Godhumai",
    description: "Premium sun-dried whole kernels containing complex Vitamin B composites.",
    icon: "🌾",
    benefits: "Strengthens metabolic functions, rich in cellular protective niacin and selenium.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "greengram",
    name: "Green Gram",
    tamilName: "Pasi Payaru",
    description: "Gentle plant food with a very high density of clean essential amino acids.",
    icon: "🌱",
    benefits: "Crucial for child height/muscle development, rich in blood-filtering folates.",
    image: "https://images.unsplash.com/photo-1585994244976-50d4eb07c742?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "horsegram",
    name: "Horse Gram",
    tamilName: "Kollu",
    description: "Iron-heavy therapeutic legume prized by traditional healers.",
    icon: "🐴",
    benefits: "Clears respiratory phlegm, triggers body-fat burning, keeps energy high.",
    image: "https://images.unsplash.com/photo-1515023115689-589c3f0bb13a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "almonds",
    name: "Almonds",
    tamilName: "Badam",
    description: "Premium California badam providing high Vitamin E for skin and intellect.",
    icon: "🥜",
    benefits: "High-level cognitive support, anti-inflammatory mono-fats, glowy skin defense.",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "cashews",
    name: "Cashews",
    tamilName: "Mundhiri",
    description: "Slow-roasted creamy nuts loaded with zinc and healthy magnesium.",
    icon: "🥜",
    benefits: "Strengthens immune reflexes, enhances endorphins for positive mood.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "cardamom",
    name: "Cardamom",
    tamilName: "Elaichi",
    description: "The exotic Queen of Spices, lending fresh natural aroma and aid to absorption.",
    icon: "🟢",
    benefits: "Triggers digestion enzymes, neutralizes gas, cleanses toxicity in kidneys.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=400&auto=format&fit=crop"
  }
];

export const RECIPES: Recipe[] = [
  {
    id: "rec-drink",
    name: "Traditional Warm Health Drink",
    time: "5 Mins",
    difficulty: "Easy",
    category: "Health Drink",
    ingredients: [
      "2 tbsp NutriMix Classic",
      "1 cup Milk or Water",
      "1 tsp jaggery or palm sugar (optional)",
      "Pinch of saffron (optional)"
    ],
    steps: [
      "Dilute 2 tablespoons of NutriMix in 1/2 cup of cold milk or water with no lumps.",
      "Boil remaining 1/2 cup of milk or water on low heat in a heavy bottom pan.",
      "Pour the diluted mixture into the boiling liquid while stirring continuously.",
      "Cook on a medium flame for 3 minutes until the raw aroma vanishes and the mix thickens elegantly.",
      "Add organic jaggery or palm candy, mix properly, and serve warm in a brass cup!"
    ],
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "rec-porridge",
    name: "Thick Savory Porridge (Kanjii)",
    time: "10 Mins",
    difficulty: "Easy",
    category: "Porridge",
    ingredients: [
      "3 tbsp NutriMix Multi Millet",
      "1.5 cups Water",
      "2 tbsp fresh thick curd",
      "1 tbsp chopped shallots & curry leaves",
      "Salt to taste"
    ],
    steps: [
      "Whisk NutriMix with water and a pinch of salt until smooth.",
      "Simmer the slurry on a medium heat for 6-8 minutes, stirring frequently.",
      "Once fully cooked and shiny, remove from heat and let it cool completely.",
      "Blend in fresh curd, finely chopped shallots, and fresh hand-torn curry leaves.",
      "A rustic, highly cooling summer prebiotic breakfast perfect for active outdoors."
    ],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "rec-smoothie",
    name: "Banana Almond Nutri-Smoothie",
    time: "3 Mins",
    difficulty: "Easy",
    category: "Smoothie",
    ingredients: [
      "2 tbsp cooked NutriMix Classic (cooled)",
      "1 ripe medium banana",
      "5 soaked almonds",
      "1 cup cold almond milk or dairy milk",
      "1/2 tsp chia seeds"
    ],
    steps: [
      "Blend the ripe banana, soaked almonds, cold milk, and cooked-and-cooled health mix porridge together in a high-speed blender.",
      "Pour into an dynamic glass.",
      "Garnish with organic chia seeds and tiny almond flakes on top.",
      "Drink immediately for a fantastic fuel-up after a workout or jog!"
    ],
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "rec-energy-balls",
    name: "Traditional Nutri Laddoo (Energy Balls)",
    time: "15 Mins",
    difficulty: "Medium",
    category: "Energy Balls",
    ingredients: [
      "1 cup NutriMix Protein Mix",
      "1/2 cup soft Medjool dates (pitted)",
      "3 tbsp Pure Cow Ghee",
      "2 tbsp broken pistachios & almonds",
      "1 tsp honey"
    ],
    steps: [
      "Dry roast the NutriMix in a heavy pan for 3 minutes on low flame to enrich the aroma, then set aside to cool.",
      "In a food processor, blend dates and honey into an elegant paste.",
      "Melt the cow ghee gently and mix with dry roasted flour, dates paste, and crushed crunchy nuts.",
      "Knead together while warm, then roll into compact bite-sized round laddoos.",
      "Store in an airtight container for up to 3 weeks. Incredible mid-day snack for kids!"
    ],
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "rec-pancakes",
    name: "Healthy Multigrain Pancakes",
    time: "12 Mins",
    difficulty: "Medium",
    category: "Pancakes",
    ingredients: [
      "1 cup NutriMix Kids Mix",
      "1/2 cup whole wheat flour",
      "1 tsp baking powder",
      "1 ripe mashed banana",
      "1/2 cup milk",
      "Butter for pan"
    ],
    steps: [
      "In a deep glass bowl, whisk NutriMix flour, wheat flour, and baking powder together.",
      "Blend in the mashed banana and milk slowly to form a moderately thick dripping batter.",
      "Heat a flat non-stick griddle, smear lightly with fresh butter.",
      "Ladle batter onto pan. Cook on low-medium light until small holes pop, flip and cook until golden brown.",
      "Drizzle with raw honey or organic maple syrup and serve with fresh berries!"
    ],
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400&auto=format&fit=crop"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Meera Krishnan",
    role: "Mother of 2 & Nutritionist",
    rating: 5,
    comment: "Finding a breakfast that satisfies both my toddlers and my nutrition checklists was a nightmare. This Kids Health Mix with sprouted ragi is a miracle. They love the subtle chocolate tone and I love the lack of preservatives and absolute premium purity. High calcium means stronger teeth!",
    date: "2026-05-18",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "rev-2",
    name: "Dr. Arvind Swaminathan",
    role: "Senior Consultant Cardiologist",
    rating: 5,
    comment: "I recommend the Multi-Millet blend to many of my patients looking to manage stable glucose levels. It is high in slow-digestive prebiotic fibers, preventing insulin spikes. My own wife and I take it every evening with warm curd and shallots. An outstanding authentic product.",
    date: "2026-05-30",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "rev-3",
    name: "Rohit Deshmukh",
    role: "Athelete & Crossfit Instructor",
    rating: 5,
    comment: "Traditional wisdom meets modern active fitness! The Active Protein version gets me 8 grams of native muscle repair building blocks without bloating from whey filters or soy processing. I blend it directly with banana and dates after high intensity lifting sessions. 10/10 recommendation.",
    date: "2026-06-02",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: "rev-4",
    name: "Kalyani Ammal",
    role: "Grandmother of 6",
    rating: 5,
    comment: "This aroma brings me back to the 1970s back-kitchen in Thanjavur! The grain roasting matches the grandma slow-roasting standard. Incredibly delicate and high quality. It heals indigestion and makes my joints feel agile again. Clean and completely trustworthy food.",
    date: "2026-04-12",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "100% Natural",
    description: "No refined chemicals, fillers, synthetic flavors or preservatives. Only pure raw nature in every spoonful.",
    icon: "🌱"
  },
  {
    title: "Homemade Quality",
    description: "Prepared in small artisanal batches inspired by motherly care, slow roasting, and clean manual sorting.",
    icon: "🏠"
  },
  {
    title: "Traditional Recipe",
    description: "Formulated using balanced multi-grain ratios validated by ancient systems of wholesome nutrition.",
    icon: "📜"
  },
  {
    title: "FSSAI Certified",
    description: "Processed inside sterile, globally certified hygienic facilities with automated packing integrity checks.",
    icon: "🏅"
  },
  {
    title: "Fast Delivery",
    description: "Sealed airtight bags shipped within 24 hours of roasting, reaching your doorstep at optimal freshness.",
    icon: "⚡"
  },
  {
    title: "Secure Payments",
    description: "128-bit SSL encrypted shopping gateways accepting credit cards, UPI, digital wallets, and NetBanking.",
    icon: "🛡️"
  }
];
