import 'assets/reset.css';

import {render} from 'react-dom';
import React from 'react';

import LayoutGetter from 'getter/layout';
import PostGetter from 'getter/post';

import changeCase from 'change-case';
import logger from 'lib/logger';

import txtToArr from 'lib/txtToArr';
import fontsTxt from 'internal-data/fonts.txt';


let $posts = [];
let posts = [];
let layouts = new LayoutGetter().layouts;

const makePost = (defaults={}) => {

	let values = new PostGetter().values;
	let layout = new LayoutGetter(defaults).value;

	let post = {
		layout: layout,
		log: function(){
			return logger(this);
		}
	};
	posts.push(post);

	System.import('post/'+changeCase.pascal(`${layout}-post`))
	.then(Post => {

		let $post = React.createElement(
			Post,
			{
				key: $posts.length,
				onUpdate: (state) => {
					Object.assign(post,state);
				}
			}
		);

		$posts.push($post);

		render(React.createElement(
			'div',
			null,
			$posts
		),document.getElementById('tough-choices-bot'));

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