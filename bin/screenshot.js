#!/usr/bin/env node
/*eslint no-console:0 */
/*global window */

require('dotenv').config();

const puppeteer = require('puppeteer');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const reporter = require('./tools/reporter.js');
const config = require('../.pancakerc');
const server = require('../express/app.js');

const port = 1337; /*bite me*/
const url = `https://localhost:${port}/`;
const outPath = path.join(__dirname, '..', config.paths.build, config.filenames.base + '.jpg');

// Source: https://github.com/GoogleChrome/puppeteer#usage
const takeScreenshot = async () => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		ignoreHTTPSErrors: true
	});
	const page = await browser.newPage();
	await Promise.all([
		page.setViewport({ width: 1280, height: 720 }),
		page.goto(url)
	]);
	await page.waitFor(2000);
	const log = await page.evaluate(() =>
		window.Pancakes.posts[0].logState()
	);
	await page.screenshot({ path: outPath });

	await browser.close();

	return log;
};

server.listen(port, ()=>{
	reporter.success('Server running');
	takeScreenshot().then((log)=>{
		reporter.success('Screenshot taken');
		console.log(log.join('\n'));
		process.exit();
	}).catch(reporter.error);
});
