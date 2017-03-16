import abstractGetter from 'getter/abstract/abstract';

import verbsTxt from 'corpus/verbs.txt';

import {capitalizeFirstLetter} from 'lib/stringies';

import ChancesGetter from 'getter/chances';
import ThingGetter from 'getter/thing';
import CharacterGetter from 'getter/character';
import FandomGetter from 'getter/fandom';


export default class PostGetter extends abstractGetter {


	constructor(defaults={}) {

		super(defaults);
		this.chances = this.constructGetter(ChancesGetter);
		this.verbs = this.parse(verbsTxt);

	}


	getOwnable(params) {

		if(params.use === 'CHARACTER' && this.chances.should('characterHaveOwnable')) {
			return this.constructGetter(ThingGetter,{},{
				type: 'ownable'
			}).value;
		}
		else {
			return '';
		}

	}


	getVerb() {

		return this.randomArray(this.verbs).value;

	}


	makeChoice(params={}) {

		let useable;

		if(!params.use) params.use = this.chances.should('useThing')?'THING':'CHARACTER';
		if(!params.verb) params.verb = this.getVerb();
		if(!params.thing) params.thing = this.constructGetter(ThingGetter).value;
		if(!params.posession) params.posession = this.getOwnable(params);

		if(params.posession) {
			params.posession = '\'s '+params.posession;
		}

		if(params.use === 'THING') useable = params.thing;
		if(params.use === 'CHARACTER') useable = params.character;

		return [
			capitalizeFirstLetter(params.verb),
			' ',
			useable,
			params.posession
		].join('');

	}


	get values() {

		let verb = this.chances.should('useSameVerb')?this.getVerb():undefined;
		let fandom = this.chances.should('crossFandomsOver')?undefined:(this.constructGetter(FandomGetter).value);

		let characters = [];
		characters.push(this.constructGetter(CharacterGetter,{
			fandom: fandom
		}).values);
		characters.push(this.constructGetter(CharacterGetter,{
			fandom: fandom,
			skipName: characters[0].name
		}).values);

		let choices = [];
		choices.push(this.makeChoice({
			character: characters[0].name,
			verb: verb
		}));
		choices.push(this.makeChoice({
			character: characters[1].name,
			verb: verb
		}));

		let query = this.randomArray(characters).search;

		return {
			choices: choices,
			fandom: fandom?fandom:this.randomArray(characters).fandom,
			query: query
		};

	}


}
