import {parse as txtToArr} from 'lib/parser/txt';
import expandKeywords from 'lib/expandKeywords';

import usesGetter from 'lib/decorator/usesGetter';

const abstractGetter = class {

	constructor(defaults={},options={}) {
		this.attachRandomSeed(defaults.seed);
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
			context: this.defaults,
			seed: this.seed
		});
	}

	async fetch() {

	}

	async get() {

	}

	get value() {
		console.info('DEPRECATED use async fetch()->get() like LayoutGetter');
		return this.values.default;
	}

	get values() {
		console.info('DEPRECATED use async fetch()->get() like LayoutGetter');
		return {
			default: this.getDefault()
		};
	}

};

export default usesGetter(abstractGetter);
