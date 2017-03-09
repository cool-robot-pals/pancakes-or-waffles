import nounsTxt from 'data/nouns.txt';
import verbsTxt from 'data/verbs.txt';
import layoutsTxt from 'data/layouts.txt';
import peopleData from 'data/people.json';

import txtToArr from 'lib/txtToArr';
import random from 'lib/random';

import pluralize from 'pluralize';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';

/*TODO: refactor this mess*/

export default () => {

	let people = peopleData;

	let nouns = txtToArr(nounsTxt);
	let verbs = txtToArr(verbsTxt);

	let typesSingular = ['a','the','this'];
	let typesPlural = ['','these','the','some'];

	let fandoms = (function(people){
		let fandoms = [];
		people.map(function(item){
			if(fandoms.indexOf(item.fandom) < 0) fandoms.push(item.fandom);
		});
		return fandoms;
	})(people);

	let query;

	let sameVerb = Math.random() > .66;
	let crossFandom = Math.random() > .9;
	let choices = [];
	let lastChoiceName = '';

	const getOwnable = (params) => {

		let posession = '';
		let wordList = nouns.filter(noun => !noun.props.only || noun.props.only !== 'proper');

		if(params.use === 0 && random([1,2,3,4]) === 2) {
			let ownable = random(wordList);
			let isSingular = random([true,false]);
			if(ownable.props.proper || ownable.props.singular === 'always' || ownable.props.singular === 'owned') {
				isSingular = false;
			}
			posession = pluralize(ownable.value,isSingular?2:1);
		}

		return posession;

	};

	const getThing = (globalparams,selfparams) => {

		let wordList = nouns.filter(noun => !noun.props.only || noun.props.only !== 'ownable');
		let ownable = random(nouns);

		if(ownable.props.an) typesSingular[0] = 'an';

		if(ownable.props.proper) {
			return ownable.value;
		}
		else {
			let isSingular = random([true,false]);
			if(isSingular) {
				return random(typesSingular)+' '+ownable.value;
			}
			else {
				return random(typesPlural)+' '+pluralize(ownable.value,2);
			}
		}

	};

	const makeChoice = function(params) {

		let useables = ['person','thing'];

		if(!params) params = {};

		if(params.fandom) {
			people = people.filter(function(item){
				return item.fandom === params.fandom;
			});
		}

		if(!params.verb) params.verb = random(verbs).value;
		if(!params.thing) params.thing = getThing();
		if(!params.use) params.use = random([0,0,1]);
		if(!params.posession) params.posession = getOwnable(params);
		if(!params.personObject) {
			params.personObject = random(people);
			/*this is awful*/
			if(lastChoiceName === params.personObject.name) {
				params.personObject = random(people);
				if(lastChoiceName === params.personObject.name) {
					params.personObject = random(people);
				}
			}
		}

		params.person = capitalizeFirstLetter(params.personObject.name);
		params.verb = params.verb.replace('$1',getThing());

		if (params.use === 0) {
			query = params.personObject.search;
			lastChoiceName = params.personObject.name;
		}

		if(params.posession) {
			params.posession = '\'s '+params.posession;
		}

		return capitalizeFirstLetter(params.verb)+' '+params[useables[params.use]]+params.posession;

	};

	let verb = undefined;
	let fandom = undefined;
	if(!crossFandom) {
		fandom = random(fandoms);
	}
	if(sameVerb) {
		let verb = random(verbs).value;
	}
	choices.push(makeChoice({
		verb: verb,
		fandom: fandom
	}));
	choices.push(makeChoice({
		verb: verb,
		fandom: fandom
	}));

	if(!query) {
		query = random(people).search;
	}

	return {
		choices: choices,
		query: query,
		extras: [],
	};

};
