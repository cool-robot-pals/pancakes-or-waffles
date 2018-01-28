import Post from './abstract/Post.js';

import {capitalizeFirstLetter} from '../lib/stringies.js';
import BinaryChoicesGetter from '../getter/less-common/binaryChoices.js';
import NarratorGetter from '../getter/less-common/narrator.js';

class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

	async getMoreProps(post) {

		const binaryChoices = await this.choices.get();

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
