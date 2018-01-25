import Post from './abstract/Post.js';


class CustomPost extends Post {
	getMoreProps(post) {
		return {
			variants: [2],
		};
	}
}

export default CustomPost;
