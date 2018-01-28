import abstractGetter from './abstract/abstract.js';

export default class AdjectiveGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'adjectives';
	}

	async reduce(list) {
		return await this.expandKeywordHelper(
			this.randomArray(list)
		);
	}

}
