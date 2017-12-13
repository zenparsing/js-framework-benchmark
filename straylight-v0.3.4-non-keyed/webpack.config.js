'use strict';

var path = require('path');

module.exports = [{
	cache: {},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		],
	},
	entry: {
		main: './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			__dirname,
			path.resolve(__dirname, 'src'),
			'node_modules'
		],
		alias: {
		}
	}
}];
