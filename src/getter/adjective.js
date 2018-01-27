import abstractGetter from 'getter/abstract/abstract';
import adjectivesTxt from 'corpus/adjectives.txt';


export default class AdjectiveGetter extends abstractGetter {

	constructor(defaults={},options={}) {
		super(defaults,options);
		this.adjectives = this.parse(adjectivesTxt);
	}

	async get() {
		return this.values.default;
	}

	getDefault() {
		return this.xpndSync(this.randomArray(this.adjectives).value);
	}


}
