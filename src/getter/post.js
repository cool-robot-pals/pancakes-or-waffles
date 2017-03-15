import abstractGetter from 'getter/abstract/abstract';

import verbsTxt from 'corpus/verbs.txt';

import txtToArr from 'lib/txtToArr';
import random from 'lib/random';
import {capitalizeFirstLetter} from 'lib/stringies';

import ChancesGetter from 'getter/chances';
import ThingGetter from 'getter/thing';
import CharacterGetter from 'getter/character';
import FandomGetter from 'getter/fandom';


export default class PostGetter extends abstractGetter {


	constructor(defaults={}) {

		super(defaults);
		this.chances = new ChancesGetter();
		this.verbs = txtToArr(verbsTxt);

	}


	getOwnable(params) {

		if(params.use === 'CHARACTER' && this.chances.should('characterHaveOwnable')) {
			return new ThingGetter({},{
				type: 'ownable'
			}).value;
		}
		else {
			return '';
		}

	};


	getVerb() {

		return random(this.verbs).value;

	}


	makeChoice(params={}) {

		let useable;

		if(!params.use) params.use = this.chances.should('useThing')?'THING':'CHARACTER';

		if(!params.verb) params.verb = this.getVerb();
		if(!params.thing) params.thing = new ThingGetter().value;
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

	};


	get values() {

		let verb = this.chances.should('useSameVerb')?this.getVerb():undefined;
		let fandom = this.chances.should('crossFandomsOver')?(new FandomGetter().value):undefined;

		let characters = [
			new CharacterGetter({
				fandom: fandom
			}).values,
			new CharacterGetter({
				fandom: fandom
			}).values
		];
		let choices = [
			this.makeChoice({
				character: characters[0].name,
				verb: verb
			}),
			this.makeChoice({
				character: characters[1].name,
				verb: verb
			})
		];

		let query = random(characters).search;

		return {
			choices: choices,
			fandom: fandom?fandom:random(characters).fandom,
			query: query
		};

	}


}
