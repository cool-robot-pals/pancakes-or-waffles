import 'assets/reset.css';

import Post from 'component/Post';
import getValues from 'lib/getValues';
import random from 'lib/random';

import {render} from 'react-dom';
import React from 'react';

let posts = [];
let $posts = [];

const makePost = function() {

	let values = getValues();

	let post = {
		photoQuery: values.query,
		choices: values.choices,
		layout: values.layout,
		key: posts.length
	};

	let $post =  React.createElement(
		Post, post
	);

	posts.push(post);
	$posts.push($post);

	render(React.createElement(
		'div',
		null,
		$posts
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
