import abstractGetter from 'getter/abstract/abstract';

export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/binaries';
	}

	async reduce(binaries) {
		return {
			good: this.randomArray(binaries.good),
			bad: this.randomArray(binaries.bad)
		};
	}
}
