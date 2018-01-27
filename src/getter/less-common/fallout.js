import abstractGetter from 'getter/abstract/abstract';

export default class FalloutGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/fo-special';
	}

	async get() {
		return await this.expandKeywordHelper(
			await super.get()
		);
	}
}
