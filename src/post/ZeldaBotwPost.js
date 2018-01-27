import Post from './abstract/Post.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import ChancesGetter from 'getter/chances';
import CharacterGetter from 'getter/character';
import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';

class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
	}

	async getMoreProps(post) {

		const dialog = await this.narrator.narrate(post.choices[0]);
		const character = this.buildGetter(CharacterGetter).values.name;
		const chances = this.buildGetter(ChancesGetter);

		let more = {};
		more.extras = {
			character: character,
			dialog: dialog
		};

		let values = this.buildGetter(BinaryChoicesGetter).values;
		more.choices = this.randomNumber(109231729) >= .5 ? [values.good,values.bad]:[values.bad,values.good];
		more.choices = more.choices.map(capitalizeFirstLetter);
		return more;

	}

}

export default CustomPost;
