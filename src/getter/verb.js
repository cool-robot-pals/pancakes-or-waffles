import abstractGetter from 'getter/abstract/abstract';

export default class VerbGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'verbs';
	}

	async reduce(verbs) {
		return await this.expandKeywordHelper(this.randomArray(verbs));
	}

}
