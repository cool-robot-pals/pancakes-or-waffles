const config = require('./bot.config.js');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = require('./src/env.js');
const pkg = require('./package.json');


module.exports = {
	entry: {
		vendor: ['react','react-dom','lodash'],
		app: 'main'
	},
	plugins: [
		new CleanWebpackPlugin([config.paths.build]),
		new webpack.ProvidePlugin({
			Promise: 'es6-promise-promise'
		}),
		new webpack.DefinePlugin((function(){
			var rt = {};
			Object.keys(process.env).map(function(key){
				rt['process.env.'+key] = '"'+process.env[key]+'"';
			});
			return rt;
		})()),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			minChunks : 2
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: ['vendor.js']
		}),
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			template: 'bot.template.ejs',
			filename: 'index.html',
			base: `file://${__dirname}/${config.paths.build}/index.html`
		}),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			minify: {
				collapseWhitespace: true
			},
			template: 'bot.template.ejs',
			filename: '../test/basic.html',
			test: true,
			base: `file://${__dirname}/${config.paths.build}/../test/basic.html`
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, 'src/component')
				],
				loader: ExtractTextPlugin.extract([
					'css-loader?modules&importLoaders=1&localIdentName=tc-[hash:base64:10]',
					'postcss-loader',
					'./tools/randomCssLoader'
				])
			},
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader',
					options: { limit: 10 }
				}],
			},
			{
				test: /\.txt$/,
				use: ['raw-loader']
			},
			{
				test: /\.json$/,
				use: ['json-loader']
			},
			{
				test: /\.css$/,
				exclude: [
					/node_modules/,
					path.resolve(__dirname, 'src/component')
				],
				use: ExtractTextPlugin.extract({
					use: ['css-loader','postcss-loader']
				})
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'post.js',
		path: config.paths.build,
		library: 'Post',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'data': path.resolve('./data')
		},
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	}
};
