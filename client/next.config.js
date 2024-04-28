/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
});

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    // Add CopyPlugin to copy _redirects file
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, '_redirects'),
              to: path.resolve(__dirname, '.next'), // Copy to .next directory
            },
          ],
        })
      );
    }

    return config;
  },
});
