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

		const narrator = this.buildGetter(NarratorGetter).values;
		const character = this.buildGetter(CharacterGetter,{
			fandom: this.post.fandom
		}).values.name;
		const chances = this.buildGetter(ChancesGetter);

		let more = {};
		more.extras = {
			character: character,
			dialog: this.buildGetter(NarratorGetter).narrate(this.post.choices[0])
		};

		let values = this.buildGetter(BinaryChoicesGetter).values;
		more.choices = this.randomNumber(109231729) >= .5 ? [values.good,values.bad]:[values.bad,values.good];
		more.choices = more.choices.map(capitalizeFirstLetter);
		return more;

	}

}

module.exports = CSSModules(ZeldaBotwPost,styles,{
	errorWhenNotFound: false
});
