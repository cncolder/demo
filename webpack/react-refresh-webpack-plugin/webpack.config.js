const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

/** @type {import('webpack').Configuration} */
module.exports = {
    // It is suggested to run both `react-refresh/babel` and the plugin in the `development` mode only,
    // even though both of them have optimisations in place to do nothing in the `production` mode.
    // If you would like to override Webpack's defaults for modes, you can also use the `none` mode -
    // you then will need to set `forceEnable: true` in the plugin's options.
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: './src/index.tsx',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                            plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),
    ].filter(Boolean),
};
