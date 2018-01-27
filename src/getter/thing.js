import abstractGetter from 'getter/abstract/abstract';
import ChancesGetter from 'getter/chances';
import PronounGetter from 'getter/pronoun';
import AdjectiveGetter from 'getter/adjective';

import pluralize from 'pluralize';

const defaultOptions = {
	type: 'thing'
};

export default class ThingGetter extends abstractGetter {

	constructor(defaults={},options={}) {

		options = {
			...defaultOptions,
			options,
		};

		super(defaults,options);

		this.remote = 'nouns';
		this.chances = this.buildGetter(ChancesGetter);
		this.adjectives = this.buildGetter(AdjectiveGetter);

	}


	async isSingular(noun) {
		if(
			noun.props.proper ||
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
		if(noun.props.proper) {
			return false;
		}
		else {
			return await this.chances.should('useAdjective');
		}
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
		const usePronoun = this.options.type === 'thing' && noun.props.proper != true;
		const returnable = [];

		if(useAdjective) {
			returnable.push(this.adjectives.get());
			if(await this.chances.should('useTwoAdjectives')){
				returnable.push(this.adjectives.get());
			}
		}

		if(isSingular) {
			returnable.push(noun.value);
		}
		else {
			returnable.push(pluralize(noun.value,2));
		}

		if(usePronoun) {
			returnable.unshift(await this.buildGetter(PronounGetter,{},{
				singular: isSingular,
				pronounable: returnable[0]
			}).get());
		}

		return returnable.filter(value => value && value.length > 0).join(' ');

	}

}
