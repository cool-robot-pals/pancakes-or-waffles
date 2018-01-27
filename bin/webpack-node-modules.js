#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const modules = ['change-case','query-string'];

try {
	fs.mkdirSync(path.join(__dirname,'..','target'));
	fs.mkdirSync(path.join(__dirname,'..','target','npm'));
} catch(e){}

const webpackify = (module) => {
	const info = JSON.parse(fs.readFileSync(path.join(__dirname,'..',`node_modules/${module}/package.json`)));
	if(!info.main) info.main = 'index.js';

	webpack({
		entry: path.join(__dirname,'..',`node_modules/${module}/${info.main}`),
	  output: {
			path: path.resolve(path.join(__dirname,'..','target','npm')),
			filename: `${module}.js`
	  }
	}, (err, stats) => {
		if (err || stats.hasErrors()) {
			console.error(err, stats)
		}
		else {
			console.info(stats);
		}
	});

}

modules.forEach(webpackify);
