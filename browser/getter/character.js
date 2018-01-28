import abstractGetter from './abstract/abstract.js';

export default class CharacterGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people';
	}

	async filter(characters, context) {
		if(context.fandom) {
			return await characters.filter(async char => char.fandom === await context.fandom);
		}
		return characters;
	}

	compareFetchResults(original, comparison) {
		return original.name === comparison.name;
	}

}
