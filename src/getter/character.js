import abstractGetter from 'getter/abstract/abstract';

export default class CharacterGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'people'
	}

	async filter(characters, context) {
		if(context.fandom) {
			return characters.filter(char => char.fandom === context.fandom);
		}
		console.log(characters);
		return characters;
	}

	compareFetchResults(original, comparison) {
		return original.name === comparison.name;
	}

}
