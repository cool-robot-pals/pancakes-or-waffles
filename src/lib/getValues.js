import peopleData from 'data/people';
import thingData from 'data/things';
import verbData from 'data/verbs';
import layoutData from 'data/layouts';

import random from 'lib/random';

const capitalizeFirstLetter = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function() {

	let people = peopleData;
	let things = thingData;
	let verbs = verbData;
	let layouts = layoutData;
	let fandoms = (function(people){
		let fandoms = [];
		people.map(function(item){
			if(fandoms.indexOf(item.fandom) < 0) fandoms.push(item.fandom)
		});
		return fandoms;
	})(people);

	let query;

	let sameVerb = Math.random() > .66;
	let crossFandom = Math.random() > .75;
	let choices = [];
	let lastChoiceName = '';

	let makeChoice = function(params) {

		let useables = ['person','thing'];

		if(!params) params = {};

		if(params.fandom) {
			people = people.filter(function(item){
				return item.fandom === params.fandom;
			})
		}

		if(!params.verb) params.verb = random(verbs);
		if(!params.thing) params.thing = random(things);
		if(!params.use) params.use = random([0,1]);
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
		params.verb = params.verb.replace('$1',random(things));

		if (params.use === 0) {
			query = params.personObject.search;
			lastChoiceName = params.personObject.name;
		}

		return capitalizeFirstLetter(params.verb)+' '+params[useables[params.use]];

	}

	let verb = undefined;
	let fandom = undefined;
	if(!crossFandom) {
		fandom = random(fandoms);
	}
	if(sameVerb) {
		let verb = random(verbs);
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

	let layout = random(Object.keys(layouts));

	return {
		choices: choices,
		query: query,
		layout: {
			id: layout,
			name: layouts[layout]
		}
	}

}
