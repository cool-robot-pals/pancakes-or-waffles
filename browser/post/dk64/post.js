import Post from '../_abstract/post.js';


class CustomPost extends Post {

	async getMoreProps(post) {

		return {
			choices: post.choices.map(
				choice => choice.split(' ').map(
					word => '<nl>'+word.split('').map(
						char => `<t>${char}</t>`
					).join('')+'</nl>'
				).join('')
			)
		};

	}

}

export default CustomPost;
