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
	const puppeteer = require('puppeteer')
	const url = 'file://'+path.resolve(config.paths.build, config.filenames.base+'.html')
	const outPath = path.join(config.paths.build, config.filenames.base+'.jpg')
	const viewportOptions = {width: 1280, height: 720}

	// Source: https://github.com/GoogleChrome/puppeteer#usage
	const takeScreenshot = async (puppet, url, outPath, viewportOptions) => {
		const browser = await puppet.launch();
		const page = await browser.newPage();
		await page.setViewport(viewportOptions)
		await page.goto(url);
		await page.screenshot({path: outPath});

		await browser.close();
	}

	takeScreenshot(puppeteer, url, outPath, viewportOptions)
		.then(done)
		.catch(console.error)
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
