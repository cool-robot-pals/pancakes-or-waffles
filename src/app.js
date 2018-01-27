import fontsTxt from 'internal-data/fonts.txt';

import changeCase from 'change-case';
import queryString from 'query-string';

import LayoutGetter from 'getter/layout';
import PostGetter from 'getter/post';

import logger from 'lib/logger';
import {parse as txtToArr} from 'lib/parser/txt';
import {makeSeed} from 'lib/random';


const posts = [];

const makePost = async (seed=makeSeed(),defaults={}) => {

	const layout = await new LayoutGetter({
		seed: seed,
		...defaults
	}).get();

	const postName = changeCase.pascal(`${layout}-post`);

	return System.import('post/'+postName+'.js') // eslint-disable-line no-undef
		.then(PostJs =>
			new PostJs.default({
				seed: seed,
				name: postName,
			})
		).then(postInstance =>
			Promise.all([
				postInstance,
				postInstance.getElement()
			])
		).then(([postInstance, $element]) => {
			posts.push(postInstance);
			document.getElementById('tough-choices-bot').appendChild($element);
		})
		.catch(err=>{
			console.error(err);
		});

};


const mochaExports = {
	PostGetter: PostGetter,
	layouts: new LayoutGetter().fetch()
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

	makePost(queryString.seed?queryString.seed:undefined);

};

boot();

export { posts, makePost, mochaExports as mocha };
