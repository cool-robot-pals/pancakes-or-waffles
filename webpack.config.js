const config = require('./.pancakerc');

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: 'app'
	},
	plugins: [
		new CleanWebpackPlugin(
			[config.paths.build]
		),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: [/node_modules/]
		})
	],
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: ['raw-loader']
			},
			{
				test: /\.yaml$/,
				use: ['yaml-loader']
			},
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
				],
				use: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'post.js',
		path: path.resolve(__dirname, config.paths.build),
		publicPath: '/',
		library: 'Pancakes',
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'corpus': path.resolve(__dirname,'corpus'),
			'data': path.resolve(__dirname,'data')
		},
		modules: [
			path.resolve(__dirname,'src'),
			'node_modules'
		]
	}
};
