import abstractGetter from 'getter/abstract/abstract';
import people from 'json-loader!yaml-loader!corpus/people.yaml';

export default class FandomGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people';
	}


	async fetchOnce() {
		return super.fetchOnce().then(peopleWithFandoms =>
			peopleWithFandoms.map(item => item.fandom)
		).then(fandoms =>
			[...new Set(fandoms)]
		);
	}


}
