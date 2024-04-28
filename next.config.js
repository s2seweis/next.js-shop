const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  basePath: '/client',
  assetPrefix: '/client/',
  // Other configuration options

  webpack: (config) => {
    // Copy _redirects file to the build output directory
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '_redirects'),
            to: path.resolve(__dirname, '.next'),
          },
        ],
      })
    );

    return config;
  },
};
