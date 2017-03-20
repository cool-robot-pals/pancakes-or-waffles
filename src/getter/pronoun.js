import abstractGetter from 'getter/abstract/abstract';
import pronounsTxt from 'corpus/pronouns-for-nouns.txt';

import numberToText from 'number-to-text';
import numberToTextConv from 'number-to-text/converters/en-us';

export default class PronounGetter extends abstractGetter {

	constructor(defaults={},options={}) {
		super(defaults,options);
		this.pronouns = {
			singular: this.parse(pronounsTxt).filter(pronoun => pronoun.props.singular),
			plural: this.parse(pronounsTxt).filter(pronoun => pronoun.props.plural)
		};
	}


	getDefault() {
		let pronoun = this.randomArray(
			this.options.singular?this.pronouns.singular:this.pronouns.plural
		).value;
		if(pronoun === 'a' && ['a','e','i','o','u'].indexOf(this.options.pronounable.toLowerCase().charAt(0)) >= 0) {
			pronoun = 'an';
		}
		if(pronoun === '_empty_') {
			pronoun = '';
		}
		if(pronoun === '_number_') {
			let largeNumber = this.randomArray([true,false]);
			pronoun = numberToText.convertToText(Math.ceil(Math.random()*(largeNumber?99:9)),{
				case: 'lowerCase'
			});
		}
		return this.expand(pronoun);
	}


}
