const config = require('./bot.config.js');

const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const gutil = require('gulp-util');
const argv = require('minimist')(process.argv.slice(2));

const env = require('./src/env.js');
const fetchRandomImage = require('./etc/tools/fetchRandomImage.js');

gulp.task('tweet', done => {
	var Twit = require('twit');
	if(env.twitterConsumerKey){
		var T = new Twit({
			consumer_key: env.twitterConsumerKey,
			consumer_secret: env.twitterConsumerSecret,
			access_token: env.twitterAccess,
			access_token_secret: env.twitterSecret
		});
		var b64content = fs.readFileSync(
			path.join(config.paths.build,config.filenames.base+'.jpg'),
			{
				encoding: 'base64'
			}
		);
		T.post('media/upload', { media_data: b64content }, (err, data, response) => {
			var params = { status: '', media_ids: [data.media_id_string] };
			T.post('statuses/update', params, (err, data, response) => {
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


gulp.task('upload', done => {

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


gulp.task('webshot', done => {
	const webshot = require('webshot');
	const options = {
		renderDelay: 20000,
		phantomConfig: {
			'local-to-remote-url-access':'true',
			'web-security':'false'
		},
		userAgent: 'Mozilla/4.0 (iPad; CPU OS 4_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.1 Mobile/9A405 Safari/7534.48.3',
		quality: 100,
		onLoadFinished: function(){
			setTimeout(function(){
				var log = (window.Post.posts[0].log());
				log.map(function(line){console.log(line);});
			},2000);
		},
		onConsoleMessage: function(text){
			gutil.log(text);
		},
		phantomPath: require('phantomjs-prebuilt').path,
		errorIfJSException: true,
		screenSize: {
			width: 1280,
			height: 720
		}
	};

	let url = 'file://'+path.resolve(config.paths.build, config.filenames.base+'.html');
	if(argv && argv.seed) url += '?seed='+argv.seed;

	webshot(
		url,
		path.join(config.paths.build, config.filenames.base+'.jpg'),
		options,
		err => {
			if(err) console.error(err);
			else done();
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
	.src(
		path.join(config.paths.test, config.filenames.test+'.html')
	)
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


gulp.task('fetchRandomImage', function(done) {
	fetchRandomImage().then(()=>{
    done();
  })
});


gulp.task('test',
	gulp.series('mocha')
);


gulp.task('shitpost',
	gulp.series('webpack','fetchRandomImage','webshot','tweet')
);


gulp.task('localpost',
	gulp.series('webpack','fetchRandomImage','webshot','upload')
);
