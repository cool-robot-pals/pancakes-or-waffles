import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './MassEffectPost.css';
import Post from './abstract/Post.jsx';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import {randomNumber} from 'lib/random';

import ChancesGetter from 'getter/chances';
import CharacterGetter from 'getter/character';
import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';

class MassEffectPost extends Post {

	getMoreProps() {

		const character = new CharacterGetter({
			seed: this.seed,
			fandom: this.post.fandom
		}).values.name;
		const chances = new ChancesGetter({
			seed: this.seed
		});

		if(chances.should('massEffectHasDialog')){
			let more = {};
			more.extras = {
				dialog: character+': '+new NarratorGetter({
					seed: this.seed
				}).narrate(this.post.choices[0])
			};

			let values = new BinaryChoicesGetter({
				seed: this.seed
			}).values;
			more.choices = randomNumber('moreChoices',this.seed) >= .5 ? [`[${values.good}]`,`[${values.bad}]`]:[`[${values.bad}]`,`[${values.good}]`];
			return more;
		}

	}

}

module.exports = CSSModules(MassEffectPost,styles,{
	errorWhenNotFound: false
});
