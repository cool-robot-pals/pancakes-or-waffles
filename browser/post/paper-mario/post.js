import Post from '../_abstract/post.js';

import AttackGetter from '../../getter/attack.js';
import { ThingGetter, MASK_ALWAYS, MASK_NEVER } from '../../getter/thing.js';


class CustomPost extends Post {

	async buildGetters() {
		const original = this.buildGetter(ThingGetter,{
			adjective: MASK_NEVER,
			pronoun: MASK_NEVER,
			proper: MASK_ALWAYS,
			singular: MASK_ALWAYS,
		});
		this.attack = this.buildGetter(AttackGetter,{},{
			thing: await original.get()
		});
	}

	async getMoreProps(post) {

		const things = await this.attack.getArray(10);
		console.log(things);

	}

}

export default CustomPost;
