import abstractGetter from './abstract/abstract.js';

export default class VerbGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'verbs';
	}

	async filter(list, ctx, options) {
		if(this.options.simple === true) {
			return list.filter(item => item.indexOf(' ') < 0);
		}
		else {
			return list;
		}
	}

	async reduce(verbs) {
		return await this.expandKeywordHelper(this.randomArray(verbs));
	}

}
