import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './ShakePost.css';
import Post from './abstract/Post.jsx';

import {decapitalizeFirstLetter} from 'lib/stringies';

class ShakePost extends Post {

	getMoreProps() {

 		return {
			variants: [2,2,2,2],
			choices: ['Shake the controller to '+decapitalizeFirstLetter(this.post.choices[0])]
		};

	}

}

module.exports = CSSModules(ShakePost,styles,{
	errorWhenNotFound: false
});
