/**
 * Social Media Service
 * Simulates posting products to Instagram and Facebook.
 */

export const postToSocialMedia = async (product) => {
  // Simulating network delay for API calls to Meta Graph API
  await new Promise(resolve => setTimeout(resolve, 2500));

  console.log(`[Social Sync] Posting to Instagram: ${product.name}`);
  console.log(`[Social Sync] Posting to Facebook: ${product.name}`);

  // Simulate success
  return {
    success: true,
    platforms: ["Instagram", "Facebook"],
    postIds: {
      instagram: `ig_${Math.floor(Math.random() * 1000000)}`,
      facebook: `fb_${Math.floor(Math.random() * 1000000)}`
    },
    timestamp: new Date().toISOString()
  };
};

export const getSocialStats = (productId) => {
  // Mock engagement stats
  return {
    likes: Math.floor(Math.random() * 500),
    shares: Math.floor(Math.random() * 50),
    clicks: Math.floor(Math.random() * 200)
  };
};
