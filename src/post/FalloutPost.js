import Post from './abstract/Post.js';

import NarratorGetter from 'getter/less-common/narrator';
import FalloutGetter from 'getter/less-common/fallout';
import ChancesGetter from 'getter/chances';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import {randomNumber} from 'lib/random';


class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
		this.dialog = this.buildGetter(FalloutGetter);
		this.chances = this.buildGetter(ChancesGetter);
	}

	async parseChoice(original) {

		let choice = [];

		if(await this.chances.should('falloutRequiresSpecial')) {
			let special = await this.dialog.get();
			if(await this.chances.should('falloutRequiresSpecialNumber')) {
				special += ' '+Math.ceil(randomNumber('falloutRequiresSpecialNumber',this.seed)*10)*10;
			}
			choice.push(`[${special}]`);
		}

		if(await this.chances.should('falloutHasDialog')) {
			choice.push(await this.narrator.narrate(original));
		}
		else {
			choice.push(`<${original}>`);
		}
		return choice.join(' ');

	}

	async getMoreProps(post) {

		let more = {};
		more.choices = await(Promise.all(post.choices.map(choice => this.parseChoice(choice))));
		return more;

	}

}

export default CustomPost;
