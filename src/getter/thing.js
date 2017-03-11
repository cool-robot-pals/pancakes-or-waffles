import abstractGetter from 'getter/abstract/abstract';
import nounsTxt from 'data/nouns.txt';
import pronounsTxt from 'data/pronouns-for-nouns.txt';
import adjectivesTxt from 'data/adjectives.txt';

import pluralize from 'pluralize';

let typesSingular = ['a','the','this'];
let typesPlural = ['','these','the','some'];

export default class LayoutGetter extends abstractGetter {

	constructor(defaults={},options={}) {

		super(defaults,options);

		this.nouns = this.parse(nounsTxt);
		this.adjectives = this.parse(adjectivesTxt);

		this.pronouns = {
			singular: this.parse(pronounsTxt).filter(pronoun => pronoun.props.singular),
			plural: this.parse(pronounsTxt).filter(pronoun => pronoun.props.plural)
		};

	}


	getThing() {

		const wordList = this.nouns.filter(noun => !noun.props.only || noun.props.only !== 'ownable');
		const ownable = this.random(wordList);
		const usePronoun = ownable.props.proper != true;
		const useAdjective = (()=>{
			if(ownable.props.proper) {
				return false;
			}
			else {
				return this.random([true,false]);
			}
		})()
		const isSingular = (()=>{
			if(ownable.props.proper || ownable.props.singular === 'always') {
 				return true;
			}
			if(ownable.props.plural === 'always') {
 				return false;
			}
			else {
				return this.random([true,false]);
			}
		})();
		const pronoun = (()=>{
			let pronoun = this.random(
				isSingular?this.pronouns.singular:this.pronouns.plural
			)
			if(ownable.props.an) {
				if(pronoun.value === 'a') pronoun.value = 'an'
			}
			return pronoun;
		})()

		let returnable = [];

		if(usePronoun){
			returnable.push(pronoun.value);
		}
		if(useAdjective) {
			returnable.push(this.random(this.adjectives).value);
		}

		if(isSingular) {
			returnable.push(ownable.value);
		}
		else {
			returnable.push(pluralize(ownable.value,2));
		}

		return returnable.join(' ');

	}


	get values() {

		return {
			default: this.getThing()
		};

	}
}
