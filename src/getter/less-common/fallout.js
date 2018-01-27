import abstractGetter from 'getter/abstract/abstract';

export default class FalloutGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/fo-special';
	}

	async reduce(list) {
		return await this.expandKeywordHelper(
			this.randomArray((list)
		);
	}
}
