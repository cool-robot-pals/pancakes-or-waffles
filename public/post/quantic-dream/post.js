import Post from '../_abstract/post.js';

class CustomPost extends Post {
	async getMoreProps(post) {
		return {
			css : {
				'--flex': randomArray(['flex-start','flex-end']),
				'--flex-with-center': randomArray(['flex-start','center','flex-end']),
			}
			variants: [2],
		};
	}
}

export default CustomPost;
