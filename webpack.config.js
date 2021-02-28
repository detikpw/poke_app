const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')

const filePath = path.join(__dirname, './public/js/');
const filename = 'bundle.js';

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
        plugins: [
          ['@babel/plugin-proposal-decorators', { "legacy": true }],
        ]
      },
    }
  }
]

const clientConfig = {
  entry: './src/client',
  output: {
    filename,
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: moduleRules
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'public')
  // },
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

// module.exports = {
//   entry: {
//     app: [
//       path.join(__dirname, 'src/client/index.js'),
//       'webpack-hot-middleware/client?path=/__wpk_hmr&reload=true'
//     ]
//   },
//   output: {
//     filename: fileName,
//     publicPath: '/static/js/',
//     path: filePath,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react'
//             ],
//             plugins: [
//               ['@babel/plugin-proposal-decorators', { "legacy": true }],
//             ]
//           },
//         }
//       }
//     ]
//   },

//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//   ],

//   devtool: 'eval-source-map'
// }
