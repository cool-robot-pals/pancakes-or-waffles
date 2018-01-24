#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const path = require('path');
const Twit = require('twit');
const fs = require('fs');
const reporter = require('./tools/reporter.js');
const config = require('../.pancakerc');

if(process.env.MC_TWITTER_APPK){
	var T = new Twit({
		consumer_key: process.env.MC_TWITTER_APPK,
		consumer_secret: process.env.MC_TWITTER_APPS,
		access_token: process.env.MC_TWITTER_AT,
		access_token_secret: process.env.MC_TWITTER_S
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
				reporter.error(err);
			}
			else {
				reporter.success('Posted');
				process.exit();
			}
		});
	});
} else {
	reporter.error('Missing env variables');
}
