import {makeSeed} from 'lib/random';

const explodeRegex = /\[(.*?)\]/;
const lookup = {
	thingPlural: /\@thing.plural\.s/g,
	thingSingular: /\@thing.singular/g,
	thing: /\@thing/g,
	characterOrThing: /\@characterOrThing/g,
	character: /\@character/g,
};
const lookupKeys = Object.keys(lookup);

const explodeChunkVariables = (chunk) => {
	let rt = [];
	if(typeof chunk === 'object') {
		chunk.map(innerChunk => {
			rt = rt.concat(explodeChunkVariables(innerChunk));
		});
		return rt;
	}
	else {
		let exploded = explodeRegex.exec(chunk);
		if(exploded){
			exploded = exploded[1].split(',');
			rt = [];
			exploded.map(word => {
				rt.push(
					chunk.replace(explodeRegex,word.trim())
				);
			});
		}
		return rt;
	}
};

export default (chunk,{context={},seed=makeSeed()}) => {

	let ChancesGetter,ThingGetter,CharacterGetter;

	lookupKeys.map(name => {
		if(lookup[name].test(chunk) !== false) {
			let options = {};
			let replacement;
			if(!ChancesGetter) {
				ChancesGetter = require('getter/chances').default;
				ThingGetter = require('getter/thing').default;
				CharacterGetter = require('getter/character').default;
			}
			switch(name) {
				case 'characterOrThing':
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

				case 'character':
					replacement = new CharacterGetter({
						seed: seed,
						fandom: context.fandom
					}).values.name;
					break;

				case 'thingSingular':
					replacement = new ThingGetter({
						seed: seed
					},{
						singular: true
					}).value
					break;

				case 'thingPlural':
					replacement = new ThingGetter({
						seed: seed
					},{
						plural: true
					}).value;
					break;

				case 'thing':
					replacement = new ThingGetter({
						seed: seed
					}).value;
					break;
			}
			chunk = chunk.replace(lookup[name],replacement);
		}
	});
	while(explodeChunkVariables(chunk).length > 0) {
		chunk = explodeChunkVariables(chunk);
	}
	if(typeof chunk === 'string') {
		chunk = [chunk];
	}
	return chunk;
};
