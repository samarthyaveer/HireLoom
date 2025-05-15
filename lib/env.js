// lib/env.js - Environment variable manager
// Note: This file is now simplified for better compatibility with Vercel
// Environment variables are loaded automatically by Next.js and Vercel

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