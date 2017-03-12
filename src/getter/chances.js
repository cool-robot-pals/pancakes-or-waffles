import abstractGetter from 'getter/abstract/abstract';
import chances from 'json-loader!yaml-loader!data/chances.yaml';

export default class ChancesGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.chances = chances;
		for(var k in this.chances) {
			this.chances[k] = parseInt(this.chances[k])/100;
		}
	}


	should(chance) {
		return Math.random() <= this.chances[chance];
	}


	get values() {
		return this.chances;
	}
}
