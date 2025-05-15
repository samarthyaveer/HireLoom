// Load environment variables at build time
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envLocalPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envLocalPath)) {
  try {
    const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));

    // Manually set environment variables
    for (const key in envConfig) {
      process.env[key] = envConfig[key];
    }
  } catch (error) {
    console.error('Error loading .env.local:', error);
  }
}

// Load environment variables from .env if needed
if (!process.env.GEMINI_API_KEY) {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));

      // Manually set environment variables
      for (const key in envConfig) {
        process.env[key] = envConfig[key];
      }
    } catch (error) {
      console.error('Error loading .env:', error);
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
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
    };
    return config;
  },
};

export default nextConfig;
