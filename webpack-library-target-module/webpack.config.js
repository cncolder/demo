/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.tsx',
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'module',
    },
    experiments: {
        outputModule: true,
    },
    externalsType: 'window',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
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
                        },
                    },
                ],
            },
        ],
    },
};
