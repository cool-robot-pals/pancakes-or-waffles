import Post from '../_abstract/post.js';

import BinaryChoicesGetter from '../../getter/less-common/binaryChoices.js';
import ThingGetter from '../../getter/thing.js';


class CustomPost extends Post {

	buildGetters() {
		this.choices = this.buildGetter(BinaryChoicesGetter);
		this.thing = this.buildGetter(ThingGetter,{
			proper: true,
			pronoun: 'never'
		});
	}

	async getMoreProps(post) {

		const choices = await this.choices.get();
		const thing = await this.thing.get();

		const brand = this.randomArray([
			'#30d9da',
			'#00caff',
			'#ff004c',
			'#f8ff30',
		]);

		return {
			css: {
				'--color-brand': brand,
				'--angle-x': (this.randomNumber('forza-x')*10-10)+'deg',
				'--angle-y': (this.randomNumber('forza-y')*10-5)+'deg',
				'--angle-z': (this.randomNumber('forza-z')*2-1)+'deg',
				'--trans-x': (this.randomNumber('forza-tx')*5-2.5)+'em',
				'--trans-y': (this.randomNumber('forza-ty')*5-2.5)+'em',
			},
			extras: {
				cta: choices[this.randomArray(['bad','good'])],
				header: `The ${thing} bucket list`,
				id: (Math.ceil(this.randomNumber('forza')*99)),
			},
			choices: [post.choices[0]]
		};

	}
}

export default CustomPost;
