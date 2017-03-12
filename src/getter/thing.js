import abstractGetter from 'getter/abstract/abstract';
import ChancesGetter from 'getter/chances';

import nounsTxt from 'corpus/nouns.txt';
import pronounsTxt from 'corpus/pronouns-for-nouns.txt';
import adjectivesTxt from 'corpus/adjectives.txt';

import pluralize from 'pluralize';

export default class LayoutGetter extends abstractGetter {

	constructor(defaults={},options={type:'thing'}) {

		super(defaults,options);

		this.nouns = this.parse(nounsTxt);
		this.adjectives = this.parse(adjectivesTxt);

		this.chances = new ChancesGetter();

		this.pronouns = {
			singular: this.parse(pronounsTxt).filter(pronoun => pronoun.props.singular),
			plural: this.parse(pronounsTxt).filter(pronoun => pronoun.props.plural)
		};

		this.type = options.type;

	}


	isSingular(noun) {

		if(
			noun.props.proper ||
			noun.props.singular === 'always' ||
			(this.type === 'ownable' && noun.props.singular === 'owned') ||
			(this.type === 'thing' && noun.props.singular === 'thing')
		) {
			return true;
		}
		if(
			noun.props.plural === 'always' ||
			(this.type === 'ownable' && noun.props.plural === 'owned') ||
			(this.type === 'thing' && noun.props.plural === 'thing')
		) {
			return false;
		}
		else {
			return this.chances.should('isSingular');
		}
	}

	getDefault() {

		const wordList = (()=>{
			if(this.type === 'thing') {
				return this.nouns.filter(noun => !noun.props.only || noun.props.only !== 'ownable');
			}
			else if (this.type === 'ownable') {
				return this.nouns.filter(noun => !noun.props.only || noun.props.only !== 'proper');
			}
			else {
				throw `undefined type ${this.type}`;
			}
		})();
		const noun = this.random(wordList);
		const usePronoun = (()=>{
			return this.type === 'thing' && noun.props.proper != true;
		})();
		const useAdjective = (()=>{
			if(noun.props.proper) {
				return false;
			}
			else {
				return this.chances.should('useAdjective');
			}
		})();
		const isSingular = this.isSingular(noun);
		const pronoun = (()=>{
			let pronoun = this.random(
				isSingular?this.pronouns.singular:this.pronouns.plural
			);
			if(noun.props.an) {
				if(pronoun.value === 'a') pronoun.value = 'an';
			}
			return pronoun;
		})();

		let returnable = [];

		if(usePronoun) returnable.push(pronoun.value);
		if(useAdjective) returnable.push(this.random(this.adjectives).value);

		if(isSingular) {
			returnable.push(noun.value);
		}
		else {
			returnable.push(pluralize(noun.value,2));
		}

		return returnable.join(' ');

	}

}
