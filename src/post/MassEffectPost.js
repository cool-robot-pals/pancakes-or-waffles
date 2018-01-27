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
