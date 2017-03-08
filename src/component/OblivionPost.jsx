import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './OblivionPost.css';
import Post from './abstract/Post.jsx';

import OblivionValues from 'getter/less-common/oblivion';


class OblivionPost extends Post {
	getMoreProps() {
		return {
			extras: new OblivionValues().values
		};
	}
}

module.exports = CSSModules(OblivionPost,styles,{
	errorWhenNotFound: false
});
