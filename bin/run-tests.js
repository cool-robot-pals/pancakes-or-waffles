#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const puppeteer = require('puppeteer');
const path = require('path');

const reporter = require('./tools/reporter.js');
const config = require('../bot.config.js');
const server = require('../express/app.js');

const port = 1337; /*bite me*/
const url = `http://localhost:${port}/test.html`;
const outPath = path.join(__dirname, '..', config.paths.build, config.filenames.base + '.jpg');

// Source: https://github.com/GoogleChrome/puppeteer#usage
const listenForMocha = async () => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox']
	});
	const page = await browser.newPage();
	await Promise.all(page.goto(url));

  page.on('console', msg => {
    console.log(msg);
  });

	await page.waitFor(2000);
	await browser.close();
	return log;
};

server.listen(port, ()=>{
	reporter.success('Server running');
	listenForMocha().then((log)=>{
		reporter.success('Tests ran');
		process.exit();
	}).catch(reporter.error);
});
