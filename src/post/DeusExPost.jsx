import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './DeusExPost.css';
import Post from './abstract/Post.jsx';

import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesValues from 'getter/less-common/binaryChoices';


class DeusExPost extends Post {

	getMoreProps() {

		let more = {};
		more.choices = this.props.choices
			.map(choice => new NarratorGetter().narrate(choice))
			.filter((choice, index) => index === 0);

		more.extras = new BinaryChoicesValues().values;
		return more;

	}

}

module.exports = CSSModules(DeusExPost,styles,{
	errorWhenNotFound: false
});
