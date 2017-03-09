import txtToArr from 'lib/txtToArr';
import random from 'lib/random';

export default class {

	constructor(defaults={}) {}

	parse(txt) {
		return txtToArr(txt);
	}

	random(arr) {
		return random(arr);
	}

	get value() {
		return this.values.default;
	}

	get values() {
		return {};
	}
}
