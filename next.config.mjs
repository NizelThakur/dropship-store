/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
      },
    ],
  },
};

export default nextConfig;
