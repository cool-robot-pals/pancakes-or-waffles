import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './QueerbaitPost.css';
import Post from './abstract/Post.jsx';


class QueerbaitPost extends Post {
	getMoreProps() {
		return {
			variants: [2],
		};
	}
}

module.exports = CSSModules(QueerbaitPost,styles,{
	errorWhenNotFound: false
});
