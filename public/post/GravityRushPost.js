import Post from './abstract/Post.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../lib/stringies.js';
import BinaryChoicesGetter from '../getter/less-common/binaryChoices.js';
import ChancesGetter from '../getter/chances.js';


class CustomPost extends Post {

	constructor(...args) {
		super(...args);
		this.chances = this.buildGetter(ChancesGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

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

	async getMoreProps(post) {

		const anchors = ['top','bottom','left','right'];
		let more = {};

		if(await this.chances.should('gravityRushHaveBothChoices')){
			more.choices = [[
				post.choices[0],
				decapitalizeFirstLetter(post.choices[1])
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
			more.choices = [post.choices.sort((a, b) => b.length - a.length )[0]];
			more.extras = await this.choices.get();
		}

		return more;

	}

}

export default CustomPost;
