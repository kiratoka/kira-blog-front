import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',

      },
      {
        protocol: 'https',
        hostname: 'ovzaokplufmyfgpsnsoc.supabase.co',
        port: '',

      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',

      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',

      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',

      }
    ],
  },
};

export default nextConfig;
