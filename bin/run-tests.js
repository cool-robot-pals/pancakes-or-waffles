#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const puppeteer = require('puppeteer');
const path = require('path');

const reporter = require('./tools/reporter.js');
const config = require('../.pancakerc');
const server = require('../express/app.js');

const port = 1337; /*bite me*/
const url = `http://localhost:${port}/test.html`;
const outPath = path.join(__dirname, '..', config.paths.build, config.filenames.base + '.jpg');

// Source: https://github.com/GoogleChrome/puppeteer#usage
const listenForMocha = async () => {

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	return new Promise((yay, nay) => {

		page.on('console', msg => {
			if(msg.text() === 'done'){
				yay();
			}
			else {
				console.log(msg.text());
			}
		});

		page.on('pageerror', err => {
			nay(err);
		});

		page.goto(url);

	});

};

server.listen(port, () => {
	reporter.success('Server running');
	listenForMocha()
		.then(()=>{
			reporter.success('Tests ran');
			process.exit();
		})
		.catch((err)=>{
			reporter.error(err);
			console.log(err);
			process.exit();
		});
});
