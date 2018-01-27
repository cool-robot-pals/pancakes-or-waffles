import Post from './abstract/Post.js';

import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';


class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.narrator = this.buildGetter(NarratorGetter);
	}

	async getMoreProps(post) {

		let more = {};
		more.choices = post.choices
			.map(async (choice) => await this.narrator.narrate(choice))
			.filter((choice, index) => index === 0);

		more.extras = this.buildGetter(BinaryChoicesGetter).values;
		return more;

	}

}

export default CustomPost;
