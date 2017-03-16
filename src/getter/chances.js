import abstractGetter from 'getter/abstract/abstract';
import chances from 'json-loader!yaml-loader!data/chances.yaml';
import {randomNumber} from 'lib/random';


export default class ChancesGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		if(!this.chances){
			this.chances = Object.assign({},chances);
			for(var k in this.chances) {
				let float = parseFloat(this.chances[k]);
				if(isNaN(float)) throw `Invalid value for chance ${k} on chances.yaml, should be convertable to a float (${this.chances[k]})`;
				this.chances[k] = float/100;
			}
		}
	}


	should(chance) {
		return randomNumber(chance,this.seed) <= this.chances[chance];
	}


	get values() {
		return this.chances;
	}
}
