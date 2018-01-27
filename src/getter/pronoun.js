import abstractGetter from 'getter/abstract/abstract';

import numberToText from 'number-to-text';
import numberToTextConv from 'number-to-text/converters/en-us';

export default class PronounGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
	}

	async fetchOnce() {
		const pronouns = super.fetchOnce();
		return {
			singular: pronouns.filter(pronoun => pronoun.props.singular),
			plural: pronouns.filter(pronoun => pronoun.props.plural)
		};
	}

	async get() {
		let pronoun = this.randomArray(
			this.options.singular
				? (await this.fetch()).singular
				: (await this.fetch()).plural
		).value;

		if(pronoun === 'a' && ['a','e','i','o','u'].indexOf(this.options.pronounable.toLowerCase().charAt(0)) >= 0) {
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

		return await this.expandKeywords(pronoun);
	}


}
