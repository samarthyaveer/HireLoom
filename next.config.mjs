// Load environment variables at build time
// Note: Vercel automatically loads environment variables from the Vercel dashboard
// This is only needed for local development
import dotenv from 'dotenv';

// Load environment variables from .env files
// This is handled automatically by Next.js, but we're keeping this for backwards compatibility
try {
  dotenv.config({ path: '.env.local' });
  dotenv.config({ path: '.env' });
} catch (error) {
  console.error('Error loading environment variables:', error);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    // Updated serverActions config to work with both local and production environments
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hireloom.vercel.app', '*.vercel.app'],
    },
  },

  // Make environment variables available to the browser
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  },

  // Remove the API section as it's causing warnings
  webpack: (config) => {
    // This is to handle the Buffer polyfill needed for pdf-parse or Node core modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      stream: false,
      path: false,
      process: false,
      crypto: false,
      zlib: false,
    };
    return config;
  },

  // Increase serverless function timeout and memory for PDF processing
  serverRuntimeConfig: {
    // Will only be available on the server side
    pdf: {
      maxPages: 50,
    }
  },
};

export default nextConfig;
