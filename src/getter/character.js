import abstractGetter from 'getter/abstract/abstract';
import people from 'json-loader!yaml-loader!corpus/people.yaml';

export default class CharacterGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.people = people;

		if(defaults.fandom) {
			let revised = this.people.filter(chara => chara.fandom === defaults.fandom);
			if(revised.length > 0) this.people = revised;
		}
	}


	getDefault() {
		return this.random(this.people);
	}


}
