import abstractGetter from './abstract/abstract.js';
import ChancesGetter from './chances.js';
import PronounGetter from './pronoun.js';
import AdjectiveGetter from './adjective.js';

import pluralize from '/target/npm/pluralize.js';

export const TYPE_OWNABLE = 'ownable';
export const TYPE_THING = 'thing';
export const TYPE_PROPER = 'proper';

export const MASK_ALWAYS = 'always';
export const MASK_NEVER = 'thing';
export const MASK_WHEN_OWNABLE = 'whenOwnable';
export const MASK_WHEN_NOT_OWNABLE = 'whenNotOwnable';

const defaultOptions = {
	type: TYPE_THING
};

export const ThingGetter = class extends abstractGetter {

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
		if(
			this.isProperNoun(noun) ||
			noun.props.singular === MASK_ALWAYS ||
			(this.options.type === TYPE_OWNABLE && noun.props.singular === MASK_WHEN_OWNABLE) ||
			(this.options.type === TYPE_THING && noun.props.singular === TYPE_THING)
		) {
			return true;
		}
		if(
			noun.props.plural === MASK_ALWAYS ||
			(this.options.type === TYPE_OWNABLE && noun.props.plural === MASK_WHEN_OWNABLE) ||
			(this.options.type === TYPE_THING && noun.props.plural === TYPE_THING)
		) {
			return false;
		}
		else {
			return await this.chances.should('isSingular');
		}
	}


	async shouldUseAdjective(noun) {
		if(this.options.adjective === MASK_NEVER){
			return false;
		}
		if(this.options.adjective === MASK_ALWAYS){
			return true;
		}
		if(this.isProperNoun(noun)) {
			return false;
		}
		else {
			return await this.chances.should('useAdjective');
		}
	}


	async shouldUsePronoun(noun) {
		if(this.options.pronoun === MASK_NEVER){
			return false;
		}
		if(this.options.pronoun === MASK_ALWAYS){
			return true;
		}
		if(noun.props.pronoun === MASK_NEVER) {
			return false;
		}
		if(noun.props.pronoun === MASK_ALWAYS) {
			return true;
		}
		if(noun.props.pronoun === MASK_WHEN_NOT_OWNABLE && this.options.type === TYPE_THING) {
			return true;
		}
		if(this.isProperNoun(noun)) {
			return await this.chances.should('usePronounIfProper');
		}
		else {
			return this.options.type === TYPE_THING;
		}
	}


	isProperNoun(noun) {
		if(this.options.proper) return true;
		else return noun.props.proper === true;
	}


	async filter(list, context, options) {
		if(context.thing) {
			return [{value:context.thing, props: {}}];
		}
		if(options.type === TYPE_THING) {
			list = list.filter(noun => !noun.props.only || noun.props.only !== TYPE_OWNABLE);
		}
		else if (options.type === TYPE_OWNABLE) {
			list = list.filter(noun => !noun.props.only || noun.props.only !== TYPE_PROPER);
		}
		if(options.singular === true) {
			list = list.filter(async noun => await this.isSingular(noun));
		}
		if(options.plural === true) {
			list = list.filter(async noun => await !this.isSingular(noun));
		}
		return list;
	}


	async reduce(wordList) {

		console.log(wordList);

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
				returnable.unshift('the');
			}
			else {
				returnable.unshift(await this.buildGetter(PronounGetter,{
					singular: isSingular,
					pronounable: returnable[0]
				}).get());
			}
		}

		return returnable.filter(value => value && value.length > 0).join(' ');

	}

};


export default ThingGetter;
