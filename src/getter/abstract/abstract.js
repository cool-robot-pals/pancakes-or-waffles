import {parse as txtToArr} from 'lib/parser/txt';
import {fetchItem} from 'lib/fetchCorpusItem';
import expandKeywords from 'lib/expandKeywords';

import usesGetter from 'lib/decorator/usesGetter';

const abstractGetter = class {

	constructor(context={},options={}) {
		this.attachRandomSeed(context.seed);
		this.context = context;
		this.options = options;
		this.remote = '';

		this.defaults = context;
	}

	/*retrieve data from server, do 1-time formatting*/
	async fetchOnce() {
		return await fetchItem(this.remote);
	}

	/*filter it based on context*/
	async filter(fetched, context) {
		return fetched;
	}

	/*turn it to 1 element*/
	async reduce(fetched) {
		return this.randomArray(fetched);
	}

	/*used by getButNot as a filter function*/
	compareFetchResults(original, comparison) {
		return original === comparison;
	}

	/*public api*/
	fetch() {
		if(!this._fetched) this._fetched = this.fetchOnce();
		return this._fetched;
	}

	async get() {
		return await
		this.fetch()
			.then(fetched => this.filter(fetched, this.context))
			.then(filtered => this.reduce(filtered));
	}

	async getButNot(...keys) {
		const solvedKeys = await Promise.all(keys);
		const fetchable = await this.fetch().then(fetched => this.filter(fetched, this.context));
		const withFilter = await fetchable.filter(item =>
			solvedKeys.reduce(
				(acc, key) => (acc && !this.compareFetchResults(key, item))
				, true)
		);
		if(withFilter.length < 1) {
			return this.reduce(fetchable);
		}
		else {
			return this.reduce(withFilter);
		}
	}

	async getArray(length) {
		const rt = [];
		for(let i = 0; i < length; i++) {
			rt.push(this.getButNot(...rt));
		}
		return await Promise.all(rt);
	}

	/*helper methods*/
	async expandKeywordHelper(string) {
		return await expandKeywords(string, {
			context: this.defaults,
			seed: this.seed
		});
	}

	/*legacy*/
	getDefault() {
		return 'AAAAAAAA';
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
