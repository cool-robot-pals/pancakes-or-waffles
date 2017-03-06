import txtToArr from 'lib/txtToArr';
import random from 'lib/random';

export default class {

	constructor() {}

	parse(txt) {
		return txtToArr(txt);
	}

	random(arr) {
		return random(arr);
	}

	get values() {
		return {};
	}
}
