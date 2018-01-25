import Post from './abstract/Post.js';

import NarratorGetter from 'getter/less-common/narrator';
import FalloutGetter from 'getter/less-common/fallout';
import ChancesGetter from 'getter/chances';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import {randomNumber} from 'lib/random';


class CustomPost extends Post {

	parseChoice(original) {

		const foValues = this.buildGetter(FalloutGetter);
		const chances = this.buildGetter(ChancesGetter);
		let choice = [];

		if(chances.should('falloutRequiresSpecial')) {
			let special = foValues.values.special;
			if(chances.should('falloutRequiresSpecialNumber')) {
				special += ' '+Math.ceil(randomNumber('falloutRequiresSpecialNumber',this.seed)*10)*10;
			}
			choice.push(`[${special}]` );
		}

		if(chances.should('falloutHasDialog')) {
			choice.push(this.buildGetter(NarratorGetter).narrate(original));
		}
		else {
			choice.push(`<${original}>`);
		}
		return choice.join(' ');

	}

	getMoreProps() {

		let more = {};
		more.choices = this.post.choices.map(choice => this.parseChoice(choice));
		return more;

	}

}

export default CustomPost;
