import abstractGetter from './abstract/abstract.js';
import ChancesGetter from './chances.js';
import PronounGetter from './pronoun.js';
import AdjectiveGetter from './adjective.js';

import pluralize from '/target/npm/pluralize.js';

const defaultOptions = {
	type: 'thing'
};

export default class ThingGetter extends abstractGetter {

	constructor(defaults={},options={}) {

		options = {
			...defaultOptions,
			...options,
		};

		super(defaults,options);

		this.remote = 'nouns';
		this.chances = this.buildGetter(ChancesGetter);
		this.adjectives = this.buildGetter(AdjectiveGetter);

	}


	async isSingular(noun) {
		console.log(this.isProperNoun(noun));
		if(
			this.isProperNoun(noun) ||
			noun.props.singular === 'always' ||
			(this.options.type === 'ownable' && noun.props.singular === 'owned') ||
			(this.options.type === 'thing' && noun.props.singular === 'thing')
		) {
			return true;
		}
		if(
			noun.props.plural === 'always' ||
			(this.options.type === 'ownable' && noun.props.plural === 'owned') ||
			(this.options.type === 'thing' && noun.props.plural === 'thing')
		) {
			return false;
		}
		else {
			return await this.chances.should('isSingular');
		}
	}


	async shouldUseAdjective(noun) {
		if(this.isProperNoun(noun)) {
			return false;
		}
		else {
			return await this.chances.should('useAdjective');
		}
	}


	async shouldUsePronoun(noun) {
		if(noun.props.pronoun === 'never') {
			return false;
		}
		if(noun.props.pronoun === 'always') {
			return true;
		}
		if(this.isProperNoun(noun)) {
			return false;
		}
		if(this.options.forcePronoun === 'never'){
			return false;
		}
		else {
			return this.options.type === 'thing'
		}
	}


	isProperNoun(noun) {
		if(this.options.forceProper) return true
		else return noun.props.proper === true
	}


	async filter(list, context) {
		if(this.options.type === 'thing') {
			list = list.filter(noun => !noun.props.only || noun.props.only !== 'ownable');
		}
		else if (this.options.type === 'ownable') {
			list = list.filter(noun => !noun.props.only || noun.props.only !== 'proper');
		}
		if(this.options.singular === true) {
			list = list.filter(async noun => await this.isSingular(noun));
		}
		if(this.options.plural === true) {
			list = list.filter(async noun => await !this.isSingular(noun));
		}
		return list;
	}


	async reduce(wordList) {

		const noun = await this.expandKeywordHelper(this.randomArray(wordList));
		const useAdjective = await this.shouldUseAdjective(noun);
		const isSingular = await this.isSingular(noun);
		const usePronoun = await this.shouldUsePronoun(noun);
		const returnable = [];

		if(useAdjective) {
			returnable.push(await this.adjectives.get());
			if(await this.chances.should('useTwoAdjectives')){
				returnable.push(await this.adjectives.get());
			}
		}

		if(isSingular) {
			returnable.push(noun.value);
		}
		else {
			returnable.push(pluralize(noun.value,2));
		}

		if(usePronoun) {
			if(this.isProperNoun(noun)) {
				returnable.unshift('the')
			}
			else {
				returnable.unshift(await this.buildGetter(PronounGetter,{},{
					singular: isSingular,
					pronounable: returnable[0]
				}).get());
			}
		}

		console.log(returnable);

		return returnable.filter(value => value && value.length > 0).join(' ');

	}

}
