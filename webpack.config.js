var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');

require("babel-register");

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: 'public',
        watchContentBase: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.parse']
    },
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/index.jsx'
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
            {
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new Dotenv({
            path: './.env'
        })
          
    ],
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    }
}