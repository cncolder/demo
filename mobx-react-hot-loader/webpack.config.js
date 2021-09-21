const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src'],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|packages/,
        use: 'babel-loader',
      },
    ],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(j|t)sx?$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           cacheDirectory: true,
  //           babelrc: false,
  //           presets: [
  //             [
  //               '@babel/preset-env',
  //               { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
  //             ],
  //             '@babel/preset-typescript',
  //             '@babel/preset-react',
  //           ],
  //           plugins: [
  //             // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
  //             ['@babel/plugin-proposal-decorators', { legacy: true }],
  //             ['@babel/plugin-proposal-class-properties', { loose: true }],
  //             'react-hot-loader/babel',
  //           ],
  //         },
  //       },
  //     },
  //   ],
  // },
  plugins: [new HtmlWebpackPlugin()],
};
