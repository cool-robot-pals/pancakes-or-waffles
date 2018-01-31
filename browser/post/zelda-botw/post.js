import Post from '../_abstract/post.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../../lib/stringies.js';
import ChancesGetter from '../../getter/chances.js';
import CharacterGetter from '../../getter/character.js';
import NarratorGetter from '../../getter/narrator.js';
import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';

class CustomPost extends Post {

	buildGetters() {
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
