import Post from './abstract/Post.js';

import OblivionDateGetter from 'getter/less-common/oblivion';


class CustomPost extends Post {
	async getMoreProps(post) {
		return {
			extras: await this.buildGetter(OblivionDateGetter).get()
		};
	}
}

export default CustomPost;
