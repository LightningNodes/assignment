import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config, { isServer, buildId, dev, webpack }) => {
    config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    // Exclude tests from being compiled, especially not for the production build
    config.module.rules.push({
      test: /\\.(test|spec)\\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader'
    });

    return config;
  },
};

export default nextConfig;
