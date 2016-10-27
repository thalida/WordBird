'use strict';
var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var APP =  path.join(__dirname, '/extension/public/app');
var DIST =  path.join(__dirname, '/extension/public/dist');
console.log('APP', APP);
console.log('DIST', DIST);

module.exports = {
	context: APP,
	entry: {
		app: './'
	},
	output: {
		path: DIST,
		filename: '[name].[hash].js',
		publicPath: '/public/dist/'
	},
	resolve: {
        root: APP,
        extensions: ["", ".webpack.js", ".web.js", ".js"]
    },
	module: {
		loaders: [
            {
                test: require.resolve('angular'),
                loader: "expose?angular"
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loaders: ['ng-annotate']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url-loader!sass-loader")
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=' + APP + '/!html',
                exclude: path.resolve(APP, 'index.html')
            },
            {
                test: /\.woff(2)?(\?]?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png|gif|jpg|jpeg|wav|mp3)(\?]?.*)?$/,
                loader: 'file-loader?[path][name].[ext]'
            },
            {
                test: /\.(json)(\?]?.*)?$/,
                loader: 'json-loader'
            }
		]
	},
    plugins: [
		new ExtractTextPlugin("[name].[hash].css", {allChunks: true}),
        new HtmlWebpackPlugin({
            template: APP + '/index.html',
            inject: true
        })
    ]
};
