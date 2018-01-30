import Post from '../_abstract/post.js';

import ConsequenceGetter from '../../getter/consequence.js';

class CustomPost extends Post {

	buildGetters() {
		this.consequence = this.buildGetter(ConsequenceGetter);
	}

	async getMoreProps(post) {

		console.log(await this.consequence.getArray(3));

		return {};

	}

}

export default CustomPost;
