const path = require('path');
const nodeExternals = require('webpack-node-externals')

const moduleRules = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
      },
    }
  }
]

const clientConfig = {
  entry: './src/client',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: moduleRules
  },
}

const serverConfig = {
  entry: './src',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: moduleRules
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  // https://stackoverflow.com/questions/43527016/dirname-is-not-working-in-node-js-with-webpack-bundling
  // https://webpack.js.org/configuration/node/
  node: {
    __dirname: false
  }
}

module.exports = [clientConfig, serverConfig]
