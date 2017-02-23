import 'assets/reset.css';

import getPostElement from 'lib/getPostElement';
import getValues from 'lib/getValues';
import random from 'lib/random';

import {render} from 'react-dom';
import React from 'react';

let posts = [];

const makePost = function() {

	/*
	0 - lis - serious
	1 - lis - normal
	2 - bioshock
	3 - fallout
	4 - zelda
	5 - saints row-ish
	6 - quantic dream-ish
	7 - mass effect
	*/

	let layout = random([0,1,3,4,5,6,7]);
	let values = getValues();

	posts.push(getPostElement({
		photoQuery: values.query,
		choices: values.choices,
		layout: layout,
		key: posts.length
	}));

	render(React.createElement(
		'div',
		null,
		posts
	),document.getElementById('tough-choices-bot'));

}


export default (function(){

	let lib = {};
	lib.makePost = makePost;
	lib.posts = posts;

	/*make app container*/
	let $app = document.createElement('div');
	$app.id= 'tough-choices-bot';
	document.body.appendChild($app);

	/*linked bc phantomjs is OLD*/
	let link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Roboto:400,400b|Patrick+Hand|Poiret+One|Roboto+Mono:500|Lato:700'
	link.rel = 'stylesheet';
	document.querySelector('head').appendChild(link);

	lib.makePost();

	return lib;

})();
