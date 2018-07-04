const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {

    const config = {
        entry: {
            polyfills: './src/polyfills.ts',
            vendors: './src/vendors.ts',
            main: './src/main.ts'
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
                },
                {
                    test: /\.scss$/,
                    use: [
                        argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
            new HtmlWebpackPlugin({ template: './src/index.html', filename: __dirname + "/dist/index.html" })
        ],

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000
        }
    }

    return config;

};