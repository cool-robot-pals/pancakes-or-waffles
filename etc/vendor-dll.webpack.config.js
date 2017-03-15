const config = require('./../bot.config.js');

const webpack = require('webpack');
const path = require('path');


module.exports = {
	entry: {
		main: ['react','react-dom','lodash','react-css-modules','es6-promise-promise']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		filename: '[name].bundle.js',
		library: '[name]_lib',
		path: config.paths.dll
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(config.paths.dll,'[name]-manifest.json'),
			name: '[name]_lib'
		}),
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise'
		}),
		new webpack.BannerPlugin({
			banner: '/* eslint-disable */',
			raw: true
		})
	]

};
