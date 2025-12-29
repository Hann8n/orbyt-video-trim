const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

const root = path.resolve(__dirname, '..');
const projectRoot = __dirname;

/**
 * Metro configuration for monorepo
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(projectRoot);

// Configure watchFolders to include root for hoisted dependencies and local package
config.watchFolders = [root, projectRoot, path.resolve(root, 'src')];

// Configure resolver to look in both project and root node_modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(root, 'node_modules'),
  ],
  // Ensure Metro can resolve packages from root
  extraNodeModules: {
    'react-native': path.resolve(root, 'node_modules', 'react-native'),
    'react': path.resolve(root, 'node_modules', 'react'),
    // Resolve local package to source directory
    'react-native-video-trim': path.resolve(root, 'src'),
  },
  // Configure sourceExts to include TypeScript if not already
  sourceExts: [...(config.resolver?.sourceExts || []), 'ts', 'tsx'],
};

module.exports = config;
