import abstractGetter from 'getter/abstract/abstract';
import people from 'json-loader!yaml-loader!corpus/people.yaml';

export default class FandomGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.fandoms = [];
		people.map(item => {
			if(this.fandoms.indexOf(item.fandom) < 0) this.fandoms.push(item.fandom);
		});
	}


	getDefault() {
		return this.randomArray(this.fandoms);
	}


}
