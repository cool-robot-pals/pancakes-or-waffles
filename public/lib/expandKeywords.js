import {makeSeed} from '../lib/random.js';

const lookup = {
	thingPlural: /@thing.plural\.s/g,
	thingSingular: /@thing.singular/g,
	thing: /@thing/g,
	adjective: /@adjective/g,
	characterOrThing: /@characterOrThing/g,
	character: /@character/g,
};
const lookupKeys = Object.keys(lookup);

let ChancesGetter, ThingGetter, CharacterGetter, AdjectiveGetter;

const getReplacement = async (name, context, seed) => {
	switch(name) {
	case 'characterOrThing': {
		const chances = new ChancesGetter({seed:seed});
		if(await chances.should('useThing')) {
			return await new ThingGetter({
				seed: seed
			}).get();
		}
		else {
			return (await new CharacterGetter({
				seed: seed,
				fandom: context.fandom
			}).get()).name;
		}
	}
	case 'character':{
		return (await new CharacterGetter({
			seed: seed,
			fandom: context.fandom
		}).get()).name;
	}
	case 'adjective':{
		return await new AdjectiveGetter({
			seed: seed
		}).get();
	}
	case 'thingSingular':{
		return await new ThingGetter({
			seed: seed
		},{
			singular: true
		}).get();
	}
	case 'thingPlural':{
		return await new ThingGetter({
			seed: seed
		},{
			plural: true
		}).get();
	}
	case 'thing':{
		return await new ThingGetter({
			seed: seed
		}).get();
	}
	}
};

const transformChunk = async (chunk, replacer, context, seed) => {
	if(lookup[replacer].test(chunk) !== false) {

		[ChancesGetter,ThingGetter,CharacterGetter,AdjectiveGetter] = await Promise.all([
			import('../getter/chances.js'),
			import('../getter/thing.js'),
			import('../getter/character.js'),
			import('../getter/adjective.js')
		]).then(stuff => stuff.map(imported => imported.default) );

		const replacement = await getReplacement(replacer, context, seed);

		chunk = chunk.replace(lookup[replacer], replacement);
	}
	return chunk;
};

export default async (chunk, {context={},seed=makeSeed()} ) => {

	for (let replacer of lookupKeys) {
		chunk = await transformChunk(chunk, replacer, context, seed);
	}
	return await chunk;
};
