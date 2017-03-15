import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './QuanticDreamPost.css';
import Post from './abstract/Post.jsx';


class QuanticDreamPost extends Post {
	getMoreProps() {
		return {
			variants: [2],
		};
	}
}

module.exports = CSSModules(QuanticDreamPost,styles,{
	errorWhenNotFound: false
});
