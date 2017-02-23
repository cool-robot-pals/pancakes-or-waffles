const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const webshot = require('gulp-webshot');
const fs = require('fs-extra');
const gutil = require('gulp-util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const env = require('./src/env.js');
const pkg = require('./package.json');

var webpackConfig = {
	devtool: "source-map",
	entry: {
		vendor: ['react','react-dom','lodash'],
		app: 'main'
	},
	plugins: [
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
		new ExtractTextPlugin('[name].css'),
		new HtmlWebpackPlugin({
			title: '👁👄👁☝️'
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
				use: [{
					loader: 'babel-loader',
					query: {
						plugins: [
							"transform-decorators-legacy",
							"transform-object-assign"
						],
						presets: [
							['react'],
							['target', {
								presets: ["es2015"],
								targets: [
									{name: "phantom", version: 2}
								],
								modules: false
							}],
						]
					}
				}]
			}
		]
	},
	output: {
		filename: 'post.js',
		library: 'Post',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	}
};


gulp.task('tweet',function(done){
	var Twit = require('twit');
	if(env.twitterConsumerKey){
		var T = new Twit({
			consumer_key:         env.twitterConsumerKey,
			consumer_secret:      env.twitterConsumerSecret,
			access_token:         env.twitterAccess,
			access_token_secret:  env.twitterSecret
		});
		var b64content = fs.readFileSync('build/post.jpg', { encoding: 'base64' });
		T.post('media/upload', { media_data: b64content }, function (err, data, response) {
			var params = { status: '', media_ids: [data.media_id_string] };
			T.post('statuses/update', params, function (err, data, response) {
				if(err) {
					throw new gutil.PluginError({
						plugin: 'tweet',
						message: err
					});
				}
				else {
					done();
				}
			});
		});
	} else {
		throw new gutil.PluginError({
			plugin: 'tweet',
			message: 'Environment is undefined'
		});
	}
});


gulp.task('webshot',function(done){
	var webshot = require('webshot');
	var options = {
		renderDelay: 20000,
		siteType: 'file',
		phantomConfig: {
			'local-to-remote-url-access':'true',
			'web-security':'false'
		},
		userAgent: 'Mozilla/4.0 (iPad; CPU OS 4_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.1 Mobile/9A405 Safari/7534.48.3',
		errorIfJSException: true,
		quality: 90,
		screenSize: {
			width: 1280,
			height: 720
		}
	};
	webshot('build/index.html', 'build/post.jpg', options, function(err) {
		if(err) {
			console.error(err);
		}
		else {
			done();
		}
	});
});


gulp.task('_makefiles',function(done){
	fs.removeSync('build');
	fs.mkdirsSync('build');
	done();
});


gulp.task('_makejs', function() {
	return gulp.src('src/main.js')
		.pipe(webpackStream(webpackConfig,webpack))
		.on('error', err => {
			gutil.log('WEBPACK ERROR', err);
		})
		.pipe(gulp.dest('build/'));
});


gulp.task('watch',function() {
	webpackConfig.watch = true;
	return gulp.src('src/main.js')
		.pipe(webpackStream(webpackConfig,webpack))
		.on('error', err => {
			gutil.log('WEBPACK ERROR', err);
		})
		.pipe(gulp.dest('build/'));
});


gulp.task('default',
	gulp.series('_makefiles','_makejs')
);


gulp.task('shitpost',
	gulp.series('default','webshot','tweet')
);
