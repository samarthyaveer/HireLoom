/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: true,
  },

  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },

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
