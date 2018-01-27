import Post from './abstract/Post.js';


class CustomPost extends Post {
	async getMoreProps(post) {
		return {
			variants: [2],
		};
	}
}

export default CustomPost;
