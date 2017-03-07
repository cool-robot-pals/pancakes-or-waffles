import React from 'react';
import CSSModules from 'react-css-modules';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';

import styles from './DeusExPost.css';
import Post from './abstract/Post.jsx';

import NarratorValues from 'lib/values/Narrator';
import BinaryChoicesValues from 'lib/values/BinaryChoices';


class DeusExPost extends Post {

	getMoreProps() {

		let more = {};
		more.choices = this.props.choices
		.map(choice => {
			const narrator = new NarratorValues().values;
			return capitalizeFirstLetter(narrator.prefix.value)+' '+decapitalizeFirstLetter(choice);
		})
		.filter((choice, index) => index === 0);
		more.extras = new BinaryChoicesValues().values;
		return more;

	}

}

module.exports = CSSModules(DeusExPost,styles,{
	errorWhenNotFound: false
});
