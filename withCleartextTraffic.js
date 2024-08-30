// withCleartextTraffic.js
const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withCleartextTraffic(config) {
  return withAndroidManifest(config, async (config) => {
    const appConfig = config.modResults.manifest.application.find(
      (e) => e['$']['android:networkSecurityConfig']
    );

    if (!appConfig) {
      config.modResults.manifest.application[0]['$']['android:networkSecurityConfig'] = '@xml/network_security_config';
    }
    
    return config;
  });
};
