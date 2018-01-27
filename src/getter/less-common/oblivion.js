import abstractGetter from 'getter/abstract/abstract';

import datesTxt from 'corpus/less-common/oblivion-dates.txt';

export default class extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.months = this.parse(datesTxt);
	}

	get date() {

		const day = Math.ceil(Math.random()*22)+4;
		const year = Math.ceil(Math.random()*100)+300;
		const month = this.xpndSync(this.randomArray(this.months).value);

		return `${day}th of ${month}, 3E${year}`;

	}

	get values() {

		return {
			date: this.date,
			'ui-accept': 'Accept',
			'ui-reject': 'Reject'
		};

	}
}
