import abstractGetter from '../abstract/abstract.js';

export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/oblivion-dates';
	}

	async getDate() {

		const day = Math.ceil(Math.random()*22)+4;
		const year = Math.ceil(Math.random()*100)+300;
		const month = await this.expandKeywordHelper(this.randomArray(await this.fetch()));

		return `${day}th of ${month}, 3E${year}`;

	}

	async reduce() {
		return {
			date: await this.getDate(),
			'ui-accept': 'Accept',
			'ui-reject': 'Reject'
		};
	}
}
