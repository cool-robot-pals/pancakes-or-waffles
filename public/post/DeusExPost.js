import Post from './abstract/Post.js';

import NarratorGetter from '../getter/less-common/narrator.js';
import BinaryChoicesGetter from '../getter/less-common/binaryChoices.js';


class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

	async getMoreProps(post) {

		let more = {};
		more.choices = await Promise.all(
			post.choices
				.map(choice => this.narrator.narrate(choice))
				.filter((choice, index) => index === 0)
		);

		more.extras = await this.choices.get();
		return more;

	}

}

export default CustomPost;
