import Post from './abstract/Post.js';

import {capitalizeFirstLetter} from 'lib/stringies';
import BinaryChoicesValues from 'getter/less-common/binaryChoices';
import NarratorGetter from 'getter/less-common/narrator';

class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
	}

	async getMoreProps(post) {

		const binaryChoices = this.buildGetter(BinaryChoicesValues).values;

		for(let k in binaryChoices) {
			binaryChoices[k] = capitalizeFirstLetter(binaryChoices[k]);
		}

		let more = {
			extras : binaryChoices,
			choices: [(await this.narrator.narrate(post.choices[0]))]
		};

		return more;

	}

}

export default CustomPost;
