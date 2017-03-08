import abstractGetter from 'getter/abstract/abstract';

import narratorTxt from 'data/less-common/narrator.txt';

export default class extends abstractGetter {

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
