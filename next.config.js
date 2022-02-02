/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  },

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
});
