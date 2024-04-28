const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/client/about', // Update to your actual page route
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },

  webpack: (config, { isServer }) => {
    // Add CopyPlugin to copy _redirects file
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'client', '_redirects'),
              to: path.resolve(__dirname, 'client', '.next'), // Copy to .next directory in client folder
            },
          ],
        })
      );
    }

    return config;
  },
};
