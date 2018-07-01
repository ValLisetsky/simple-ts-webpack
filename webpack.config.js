const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    entry: {
        main: './src/main.ts',
        vendors: './src/vendors.ts',
        polyfills: './src/polyfills.ts',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(ts|tsx)?$/,
            loader: 'awesome-typescript-loader'
        }]
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html', filename: __dirname + "/dist/index.html" })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
};