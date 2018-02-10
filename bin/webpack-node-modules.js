#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const webpack = require('webpack');
const WrapperPlugin = require('wrapper-webpack-plugin');
const StringReplacePlugin = require('webpack-plugin-replace');
const fs = require('fs');
const path = require('path');
const config = require('../.pancakerc');
const reporter = require('./tools/reporter.js');

const modules = [
	'query-string',
	'seedrandom',
	'pluralize',
	'number2text',
	'tensify',
	'conjugate',
	'mocha/mocha.js'
];

try {
	fs.mkdirSync(path.join(__dirname,'..', config.paths.build));
	fs.mkdirSync(path.join(__dirname,'..', config.paths.build, 'npm'));
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

	return new Promise(yay => {

		webpack({
			entry: entry,
			output: {
				path: path.resolve(path.join(__dirname, '..', config.paths.build, 'npm')),
				filename: `${module.replace('.js','')}.js`,
				library: '_217878383_',
				libraryTarget: 'var',
			},
			node: {
				fs: 'empty'
			},
			plugins: [
				new WrapperPlugin({
					footer: 'export default _217878383_'
				}),
				new StringReplacePlugin({
					values: {
						'this.module !== module': 'true'
					}
				})
			],
		}, (err, stats) => {
			if (err || stats.hasErrors()) {
				throw new Error([err, stats]);
			}
			else {
				yay();
			}
		});
	});
};

modules.forEach(module =>
	webpackify(module)
		.then(info=> reporter.success(`Done: ${module}`))
		.catch(err => reporter.error(err))
);
