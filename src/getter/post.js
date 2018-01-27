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
		this.verb = this.buildGetter(VerbGetter);
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


	async makeChoice(params={}) {

		let useable;

		if(!params.use) params.use = this.chances.should('useThing')?'THING':'CHARACTER';
		if(!params.verb) params.verb = await this.verb.get();
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


	async get() {

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

		const verb = this.chances.should('useSameVerb')?this.verb.get():undefined;
		const choices = await Promise.all([
			this.makeChoice({
				character: characters[0].name,
				verb: verb
			}),
			this.makeChoice({
				character: characters[1].name,
				verb: verb
			})
		]);

		const query = this.randomArray(characters).search;

		return {
			choices: choices,
			fandom: this.defaults.fandom,
			query: query
		};

	}


}
