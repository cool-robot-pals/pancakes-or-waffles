import verbsTxt from 'corpus/verbs.txt';

import txtToArr from 'lib/txtToArr';
import random from 'lib/random';
import {capitalizeFirstLetter} from 'lib/stringies';

import ChancesGetter from 'getter/chances';
import ThingGetter from 'getter/thing';
import CharacterGetter from 'getter/character';
import FandomGetter from 'getter/fandom';


/*TODO: refactor this mess*/

export default () => {

	const chances = new ChancesGetter();
	const verbs = txtToArr(verbsTxt);

	const getOwnable = (params) => {
		if(params.use === 'CHARACTER' && chances.should('characterHaveOwnable')) {
			return new ThingGetter({},{
				type: 'ownable'
			}).value;
		}
		else {
			return '';
		}
	};

	const makeChoice = function(params={}) {

		let useable;

		if(!params.use) params.use = chances.should('useThing')?'THING':'CHARACTER';

		if(!params.verb) params.verb = random(verbs).value;
		if(!params.thing) params.thing = new ThingGetter().value;
		if(!params.posession) params.posession = getOwnable(params);

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

	let verb = chances.should('useSameVerb')?random(verbs).value:undefined;
	let fandom = chances.should('crossFandomsOver')?(new FandomGetter().value):undefined;

	let characters = [
		new CharacterGetter({
			fandom: fandom
		}).values,
		new CharacterGetter({
			fandom: fandom
		}).values
	];
	let choices = [
		makeChoice({
			character: characters[0].name,
			verb: verb
		}),
		makeChoice({
			character: characters[1].name,
			verb: verb
		})
	];

	let query = random(characters).search;

	return {
		choices: choices,
		fandom: fandom,
		query: query
	};

};
