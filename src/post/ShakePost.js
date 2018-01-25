import Post from './abstract/Post.js';

import {decapitalizeFirstLetter} from 'lib/stringies';

class CustomPost extends Post {

	getMoreProps() {

		return {
			variants: [2,2,4,2],
			choices: ['Shake the controller to '+decapitalizeFirstLetter(this.post.choices[0])]
		};

	}

}

export default CustomPost;
