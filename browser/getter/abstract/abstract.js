import {fetchItem} from '../../lib/fetchCorpusItem.js';
import expandKeywords from '../../lib/expandKeywords.js';

import usesSeededGetter from '../../lib/decorator/usesSeededGetter.js';

const abstractGetter = class {

	constructor(context={},options={}) {
		this.attachRandomSeed(context._seed);
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
	async filter(fetched, context, options) {
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
			.then(fetched => this.filter(fetched, this.context, this.options))
			.then(filtered => this.reduce(filtered));
	}

	async getButNot(...keys) {
		const solvedKeys = await Promise.all(keys);
		const fetchable = await this.fetch().then(fetched => this.filter(fetched, this.context, this.options));
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
			seed: this._seed
		});
	}

};

export default usesSeededGetter(abstractGetter);
