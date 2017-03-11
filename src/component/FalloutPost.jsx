import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './FalloutPost.css';
import Post from './abstract/Post.jsx';

import NarratorValues from 'getter/less-common/narrator';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';


class FalloutPost extends Post {

	getMoreProps() {

		let more = {};

		if(Math.random() > .5) {
			more.choices = this.props.choices
			.map(choice => {
				const narrator = new NarratorValues().values;
				return capitalizeFirstLetter(narrator.prefix.value)+' '+decapitalizeFirstLetter(choice);
			});
		}
		else {
			more.choices = this.props.choices
			.map(choice => `[${choice}]` );
		}

		return more;

	}

}

module.exports = CSSModules(FalloutPost,styles,{
	errorWhenNotFound: false
});
