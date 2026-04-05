const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// DYNAMICALLY FIND WEBPACK
// This looks for webpack within the project's dependency tree 
// rather than a hardcoded nested path.
let webpack;
try {
  webpack = require('webpack');
} catch (e) {
  // Fallback for some SPFx environments where it's deeply nested
  const webpackPath = require.resolve('webpack', { paths: [process.cwd()] });
  webpack = require(webpackPath);
}

module.exports = function(webpackConfig) {
  const NODE_ENV = process.env.NODE_ENV || 'dev';
  const envPath = path.resolve(process.cwd(), `.env.${NODE_ENV}`);
  const defaultEnvPath = path.resolve(process.cwd(), '.env');

  const finalEnvPath = fs.existsSync(envPath) ? envPath : defaultEnvPath;
  
  if (fs.existsSync(finalEnvPath)) {
    const envConfig = dotenv.config({ path: finalEnvPath }).parsed || {};
    
    const envKeys = Object.keys(envConfig)
      .filter(key => key.startsWith('SPFX_'))
      .reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(envConfig[next]);
        return prev;
      }, {});

    // Safety check: ensure DefinePlugin is available
    if (webpack && webpack.DefinePlugin) {
      webpackConfig.plugins.push(new webpack.DefinePlugin(envKeys));
    }
  }

  return webpackConfig;
};
