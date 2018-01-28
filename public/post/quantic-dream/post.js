import Post from '../_abstract/post.js';

class CustomPost extends Post {
	async getMoreProps(post) {
		return {
			variants: [2],
		};
	}
}

export default CustomPost;
