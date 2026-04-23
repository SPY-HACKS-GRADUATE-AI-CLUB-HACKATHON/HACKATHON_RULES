import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // DELETE: output: 'export'
  // DELETE: basePath: ...

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // You can keep this or remove it, Vercel supports optimization
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;