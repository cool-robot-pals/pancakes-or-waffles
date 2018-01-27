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
		this.choices = this.buildGetter(BinaryChoicesGetter);
		this.character = this.buildGetter(CharacterGetter);
	}

	async getMoreProps(post) {

		const dialog = await this.narrator.narrate(post.choices[0]);
		const character = (await this.character.get()).name;
		const choices = await this.choices.get();

		let more = {};
		more.extras = {
			character: character,
			dialog: dialog
		};

		more.choices = [choices.good,choices.bad];
		more.choices = more.choices.map(capitalizeFirstLetter);
		if(this.randomNumber(109231729) >= .5){
			more.choices = more.choices.reverse();
		}
		return more;

	}

}

export default CustomPost;
