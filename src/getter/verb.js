import abstractGetter from 'getter/abstract/abstract';
import verbsTxt from 'corpus/verbs.txt';


export default class VerbGetter extends abstractGetter {

	constructor(defaults={},options={}) {
		super(defaults,options);
		this.verbs = this.parse(verbsTxt);
	}

	getDefault() {
		return this.expand(this.randomArray(this.adjectives).value);
	}


}
