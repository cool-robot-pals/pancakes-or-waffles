import random from 'lib/random';
import datesTxt from 'data/less-common/oblivion-dates.txt';

import txtToArr from 'lib/txtToArr';
import random from 'lib/random';

export default class() {

	constructor() {
		this.months = txtToArr(datesTxt);
	}

	get date() {

		const day = Math.ceil(Math.random()*22)+4;
		const year = Math.ceil(Math.random()*100)+300;
		const month = random(this.months);

		return `${day}th of ${month}, 3E${year}`;

	}

	get values() {

		return {
			date: this.date
		}

	}
}
