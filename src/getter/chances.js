import abstractGetter from 'getter/abstract/abstract';
import chances from 'json-loader!yaml-loader!data/chances.yaml';

export default class ChancesGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.chances = chances;
		for(var k in this.chances) {
			let float = parseFloat(this.chances[k]);
			if(isNaN(float)) throw `Invalid value for chance ${k} on chances.yaml, should be convertable to a float (${this.chances[k]})`;
			this.chances[k] = float/100;
		}
	}


	should(chance) {
		return Math.random() <= this.chances[chance];
	}


	get values() {
		return this.chances;
	}
}
