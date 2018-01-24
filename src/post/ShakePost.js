import styles from './ShakePost.css';
import Post from './abstract/Post.js';
import addStyles from 'lib/decorator/addStyles';

import {decapitalizeFirstLetter} from 'lib/stringies';

class CustomPost extends Post {

	getMoreProps() {

		return {
			variants: [2,2,4,2],
			choices: ['Shake the controller to '+decapitalizeFirstLetter(this.post.choices[0])]
		};

	}

}

module.exports = addStyles(CustomPost,styles);
