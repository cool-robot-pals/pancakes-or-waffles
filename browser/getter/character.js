import abstractGetter from './abstract/abstract.js';

export default class CharacterGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people';
	}

	async filter(characters, context) {
		const charFilter = await context.character;
		const fandomFilter = await context.fandom;
		if(charFilter) {
			return await characters.filter(char => char.name === charFilter.name);
		}
		if(fandomFilter) {
			return await characters.filter(char => char.fandom === fandomFilter);
		}
		return characters;
	}

	compareFetchResults(original, comparison) {
		return original.name === comparison.name;
	}

}
