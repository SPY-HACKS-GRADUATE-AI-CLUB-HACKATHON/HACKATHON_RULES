import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // --- GITHUB PAGES SETTINGS ---
  output: 'export',
  basePath: '/HACKATHON_RULES', 
  // -----------------------------

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Required for static export so GitHub doesn't try to run an image server
    unoptimized: true, 
    
    // Your existing external image patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;