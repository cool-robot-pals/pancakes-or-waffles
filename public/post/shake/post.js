import Post from '../_abstract/post.js';

import {decapitalizeFirstLetter} from '../../lib/stringies.js';

class CustomPost extends Post {

	async getMoreProps(post) {

		return {
			variants: [2,2,4,2],
			choices: ['Shake the controller to '+decapitalizeFirstLetter(post.choices[0])]
		};

	}

}

export default CustomPost;
