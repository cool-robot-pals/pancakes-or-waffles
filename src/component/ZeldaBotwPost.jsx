import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './ZeldaBotwPost.css';
import Post from './abstract/Post.jsx';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import ChancesGetter from 'getter/chances';
import CharacterGetter from 'getter/character';
import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';

class ZeldaBotwPost extends Post {

	getMoreProps() {

		const narrator = new NarratorGetter().values;
		const character = new CharacterGetter({
			fandom: this.props.fandom
		}).value.name;
		const chances = new ChancesGetter();

		let more = {};
		more.extras = {
			character: character,
			dialog: new NarratorGetter().narrate(this.props.choices[0])
		};

		let values = new BinaryChoicesGetter().values;
		more.choices = Math.random() >= .5 ? [values.good,values.bad]:[values.bad,values.good];
		more.choices = more.choices.map(capitalizeFirstLetter);
		return more;

	}

}

module.exports = CSSModules(ZeldaBotwPost,styles,{
	errorWhenNotFound: false
});
