'use strict';
var webpack = require('webpack');
var path = require('path');

var APP = __dirname + '/extension/popup';

module.exports = {
	context: APP,
	entry: {
		app: './app.js'
	},
	output: {
		path: APP + '/bundle',
		filename: 'bundle.js',
		publicPath: '/popup/bundle/'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	}
};
