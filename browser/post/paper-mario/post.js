import Post from '../_abstract/post.js';

import AttackGetter from '../../getter/attack.js';
import AttackDescriptorGetter from '../../getter/attack-descriptor.js';
import { MASK_ALWAYS, MASK_NEVER } from '../../getter/abstract/constants.js';
import ThingGetter from '../../getter/thing.js';


class CustomPost extends Post {

	getFlowerPoints(tot) {
		const add = () => {
			return this.randomArray([0,0,1,1,2]);
		};
		const rt = [
			add() + this.randomArray([1,2])
		];
		for(let i = 0; i < tot; i++) {
			rt.push(
				[...rt].pop()+add()
			);
		}
		return rt;
	}

	async buildGetters() {
		const original = this.buildGetter(ThingGetter,{
			adjective: MASK_NEVER,
			pronoun: MASK_NEVER,
			proper: MASK_ALWAYS,
			singular: MASK_ALWAYS,
		});
		this.thing = await original.get();
		this.attack = this.buildGetter(AttackGetter,{},{
			thing: this.thing
		});
		this.descriptor = this.buildGetter(AttackDescriptorGetter,{},{
			thing: this.thing,
		});
	}

	async getMoreProps(post) {

		const count = Math.ceil(this.randomNumber('pmc')*4);
		const selected = Math.ceil(this.randomNumber('pm')*count);

		const points = this.getFlowerPoints(count);

		return {
			css: {
				'--brand': this.randomArray([
					'b98d36',
					'b8552c',
					'1634b0',
					'11a990',
					'4bc53f',
					'7b4d8d',
				].map(_=>`#${_}`)),
				'--selected': selected,
				'--icon-1': `url(./icon/${Math.ceil(this.randomNumber('pm-1')*278)}.png)`,
				'--icon-2': `url(./icon/${Math.ceil(this.randomNumber('pm-2')*278)}.png)`,
				'--icon-3': `url(./icon/${Math.ceil(this.randomNumber('pm-3')*278)}.png)`,
				'--icon-4': `url(./icon/${Math.ceil(this.randomNumber('pm-4')*278)}.png)`,
				'--icon-5': `url(./icon/${Math.ceil(this.randomNumber('pm-5')*278)}.png)`,
				'--icon-6': `url(./icon/${Math.ceil(this.randomNumber('pm-6')*278)}.png)`,
				'--icon-7': `url(./icon/${Math.ceil(this.randomNumber('pm-7')*278)}.png)`,
				'--icon-8': `url(./icon/${Math.ceil(this.randomNumber('pm-8')*278)}.png)`,
				'--icon-9': `url(./icon/${Math.ceil(this.randomNumber('pm-9')*278)}.png)`,
			},
			extras: {
				descriptor: await this.descriptor.get(),
			},
			choices: [
				this.thing,
				...(await this.attack.getArray(count)).map( (thing, i) =>
					`${thing}<i>${points[i]}</i>`
				)
			]
		};
	}

}

export default CustomPost;
