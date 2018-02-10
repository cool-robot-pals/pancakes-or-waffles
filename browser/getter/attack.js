import abstractGetter from './abstract/abstract.js';

export default class AttackGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'attack';
	}

	async reduce(list) {
		return await this.expandKeywordHelper(
			this.randomArray(list)
		);
	}

}
