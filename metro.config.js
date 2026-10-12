// metro.config.js
// Metro bundler configuration. We only add NativeWind's CSS interop here.
// Keeping this minimal — Expo handles everything else through its preset.
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  // Where our global CSS entry is located
  input: './src/global.css',
});
