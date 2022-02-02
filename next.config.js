// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  eslint: {
    dirs: ['src'],
  },

  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWaiting: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /\/(#)?/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'start-url'
        }
      },
      {
        urlPattern: /\/assets\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets'
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts'
        }
      },
      {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkOnly'
      },
      {
        urlPattern: /.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'others'
        }
      }
    ]
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
