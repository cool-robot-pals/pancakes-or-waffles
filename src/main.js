import 'assets/reset.css';

import {render} from 'react-dom';
import React from 'react';
import changeCase from 'change-case';

import OtherPost from 'component/OtherPost';

import getValues from 'lib/getValues';
import random from 'lib/random';



let posts = [];
let $posts = [];

const makePost = function() {

	let values = getValues();
	let $post;
	let post = {
		photoQuery: values.query,
		choices: values.choices,
		layout: values.layout,
		extras: [],
		variants: [],
		key: posts.length
	};

	const getPostElement = () => {
		return new Promise((resolve,reject)=>{
			System.import('component/'+changeCase.pascal(`${values.layout.name}-post`))
			.then(resolve)
			.catch(err => {
				if(err.message.indexOf('Cannot find module') > -1) {
					resolve(OtherPost);
				}
				else {
					reject(err);
				}
			});
		});
	};

	getPostElement()
	.then(Post => {
		$post = React.createElement(
			Post, post
		);
		posts.push(post);
		$posts.push($post);

		render(React.createElement(
			'div',
			null,
			$posts
		),document.getElementById('tough-choices-bot'));
	})
	.catch(console.error);

};


export default (function(){

	let lib = {};
	lib.makePost = makePost;
	lib.getValues = getValues;
	lib.posts = posts;

	/*make app container*/
	let $app = document.createElement('div');
	$app.id= 'tough-choices-bot';
	document.body.appendChild($app);

	/*linked bc phantomjs is OLD*/
	let link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css?family=Roboto:400,400b|Gentium+Book+Basic:700|Patrick+Hand|Poiret+One|Roboto+Mono:500|Lato:700';
	link.rel = 'stylesheet';
	document.querySelector('head').appendChild(link);

	lib.makePost();

	return lib;

})();
