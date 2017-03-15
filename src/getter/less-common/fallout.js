import abstractGetter from 'getter/abstract/abstract';

import specialTxt from 'corpus/less-common/fo-special.txt';

export default class FalloutGetter extends abstractGetter {

	constructor() {
		super();
		this.special = this.parse(specialTxt);
	}

	get values() {
		return {
			special: this.random(this.special).value
		};
	}
}
