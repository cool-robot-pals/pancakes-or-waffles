import txtToArr from 'lib/txtToArr';
import {makeSeed} from 'lib/random';
import expandKeywords from 'lib/expandKeywords';

import usesGetter from 'lib/decorator/usesGetter';

@usesGetter
export default class {

	constructor(defaults={},options={}) {
		this.seed = defaults.seed?defaults.seed:makeSeed();
		this.defaults = defaults;
		this.options = options;
	}

	parse(txt) {
		return txtToArr(txt, {
			context: this,
			seed: this.seed
		});
	}

	expand(string) {
		return expandKeywords(string, {
			context: this,
			seed: this.seed
		});
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
