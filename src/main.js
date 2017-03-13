import 'assets/reset.css';

import {render} from 'react-dom';
import React from 'react';
import changeCase from 'change-case';

import layoutGetter from 'getter/layout';
import getValues from 'lib/getValues';
import random from 'lib/random';
import txtToArr from 'lib/txtToArr';

import fontsTxt from 'internal-data/fonts.txt';


let $posts = [];
let posts = [];
let layouts = new layoutGetter().layouts;

const makePost = (defaults={}) => {

	let values = getValues();
	let layout = new layoutGetter(defaults).value;

	System.import('component/'+changeCase.pascal(`${layout}-post`))
	.then(Post => {

		let $post = React.createElement(
			Post,
			{
				photoQuery: values.query,
				choices: values.choices,
				fandom: values.fandom,
				extras: [],
				variants: [],
				key: $posts.length
			}
		);

		$posts.push($post);
		posts.push({
			photoQuery: $post.props.photoQuery,
			choices: $post.props.choices,
			layout: layout,
			$element: $post
		});

		render(React.createElement(
			'div',
			null,
			$posts
		),document.getElementById('tough-choices-bot'));

	})
	.catch(console.error);

};


const exportable = (()=>{

	let lib = {};
	lib.makePost = makePost;
	lib.getValues = getValues;
	lib.posts = posts;
	lib.layouts = layouts;

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

	lib.makePost();

	return lib;

})();

export default exportable;
module.exports = exportable;
