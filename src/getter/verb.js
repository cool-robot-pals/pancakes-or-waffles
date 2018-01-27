import abstractGetter from 'getter/abstract/abstract';

export default class VerbGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'verbs'
	}

	async get() {
		return await this.expandKeywords(
			this.randomArray(await this.fetch())
		);
	}

}
