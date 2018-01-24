import addStyles from 'lib/decorator/addStyles';


import styles from './ZeldaPost.css';
import Post from './abstract/Post.js';

import {capitalizeFirstLetter} from 'lib/stringies';
import BinaryChoicesValues from 'getter/less-common/binaryChoices';
import NarratorGetter from 'getter/less-common/narrator';

class CustomPost extends Post {

	getMoreProps() {

		const binaryChoices = this.buildGetter(BinaryChoicesValues).values;

		for(let k in binaryChoices) {
			binaryChoices[k] = capitalizeFirstLetter(binaryChoices[k]);
		}

		let more = {
			extras : binaryChoices,
			choices: [this.buildGetter(NarratorGetter).narrate(this.post.choices[0])]
		};

		return more;

	}

}

export default addStyles(CustomPost,styles);
