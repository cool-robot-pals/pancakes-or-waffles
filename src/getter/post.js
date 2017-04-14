import abstractGetter from 'getter/abstract/abstract';

import {capitalizeFirstLetter} from 'lib/stringies';

import ChancesGetter from 'getter/chances';
import ThingGetter from 'getter/thing';
import VerbGetter from 'getter/verb';
import CharacterGetter from 'getter/character';
import FandomGetter from 'getter/fandom';


export default class PostGetter extends abstractGetter {


	constructor(defaults={}) {

		super(defaults);
		this.chances = this.buildGetter(ChancesGetter);
		this.post = {};

	}


	getOwnable(params) {

		if(params.use === 'CHARACTER' && this.chances.should('characterHaveOwnable')) {
			return this.buildGetter(ThingGetter,{},{
				type: 'ownable'
			}).value;
		}
		else {
			return '';
		}

	}


	makeChoice(params={}) {

		let useable;

		if(!params.use) params.use = this.chances.should('useThing')?'THING':'CHARACTER';
		if(!params.verb) params.verb = this.buildGetter(VerbGetter).value;
		if(!params.thing) params.thing = this.buildGetter(ThingGetter).value;
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

		let fandom = this.chances.should('crossFandomsOver')?undefined:(this.buildGetter(FandomGetter).value);
		let characters = [];
		characters.push(this.buildGetter(CharacterGetter,{
			fandom: fandom
		}).values);
		characters.push(this.buildGetter(CharacterGetter,{
			fandom: fandom,
			skipName: characters[0].name
		}).values);

		this.defaults.fandom = fandom?fandom:this.randomArray(characters).fandom;

		let verb = this.chances.should('useSameVerb')?this.buildGetter(VerbGetter).value:undefined;
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
			fandom: this.defaults.fandom,
			query: query
		};

	}


}
