import {makeSeed} from 'lib/random';

const lookup = {
	thingPlural: /\@thing.plural\.s/g,
	thingSingular: /\@thing.singular/g,
	thing: /\@thing/g,
	adjective: /\@adjective/g,
	characterOrThing: /\@characterOrThing/g,
	character: /\@character/g,
};
const lookupKeys = Object.keys(lookup);

let ChancesGetter,ThingGetter,CharacterGetter,AdjectiveGetter;

export default (chunk,{context={},seed=makeSeed()}) => {

	lookupKeys.map(name => {
		if(lookup[name].test(chunk) !== false) {
			let options = {};
			let replacement;
			if(!ChancesGetter) {
				ChancesGetter = require('getter/chances').default;
				ThingGetter = require('getter/thing').default;
				CharacterGetter = require('getter/character').default;
				AdjectiveGetter = require('getter/adjective').default;
			}
			switch(name) {
			case 'characterOrThing': {
				let chances = new ChancesGetter({seed:seed});
				if(chances.should('useThing')) {
					replacement = new ThingGetter({
						seed: seed
					}).value;
				}
				else {
					replacement = new CharacterGetter({
						seed: seed,
						fandom: context.fandom
					}).values.name;
				}
				break;
			}
			case 'character':{
				replacement = new CharacterGetter({
					seed: seed,
					fandom: context.fandom
				}).values.name;
				break;
			}
			case 'adjective':{
				replacement = new AdjectiveGetter({
					seed: seed
				}).value;
				break;
			}
			case 'thingSingular':{
				replacement = new ThingGetter({
					seed: seed
				},{
					singular: true
				}).value;
				break;
			}
			case 'thingPlural':{
				replacement = new ThingGetter({
					seed: seed
				},{
					plural: true
				}).value;
				break;
			}
			case 'thing':{
				replacement = new ThingGetter({
					seed: seed
				}).value;
				break;
			}
			}
			chunk = chunk.replace(lookup[name],replacement);
		}
	});
	return chunk;
};
