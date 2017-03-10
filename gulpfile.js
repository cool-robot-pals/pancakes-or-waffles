const config = require('./bot.config.js');

const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const gutil = require('gulp-util');

const env = require('./src/env.js');


gulp.task('tweet',function(done){
	var Twit = require('twit');
	if(env.twitterConsumerKey){
		var T = new Twit({
			consumer_key:         env.twitterConsumerKey,
			consumer_secret:      env.twitterConsumerSecret,
			access_token:         env.twitterAccess,
			access_token_secret:  env.twitterSecret
		});
		var b64content = fs.readFileSync(path.join(config.paths.build,`${config.filenames.base}.jpg`), { encoding: 'base64' });
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


gulp.task('upload', function (done) {

	const spawn = require('child_process').spawn;
	const child = spawn('curl',[
		'--upload-file',
		`./${path.join(config.paths.build,`${config.filenames.base}.jpg`)}`,
		'https://transfer.sh/'
	]);

	child.stdout.on('data', buffer => {
		gutil.log('Look at it!!!', gutil.colors.magenta(buffer.toString().replace('\n','')));
	});
	child.stdout.on('end', done);

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
		quality: 100,
		onLoadFinished: function(){
			console.log(window.Post.default.posts.length);
			for(var k in window.Post.default.posts[0]) {
				if(k[0]!=='$') console.log(k.toUpperCase()+' - '+JSON.stringify(window.Post.default.posts[0][k]));
			}
		},
		onConsoleMessage: function(text){
			gutil.log(text);
		},
		phantomPath: require('phantomjs2').path,
		errorIfJSException: true,
		screenSize: {
			width: 1280,
			height: 720
		}
	};
	webshot(
		path.join(config.paths.build,'index.html'),
		path.join(config.paths.build,`${config.filenames.base}.jpg`),
		options,
		function(err) {
			if(err) {
				console.error(err);
			}
			else {
				done();
			}
		}
	);
});


gulp.task('webpack', function(done) {
	webpack(require('./webpack.config.js'),(err,stats)=>{
		if(err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString());
		done();
	});
});


gulp.task('mocha', function(done) {
	const mochaPhantomJS = require('gulp-mocha-phantomjs');
	return gulp
	.src('test/basic.html')
	.pipe(
		mochaPhantomJS({
			suppressStderr: false,
			phantomjs: {
				settings: {
					webSecurityEnabled: false,
					localToRemoteUrlAccessEnabled: true
				}
			}
		})
	);
});


gulp.task('test',
	gulp.series('mocha')
);


gulp.task('shitpost',
	gulp.series('webpack','webshot','tweet')
);


gulp.task('localpost',
	gulp.series('webpack','webshot','upload')
);
