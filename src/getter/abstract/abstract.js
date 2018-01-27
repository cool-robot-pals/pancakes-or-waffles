import {parse as txtToArr} from 'lib/parser/txt';
import {fetchItem} from 'lib/fetchCorpusItem';
import expandKeywords from 'lib/expandKeywords';

import usesGetter from 'lib/decorator/usesGetter';

const abstractGetter = class {

	constructor(defaults={},options={}) {
		this.attachRandomSeed(defaults.seed);
		this.defaults = defaults;
		this.options = options;
		this.remote = '';
	}

	parse(txt) {
		return txtToArr(txt, {
			context: this,
			seed: this.seed
		});
	}

	xpndSync(string) {
		return expandKeywords(string, {
			context: this.defaults,
			seed: this.seed
		});
	}

	async expandKeywords(string) {
		return this.xpndSync(string);
	}

	async fetch () {
		return await fetchItem(this.remote);
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
