const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
    ],
  },
  webpack: (config) => {
    // Usamos la caché en memoria, como lo requiere Webpack en este contexto
    config.cache = {
      type: 'memory', // Cambiamos el tipo de caché a "memory"
    };

    return config;
  },
};

module.exports = nextConfig;
