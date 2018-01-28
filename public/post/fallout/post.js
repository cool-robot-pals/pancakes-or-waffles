import Post from '../_abstract/post.js';

import NarratorGetter from '../../getter/less-common/narrator.js';
import FalloutGetter from '../../getter/less-common/fallout.js';
import ChancesGetter from '../../getter/chances.js';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../../lib/stringies.js';
import {randomNumber} from '../../lib/random.js';


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
				special += ' '+Math.ceil(randomNumber('falloutRequiresSpecialNumber',this._seed)*10)*10;
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
