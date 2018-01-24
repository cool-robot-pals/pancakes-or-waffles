import css from 'assets/reset.css';
import fontsTxt from 'internal-data/fonts.txt';

import {render} from 'react-dom';
import React from 'react';
import changeCase from 'change-case';
import queryString from 'query-string';

import LayoutGetter from 'getter/layout';
import PostGetter from 'getter/post';

import logger from 'lib/logger';
import txtToArr from 'lib/txtToArr';
import {makeSeed} from 'lib/random';


let $posts = [];
let posts = [];
let layouts = new LayoutGetter().layouts;

const makePost = (seed=makeSeed(),defaults={}) => {

	let layout = new LayoutGetter({
		seed: seed,
		...defaults
	}).value;

	let post = {
		layout: layout,
		log: function(){
			return logger(this);
		}
	};
	posts.push(post);

	System.import('post/'+changeCase.pascal(`${layout}-post`)) // eslint-disable-line no-undef
		.then(Post =>
			new Post({
					seed: seed,
			})
		).then(postInstance =>
			Promise.all([
				postInstance,
				postInstance.onReadyState
			])
		).then(([postInstance]) => {
			$posts.push(postInstance);
			document.getElementById('tough-choices-bot').appendChild(postInstance.$element);
		})
		.catch(console.error);

};


const exportable = (()=>{

	let lib = {
		makePost: makePost,
		posts: posts,
		mocha: {
			PostGetter: PostGetter,
			layouts: layouts
		}
	};

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

	lib.makePost(queryString.seed?queryString.seed:undefined);

	return lib;

})();

export default exportable;
module.exports = exportable;
