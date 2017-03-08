import abstractGetter from 'getter/abstract/abstract';

export default class extends abstractGetter {

	constructor() {
		super();
		this.good = ['accept','support','help','comply','endorse'];
		this.bad = ['ignore','no','reject','not comply','refuse'];
	}

	get values() {

		return {
			good: this.random(this.good),
			bad: this.random(this.bad)
		};

	}
}
