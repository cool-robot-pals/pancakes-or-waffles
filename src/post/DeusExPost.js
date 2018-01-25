import Post from './abstract/Post.js';

import NarratorGetter from 'getter/less-common/narrator';
import BinaryChoicesGetter from 'getter/less-common/binaryChoices';


class CustomPost extends Post {

	getMoreProps() {

		let more = {};
		more.choices = this.post.choices
			.map(choice => this.buildGetter(NarratorGetter).narrate(choice))
			.filter((choice, index) => index === 0);

		more.extras = this.buildGetter(BinaryChoicesGetter).values;
		return more;

	}

}

export default CustomPost;
