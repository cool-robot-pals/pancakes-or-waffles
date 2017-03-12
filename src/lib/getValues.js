import nounsTxt from 'corpus/nouns.txt';
import verbsTxt from 'corpus/verbs.txt';
import peopleData from 'data/people.yaml';

import txtToArr from 'lib/txtToArr';
import random from 'lib/random';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';

import pluralize from 'pluralize';

import thingGetter from 'getter/thing';


/*TODO: refactor this mess*/

export default () => {

	let people = peopleData;

	let nouns = txtToArr(nounsTxt);
	let verbs = txtToArr(verbsTxt);

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
	let hasOwnable = Math.random() > .66;
	let choices = [];
	let lastChoiceName = '';

	const getOwnable = (params) => {
		if(params.use === 0 && hasOwnable) {
			return new thingGetter({},{
				type: 'ownable'
			}).value;
		}
		else {
			return '';
		}
	};

	const getThing = (globalparams,selfparams) => {
		return new thingGetter().value;
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
		if(!params.use) params.use = random([0,0,0,1]);
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
