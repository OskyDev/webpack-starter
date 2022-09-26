const FileLoader           = require("file-loader");
const HtmlWebPackPlugin    = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");


const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename:'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false
                },
            },
             {
                test: /\.css$/i,
                exclude: /styles.css$/i,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /styles.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
 
            }, 
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]'
                }
            }, {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }}
        ]
    },
        optimization: {
            minimize: true,
            minimizer:[
                new CssMinimizer(),
                new Terser(),
            ]
        },
   
    plugins:[
        new HtmlWebPackPlugin({
            
            filename: 'index.html',
            template: './src/index.html'
        }),
    
        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css', // el [fullhash] permite que no quede el cache en la computadora de los usuarios
            

            
        }),
        new CopyPlugin({
            patterns: [
            {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}