// lib/env.js - Environment variable manager
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Get the absolute path to the root directory
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env.local
const envLocalPath = path.join(rootDir, '.env.local');
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
  const envPath = path.join(rootDir, '.env');
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

// Get API key from environment variables
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Get model name with fallback to default model
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

/**
 * Checks if the environment is properly configured for Gemini API
 * @returns {boolean} True if the environment is properly configured
 */
export function isGeminiConfigured() {
  return !!GEMINI_API_KEY;
}