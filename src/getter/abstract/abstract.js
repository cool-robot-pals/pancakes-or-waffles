import txtToArr from 'lib/txtToArr';
import {makeSeed,randomNumber,randomArray} from 'lib/random';

export default class {

	constructor(defaults={},options={}) {
		this.seed = defaults.seed?defaults.seed:makeSeed();
		this.defaults = defaults;
		this.options = options;
	}

	parse(txt) {
		return txtToArr(txt, this.seed);
	}

	randomArray(arr) {
		return randomArray(arr, this.seed);
	}

	randomNumber(key) {
		return randomNumber(key, this.seed);
	}

	get value() {
		return this.values.default;
	}

	get values() {
		return {
			default: this.getDefault()
		};
	}

}
