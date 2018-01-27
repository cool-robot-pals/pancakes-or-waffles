import abstractGetter from 'getter/abstract/abstract';

export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/binaries';
	}

	async get() {
		const binaries = await this.fetch();
		return {
			good: this.randomArray(binaries.good),
			bad: this.randomArray(binaries.bad)
		};
	}
}
