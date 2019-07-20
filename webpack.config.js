//这个配置文件，通过node中的模块操作，向外暴露一个 配置对象
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口
    output: { //出口
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
}