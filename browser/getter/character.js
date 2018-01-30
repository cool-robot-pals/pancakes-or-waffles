import abstractGetter from './abstract/abstract.js';

export default class CharacterGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people';
	}

	async filter(characters, context) {
		const fandomFilter = await context.fandom;
		if(fandomFilter) {
			return await characters.filter(char => char.fandom === fandomFilter);
		}
		return characters;
	}

	compareFetchResults(original, comparison) {
		return original.name === comparison.name;
	}

}
