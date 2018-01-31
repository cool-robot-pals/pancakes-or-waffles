import Post from '../_abstract/post.js';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../../lib/stringies.js';

import ConsequenceGetter from '../../getter/consequence.js';
import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';

class CustomPost extends Post {

	buildGetters() {
		this.consequence = this.buildGetter(ConsequenceGetter);
		this.choices = this.buildGetter(BinaryChoicesGetter);
	}

	async getMoreProps(post) {

		const choices = await this.choices.get();
		const consequence = await this.consequence.get();

		const hasPlayer2 = this.randomNumber('32hj') > .75;

		return {
			extras: {
				message: `${post.choices[0]}?`,
				consequence: `(${consequence})`,
				'player-1': {
					value: '',
					style: {
						top: `${(this.randomNumber('32hjb')*80)+10}%`,
						left: `${(this.randomNumber('sdv89')*80)+10}%`,
						transform: `rotate(${(this.randomNumber('54nkj')*180)-90}deg)`
					}
				},
				'player-2': {
					value: '',
					style: {
						top: `${(this.randomNumber('32hj2b')*80)+10}%`,
						left: `${(this.randomNumber('sd2v89')*80)+10}%`,
						transform: `rotate(${(this.randomNumber('524nkj')*180)-90}deg)`,
						display: hasPlayer2?'none':'block'
					}
				}
			},
			choices: [choices.good,choices.bad].map(capitalizeFirstLetter)
		};

	}

}

export default CustomPost;
