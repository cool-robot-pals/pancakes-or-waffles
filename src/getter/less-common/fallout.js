import abstractGetter from 'getter/abstract/abstract';

import specialTxt from 'corpus/less-common/fo-special.txt';

export default class FalloutGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.special = this.parse(specialTxt);
	}

	get values() {
		return {
			special: this.expand(this.randomArray(this.special).value)
		};
	}
}
