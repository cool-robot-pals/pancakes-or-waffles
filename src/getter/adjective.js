import abstractGetter from 'getter/abstract/abstract';
import adjectivesTxt from 'corpus/adjectives.txt';


export default class AdjectiveGetter extends abstractGetter {

	constructor(defaults={},options={}) {
		super(defaults,options);
		this.adjectives = this.parse(adjectivesTxt);
	}

	getDefault() {
		return this.expand(this.randomArray(this.adjectives).value);
	}


}
