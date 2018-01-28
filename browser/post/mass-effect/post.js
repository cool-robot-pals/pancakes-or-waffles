import Post from '../_abstract/post.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../../lib/stringies.js';

import ChancesGetter from '../../getter/chances.js';
import CharacterGetter from '../../getter/character.js';
import NarratorGetter from '../../getter/less-common/narrator.js';
import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';

class CustomPost extends Post {

	buildGetters() {
		this.narrator = this.buildGetter(NarratorGetter);
		this.chances = this.buildGetter(ChancesGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
		this.character = this.buildGetter(CharacterGetter);
	}

	async getMoreProps(post) {

		const character = (await this.character.get()).name;

		if(await this.chances.should('massEffectHasDialog')){
			let more = {};
			more.extras = {
				dialog: `${character}: ${await this.narrator.narrate(post.choices[0])}`
			};

			const values = await this.choices.get();
			more.choices = this.randomNumber('moreChoices') >= .5 ? [`[${values.good}]`,`[${values.bad}]`]:[`[${values.bad}]`,`[${values.good}]`];
			return more;
		}
		else {
			return {};
		}

	}

}

export default CustomPost;
