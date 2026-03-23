/**
 * Meesho Integration Service
 * Simulates fetching trending products from Meesho and applying dropship margins.
 */

export const fetchTrendingProducts = async () => {
  // Simulating a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock trending data that would normally come from a scraper or API
  const meeshoProducts = [
    {
      meeshoId: "m101",
      name: "Vintage Oversized Denim Jacket",
      basePrice: 45.00,
      image: "https://images.unsplash.com/photo-1576871333020-22105658e23b?q=80&w=600&auto=format&fit=crop",
      category: "Apparel",
      description: "Classic oversized fit denim jacket with distressed detailing. A timeless streetwear staple."
    },
    {
      meeshoId: "m102",
      name: "Cyberpunk Techwear Joggers",
      basePrice: 55.00,
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop",
      category: "Apparel",
      description: "Water-resistant techwear joggers with multiple utility pockets and adjustable straps."
    },
    {
      meeshoId: "m103",
      name: "Retro Future Sunglasses",
      basePrice: 20.00,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
      category: "Accessories",
      description: "Bold rectangular sunglasses with tinted lenses and a futuristic silhouette."
    },
    {
      meeshoId: "m104",
      name: "Minimalist Leather Backpack",
      basePrice: 80.00,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      category: "Accessories",
      description: "Sleek, genuine leather backpack with a hidden laptop compartment and slim profile."
    }
  ];

  // Apply 20% margin
  return meeshoProducts.map(product => ({
    ...product,
    id: product.meeshoId, // Mapping meeshoId to our internal ID for simplicity
    sellingPrice: parseFloat((product.basePrice * 1.2).toFixed(2)),
    profit: parseFloat((product.basePrice * 0.2).toFixed(2))
  }));
};

export const syncProductsToStore = async () => {
  const trending = await fetchTrendingProducts();
  // In a real app, this would update a database. 
  // For this mock, we'll return the synced result.
  return {
    timestamp: new Date().toISOString(),
    itemsSynced: trending.length,
    products: trending
  };
};
