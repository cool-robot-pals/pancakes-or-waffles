import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './FalloutPost.css';
import Post from './abstract/Post.jsx';

import NarratorGetter from 'getter/less-common/narrator';
import FalloutGetter from 'getter/less-common/fallout';
import ChancesGetter from 'getter/chances';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';


class FalloutPost extends Post {

	parseChoice (original) {

		const foValues = new FalloutGetter();
		const chances = new ChancesGetter();
		let choice = [];

		if(chances.should('falloutRequiresSpecial')) {
			let special = foValues.values.special;
			if(chances.should('falloutRequiresSpecialNumber')) {
				special += ' '+Math.ceil(Math.random()*10)*10;
			}
			choice.push(`[${special}]` );
		}

		if(chances.should('falloutHasDialog')) {
			choice.push(new NarratorGetter().narrate(original));
		}
		else {
			choice.push(`<${original}>`);
		}
		return choice.join(' ');

	}

	getMoreProps() {

		let more = {};
		more.choices = this.post.choices.map(this.parseChoice);
		return more;

	}

}

module.exports = CSSModules(FalloutPost,styles,{
	errorWhenNotFound: false
});
