const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
    entry: {
      main:  './src/main.js',
      admin: './src/admin.js',
      dmx:   './src/dmx.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [new ESLintPlugin()],
}