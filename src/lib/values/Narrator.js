import AbstractValues from 'lib/values/AbstractValues';

import narratorTxt from 'data/less-common/narrator.txt';

export default class extends AbstractValues {

	constructor() {
		super();
		this.narrator = this.parse(narratorTxt);
	}

	get values() {

		return {
			prefix: this.random(this.narrator)
		};

	}
}
