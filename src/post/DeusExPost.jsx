import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './DeusExPost.css';
import Post from './abstract/Post.jsx';

import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';


class DeusExPost extends Post {

	getMoreProps() {

		let more = {};
		more.choices = this.post.choices
			.map(choice => this.buildGetter(NarratorGetter).narrate(choice))
			.filter((choice, index) => index === 0);

		more.extras = this.buildGetter(BinaryChoicesGetter).values;
		return more;

	}

}

module.exports = CSSModules(DeusExPost,styles,{
	errorWhenNotFound: false
});
