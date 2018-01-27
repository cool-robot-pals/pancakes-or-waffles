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
		this.thing = this.buildGetter(ThingGetter);
		this.post = {};

	}


	async getOwnable(params) {

		if(params.use === 'CHARACTER' && await this.chances.should('characterHaveOwnable')) {
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

		if(!params.use) params.use = await this.chances.should('useThing')?'THING':'CHARACTER';
		if(!params.verb) params.verb = await this.verb.get();
		if(!params.thing) params.thing = await this.thing.get();
		if(!params.posession) params.posession = await this.getOwnable(params);

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

		const fandom = await this.chances.should('crossFandomsOver')
			? await this.buildGetter(FandomGetter).get()
			: await this.buildGetter(FandomGetter).get();

			console.log(fandom);

		const characters = await this.buildGetter(CharacterGetter,{
			fandom: fandom
		}).getArray(2)

		this.defaults.fandom = fandom?fandom:this.randomArray(characters).fandom;

		const verb = await this.chances.should('useSameVerb') ?
			await this.verb.get() :
			null;
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
