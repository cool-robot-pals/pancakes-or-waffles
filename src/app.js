import css from 'assets/reset.css';
import fontsTxt from 'internal-data/fonts.txt';

import changeCase from 'change-case';
import queryString from 'query-string';

import LayoutGetter from 'getter/layout';
import PostGetter from 'getter/post';

import logger from 'lib/logger';
import txtToArr from 'lib/txtToArr';
import {makeSeed} from 'lib/random';
import {getRandomCss} from 'lib/getRandomCss';


const posts = [];
const layouts = new LayoutGetter().layouts;

const makePost = (seed=makeSeed(),defaults={}) => {

	const layout = new LayoutGetter({
		seed: seed,
		...defaults
	}).value;

	const postname = changeCase.pascal(`${layout}-post`);

	return System.import('post/'+postname) // eslint-disable-line no-undef
		.then(PostJs =>
			new PostJs.default({
				seed: seed,
			})
		).then(postInstance =>
			Promise.all([
				postInstance,
				postInstance.onReadyState
			])
		).then(([postInstance]) => {
			posts.push(postInstance);
			document.getElementById('tough-choices-bot').appendChild(postInstance.$element);
		})
		.catch(err=>{
			console.error(err);
		});

};

const mochaExports = {
	PostGetter: PostGetter,
	layouts: layouts
};

const boot = () => {

	/*qs*/
	const queryStringParser = require('query-string');
	const queryString = queryStringParser.parse(location.search);

	/*make app container*/
	let $app = document.createElement('div');
	$app.id= 'tough-choices-bot';
	document.body.appendChild($app);

	/*linked bc phantomjs is OLD*/
	let link = document.createElement('link');
	let fonts = txtToArr(fontsTxt);
	link.href = 'https://fonts.googleapis.com/css?family='+fonts.map(font => font.value).join('|');
	link.rel = 'stylesheet';
	document.querySelector('head').appendChild(link);

	getRandomCss().forEach(variable=>{
		document.body.style.setProperty(`--${variable.name}`, variable.value);
	});

	makePost(queryString.seed?queryString.seed:undefined);

};

boot();

export { posts, makePost, mochaExports as mocha };
