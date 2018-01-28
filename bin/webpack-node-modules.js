#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const webpack = require('webpack');
const WrapperPlugin = require('wrapper-webpack-plugin');
const fs = require('fs');
const path = require('path');

const modules = [
	'change-case',
	'query-string',
	'seedrandom',
	'pluralize',
	'number2text'
];

try {
	fs.mkdirSync(path.join(__dirname,'..','target'));
	fs.mkdirSync(path.join(__dirname,'..','target','npm'));
} catch(e){
	/**/
}

const webpackify = (module) => {

	const entry = (()=>{
		if(module.indexOf('.js') > -1) {
			return path.join(__dirname,'..',`node_modules/${module}`);
		}
		else {
			const info = JSON.parse(fs.readFileSync(path.join(__dirname,'..',`node_modules/${module}/package.json`)));
			if(!info.main) info.main = 'index.js';
			return path.join(__dirname,'..',`node_modules/${module}/${info.main}`);
		}
	})();

	webpack({
		entry: entry,
		output: {
			path: path.resolve(path.join(__dirname,'..','target','npm')),
			filename: `${module.replace('.js','')}.js`,
			library: '_217878383_',
			libraryTarget: 'var',
		},
		plugins: [
			new WrapperPlugin({
				footer: 'export default _217878383_'
			})
		]
	}, (err, stats) => {
		if (err || stats.hasErrors()) {
			console.error(err, stats);
		}
	});

};

modules.forEach(webpackify);
