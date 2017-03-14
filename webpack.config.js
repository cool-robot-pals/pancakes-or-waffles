const config = require('./bot.config.js');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const env = require('./src/env.js');
const pkg = require('./package.json');


module.exports = {
	entry: {
		app: 'main',
		promise: 'es6-promise-promise'
	},
	plugins: [
		new CleanWebpackPlugin(
			[config.paths.build]
		),
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require(path.resolve('.',config.paths.dll,'main-manifest.json'))
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'promise',
			filename: 'promise.js',
			minChunks : 0
		}),
		new webpack.DefinePlugin((function(){
			var rt = {};
			Object.keys(process.env).map(function(key){
				rt['process.env.'+key] = '"'+process.env[key]+'"';
			});
			return rt;
		})()),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: [/node_modules/]
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 333000
		}),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			template: 'bot.template.ejs',
			filename: `${config.filenames.base}.html`,
			base: `file://${__dirname}/${config.paths.build}/${config.filenames.base}.html`
		}),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️',
			minify: {
				collapseWhitespace: true
			},
			template: 'bot.template.ejs',
			filename: `../${config.paths.test}/${config.filenames.test}.html`,
			test: true,
			base: `file://${__dirname}/${config.paths.build}/${config.filenames.base}.html`
		}),
		new AddAssetHtmlPlugin({
			filepath: require.resolve(path.resolve(config.paths.dll,'main.bundle.js')),
			includeSourcemap: false
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, 'src/component')
				],
				use: ExtractTextPlugin.extract([
					'css-loader?modules&importLoaders=1&localIdentName=tc-[hash:base64:10]',
					'postcss-loader',
					'./'+config.paths.tools+'/randomCssLoader'
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
				test: /\.yaml$/,
				use: ['yaml-loader']
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
				exclude: [
					/node_modules/,
				],
				use: 'babel-loader'
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
			'corpus': path.resolve('./corpus'),
			'data': path.resolve('./data')
		},
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	}
};
