import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './MassEffectPost.css';
import Post from './abstract/Post.jsx';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';

import ChancesGetter from 'getter/chances';
import CharacterGetter from 'getter/character';
import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';

class MassEffectPost extends Post {

	getMoreProps() {

		const character = this.buildGetter(CharacterGetter).values.name;
		const chances = this.buildGetter(ChancesGetter);

		if(chances.should('massEffectHasDialog')){
			let more = {};
			more.extras = {
				dialog: character+': '+this.buildGetter(NarratorGetter).narrate(this.post.choices[0])
			};

			let values = this.buildGetter(BinaryChoicesGetter).values;
			more.choices = this.randomNumber('moreChoices') >= .5 ? [`[${values.good}]`,`[${values.bad}]`]:[`[${values.bad}]`,`[${values.good}]`];
			return more;
		}

	}

}

module.exports = CSSModules(MassEffectPost,styles,{
	errorWhenNotFound: false
});
