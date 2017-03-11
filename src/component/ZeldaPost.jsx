import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './ZeldaPost.css';
import Post from './abstract/Post.jsx';

import {capitalizeFirstLetter} from 'lib/stringies';
import BinaryChoicesValues from 'getter/less-common/binaryChoices';

class ZeldaPost extends Post {

	getMoreProps() {

		let binaryChoices = new BinaryChoicesValues().values;

		for(let k in binaryChoices) {
			binaryChoices[k] = capitalizeFirstLetter(binaryChoices[k]);
		}

		let more = {
			extras : binaryChoices
		};

		return more;

	}

}

module.exports = CSSModules(ZeldaPost,styles,{
	errorWhenNotFound: false
});
