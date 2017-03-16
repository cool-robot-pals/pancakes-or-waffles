import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './GravityRushPost.css';
import Post from './abstract/Post.jsx';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';
import {default as random, randomNumber} from 'lib/random';
import BinaryChoicesValues from 'getter/less-common/binaryChoices';
import ChancesGetter from 'getter/chances';


class GravityRushPost extends Post {

	positionMarker(anchor) {
		const padding = 10;
		const randomPos = (max=padding,min=(100-padding)) => {
			return Math.floor(this.randomNumber(max+min)*(max-min+1)+min);
		};
		if(anchor === 'top') {
			return[randomPos(padding,padding+5),randomPos()];
		}
		if(anchor === 'bottom') {
			return[randomPos(100-padding,100-padding+5),randomPos()];
		}
		if(anchor === 'left') {
			return[randomPos(),randomPos(padding,padding+5)];
		}
		if(anchor === 'right') {
			return[randomPos(),randomPos(100-padding,100-padding+5)];
		}
		return[randomPos(),randomPos()];
	}

	getMoreProps() {

		const chances = new ChancesGetter();
		const anchors = ['top','bottom','left','right'];
		let more = {};

		if(chances.should('gravityRushHaveBothChoices')){
			more.choices = [[
				this.post.choices[0],
				decapitalizeFirstLetter(this.post.choices[1])
			].join(' or ')];
			more.extras = {};
			more.extras['waypoint-1'] = (()=>{
				let waypoint = {};
				let position = this.positionMarker(this.randomArray(anchors));
				waypoint.style = {
					top: position[0]+'%',
					left: position[1]+'%',
				};
				waypoint.value = Math.ceil(this.randomNumber(waypoint)*200)+'y';
				return waypoint;
			})();
			more.extras['waypoint-2'] = (()=>{
				let waypoint = {};
				let position = this.positionMarker(this.randomArray(anchors));
				waypoint.style = {
					top: position[0]+'%',
					left: position[1]+'%',
				};
				waypoint.value = Math.ceil(this.randomNumber(waypoint)*200)+'y';
				return waypoint;
			})();
		}
		else {
			more.choices = [this.post.choices.sort((a, b) => b.length - a.length )[0]];
			more.extras = this.buildGetter(BinaryChoicesValues).values;
		}

		return more;

	}

}

module.exports = CSSModules(GravityRushPost,styles,{
	errorWhenNotFound: false
});
