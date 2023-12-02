const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development', 
  target: 'node', 
  externals: [ nodeExternals() ], 
  devtool: 'eval-source-map', 
  module: {
    rules: [
      {
        loader: 'ts-loader', 
        test: /\.ts$/, 
        exclude: [/node_modules/], 
        options: { configFile: 'tsconfig.test.json'}
      }
    ]
  }, 
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }, 
  entry: './test/src/index.ts', 
  output: {
    filename: 'index.js', 
    path: path.resolve(__dirname, './test/build')
  }, 
  node: {
    __dirname: false
  }
};