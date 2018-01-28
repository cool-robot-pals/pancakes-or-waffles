import abstractGetter from './abstract/abstract.js';

import numberToText from '/target/npm/number-to-text.js';
import numberToTextConv from '/target/npm/number-to-text/converters/en-us.js';

export default class PronounGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'pronouns-for-nouns';
	}

	async fetchOnce() {
		const pronouns = await super.fetchOnce();
		return {
			singular: pronouns.filter(pronoun => pronoun.props.singular),
			plural: pronouns.filter(pronoun => pronoun.props.plural)
		};
	}

	async reduce(pronouns) {
		let pronoun = this.randomArray(
			this.options.singular
				? pronouns.singular
				: pronouns.plural
		).value;

		if(pronoun === 'a' && this.options.pronounable && ['a','e','i','o','u'].indexOf(this.options.pronounable.toLowerCase().charAt(0)) >= 0) {
			pronoun = 'an';
		}
		if(pronoun === '_empty_') {
			pronoun = '';
		}
		if(pronoun === '_number_') {
			const isLargeNumber = this.randomArray([true,false]);
			pronoun = numberToText.convertToText(Math.ceil(Math.random()*(isLargeNumber?99:9)),{
				case: 'lowerCase'
			});
		}

		return await this.expandKeywordHelper(pronoun);
	}


}
