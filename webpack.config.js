const FileLoader           = require("file-loader");
const HtmlWebPackPlugin    = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true,
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
            }
        ]
    },

   
    plugins:[
        new HtmlWebPackPlugin({
            
            filename: 'index.html',
            template: './src/index.html'
        }),
    
        new MiniCssExtractPlugin({
            filename:'[name].css', // el [fullhash] permite que no quede el cache en la computadora de los usuarios
            

            
        }),
        new CopyPlugin({
            patterns: [
            {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}