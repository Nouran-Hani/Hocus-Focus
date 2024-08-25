// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Add support for custom asset plugins
  config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

  // Adjust the resolver for any additional file extensions
  config.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'jsx', 'svg']; // You can add more extensions if needed

  // Define custom server settings, such as host and port
  config.server = {
    host: '192.168.1.36', // Your local machine IP
    port: 8081, // Default port for Metro, change if necessary
  };

  return config;
})();
