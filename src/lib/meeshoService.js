/**
 * Meesho Integration Service
 * Simulates fetching trending products from Meesho and applying dropship margins.
 */

import fs from 'fs';
import path from 'path';

export const fetchTrendingProducts = async () => {
  // Simulate network delay for UI realism
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Vercel Serverless traces require static imports to bundle assets
    const fileData = require('@/data/products.json');
    if (fileData && fileData.length > 0) {
      return fileData.map(product => ({
        ...product,
        id: product.id || String(Math.random()),
        sellingPrice: product.price || parseFloat((product.meeshoPrice * 1.4).toFixed(2)),
        profit: parseFloat((product.meeshoPrice * 0.4).toFixed(2))
      }));
    }
  } catch (error) {
    console.log("No scraped data found in build payload, falling back to mock products.");
  }

  // Fallback authentic-looking mock data
  const fallbackProducts = [
    {
      id: "m101",
      name: "Vintage Oversized Denim Jacket",
      sellingPrice: 54.00,
      meeshoPrice: 45.00,
      image: "https://images.unsplash.com/photo-1576871333020-22105658e23b?q=80&w=600",
      category: "Apparel"
    },
    {
      id: "m102",
      name: "Cyberpunk Techwear Joggers",
      sellingPrice: 66.00,
      meeshoPrice: 55.00,
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600",
      category: "Apparel"
    },
    {
      id: "m103",
      name: "Retro Future Sunglasses",
      sellingPrice: 24.00,
      meeshoPrice: 20.00,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600",
      category: "Accessories"
    },
    {
      id: "m104",
      name: "Minimalist Leather Backpack",
      sellingPrice: 96.00,
      meeshoPrice: 80.00,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600",
      category: "Accessories"
    }
  ];

  return fallbackProducts.map(p => ({
    ...p,
    profit: parseFloat((p.meeshoPrice * 0.4).toFixed(2))
  }));
};

export const syncProductsToStore = async () => {
  const trending = await fetchTrendingProducts();
  return {
    timestamp: new Date().toISOString(),
    itemsSynced: trending.length,
    products: trending
  };
};
