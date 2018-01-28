import abstractGetter from './abstract/abstract.js';

import {capitalizeFirstLetter} from '../lib/stringies.js';

import ChancesGetter from './chances.js';
import ThingGetter from './thing.js';
import VerbGetter from './verb.js';
import CharacterGetter from './character.js';
import FandomGetter from './fandom.js';


const USE_THING = 'thing';
const USE_CHAR = 'char';


export default class PostGetter extends abstractGetter {


	constructor(defaults={}) {

		super(defaults);
		this.chances = this.buildGetter(ChancesGetter);
		this.verb = this.buildGetter(VerbGetter);
		this.thing = this.buildGetter(ThingGetter);
		this.post = {};

	}


	async getOwnable(params) {

		if(params.use === USE_CHAR && await this.chances.should('characterHaveOwnable')) {
			return await this.buildGetter(ThingGetter,{
				type: 'ownable'
			}).get();
		}
		else {
			return '';
		}

	}


	async getThingOrCharacter() {
		return await this.chances.should('useThing')
			? USE_THING
			: USE_CHAR;
	}


	async makeChoice(params={}) {

		if(!params.verb) params.verb = await this.verb.get();
		if(!params.posession) params.posession = await this.getOwnable(params);

		if(params.posession) {
			params.posession = '\'s '+params.posession;
		}

		const useable = await (async ()=>{switch (params.use) {
			case USE_THING: return await this.thing.get()
			case USE_CHAR: return params.character
		}})()

		return [
			capitalizeFirstLetter(params.verb),
			' ',
			useable,
			params.posession
		].join('');

	}


	async getRelevantFandom(thingsOrCharacters, characters) {
		const firstCharacterAt = thingsOrCharacters.indexOf(USE_CHAR);
		firstCharacterAt > 0
			? characters[firstCharacterAt].fandom
			: characters[0].fandom
	}


	async get() {

		const forceFandom = await this.chances.should('crossFandomsOver')
			? null
			: await this.buildGetter(FandomGetter).get();

		const thingsOrCharacters = await Promise.all([this.getThingOrCharacter(),this.getThingOrCharacter()]);

		const characters = await this.buildGetter(CharacterGetter,{},{
			fandom: forceFandom
		}).getArray(2);

		this.context.fandom = forceFandom
			? forceFandom
			: this.getRelevantFandom(thingsOrCharacters, characters)

		const verb = await this.chances.should('useSameVerb') ?
			await this.verb.get() :
			null;

		const choices = await Promise.all([
			this.makeChoice({
				character: characters[0].name,
				use: thingsOrCharacters[0],
				verb: verb
			}),
			this.makeChoice({
				character: characters[1].name,
				use: thingsOrCharacters[1],
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
