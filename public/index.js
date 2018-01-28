import changeCase from '/target/npm/change-case.js';
import queryStringParser from '/target/npm/query-string.js';

import LayoutGetter from './getter/layout.js';
import PostGetter from './getter/post.js';

import logger from './lib/logger.js';
import {makeSeed} from './lib/random.js';


const posts = [];

const makePost = async (seed=makeSeed(),defaults={}) => {

	const layout = await new LayoutGetter({
		seed: seed,
		...defaults
	}).get();

	const postName = changeCase.pascal(`${layout}-post`);

	return import('./post/'+postName+'.js') // eslint-disable-line no-undef
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
	const queryString = queryStringParser.parse(location.search);

	/*make app container*/
	let $app = document.createElement('div');
	$app.id= 'tough-choices-bot';
	document.body.appendChild($app);

	/*linked bc phantomjs is OLD*/
	let link = document.createElement('link');
	let fonts = [
		'Roboto:400,500i',
		'Gentium+Book+Basic:700',
		'Patrick+Hand',
		'Poiret+One',
		'Roboto+Mono:500',
		'Lato:700,400',
		'Tulpen+One',
	];
	link.href = 'https://fonts.googleapis.com/css?family='+fonts.join('|');
	link.rel = 'stylesheet';
	document.querySelector('head').appendChild(link);

	makePost(queryString.seed?queryString.seed:undefined);

};

boot();

export { posts, makePost, mochaExports as mocha };
