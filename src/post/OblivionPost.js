import Post from './abstract/Post.js';

import OblivionValues from 'getter/less-common/oblivion';


class CustomPost extends Post {
	getMoreProps(post) {
		return {
			extras: new OblivionValues({
				seed: this.seed
			}).values
		};
	}
}

export default CustomPost;
