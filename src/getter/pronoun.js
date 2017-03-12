import abstractGetter from 'getter/abstract/abstract';
import pronounsTxt from 'corpus/pronouns-for-nouns.txt';

import numberToText from 'number-to-text';
import numberToTextConv from 'number-to-text/converters/en-us';

export default class PronounGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.pronouns = {
			singular: this.parse(pronounsTxt).filter(pronoun => pronoun.props.singular),
			plural: this.parse(pronounsTxt).filter(pronoun => pronoun.props.plural)
		};
	}


	getDefault() {
		let pronoun = this.random(
			this.defaults.singular?this.pronouns.singular:this.pronouns.plural
		);
		if(this.defaults.noun.props.an && pronoun.value === 'a') {
			pronoun.value = 'an';
		}
		if(pronoun.value === '_empty_') {
			pronoun.value = '';
		}
		if(pronoun.value === '_number_') {
			let largeNumber = this.random([true,false]);
			pronoun.value = numberToText.convertToText(Math.ceil(Math.random()*(largeNumber?99:9)),{
				case: 'lowerCase'
			});
		}
		return pronoun;
	}


}
