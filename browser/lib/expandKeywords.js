import {makeSeed} from '../lib/random.js';
import tensify from '/target/npm/tensify.js';

const lookup = {
	thingPluralProper: /@thing\.plural\.proper\@/g,
	thingPlural: /@thing\.plural/g,
	thingSingular: /@thing\.singular/g,
	thing: /@thing/g,
	adjective: /@adjective/g,
	characterOrThing: /@characterOrThing/g,
	character: /@character/g,
	verbPastParticiple: /@verb\.past-participle/g,
	verbPast: /@verb\.past/g,
	verb: /@verb/g,
};
const lookupKeys = Object.keys(lookup);

let ChancesGetter, ThingGetter, CharacterGetter, AdjectiveGetter, VerbGetter;

const getReplacement = async (name, context, seed) => {
	switch(name) {
	case 'verbPastParticiple': {
		const verbs = await (new VerbGetter({seed:seed},{simple:true})).getArray(3);
		return verbs.map(verb => tensify(verb).past_participle);
	}
	case 'verbPast': {
		const verbs = await (new VerbGetter({seed:seed},{simple:true})).getArray(3);
		return verbs.map(verb => tensify(verb).past);
	}
	case 'verb': {
		return await (new VerbGetter({seed:seed})).getArray(3);
	}
	case 'characterOrThing': {
		const chances = new ChancesGetter({seed:seed});
		if(await chances.should('useThing')) {
			return await new ThingGetter({
				seed: seed
			}).getArray(3);
		}
		else {
			return [(await new CharacterGetter({
				seed: seed,
				fandom: context.fandom
			}).get()).name];
		}
	}
	case 'character':{
		return [(await new CharacterGetter({
			seed: seed,
			fandom: context.fandom
		}).get()).name];
	}
	case 'adjective':{
		return await new AdjectiveGetter({
			seed: seed
		}).getArray(3);
	}
	case 'thingSingular':{
		return await new ThingGetter({
			seed: seed
		},{
			singular: true
		}).getArray(3);
	}
	case 'thingPlural':{
		return await new ThingGetter({
			seed: seed
		},{
			plural: true
		}).getArray(3);
	}
	case 'thingPluralProper':{
		return await new ThingGetter({
			seed: seed
		},{
			plural: true,
			forceProper: true
		}).getArray(3);
	}
	case 'thing':{
		return await new ThingGetter({
			seed: seed
		}).getArray(3);
	}
	}
};

const transformChunk = async (chunk, replacer, context, seed) => {
	lookup[replacer].lastIndex = -1;
	if(lookup[replacer].test(chunk) === true) {
		const replacement = await getReplacement(replacer, context, seed);
		let i = -1;
		return chunk.replace(lookup[replacer], match => {
			if(!replacement[i]) i = -1;
			i++;
			return replacement[i];
		});
	}
	else {
		return chunk;
	}
};


export default async (chunk, {context={},seed=makeSeed()} ) => {

	[ChancesGetter,VerbGetter,ThingGetter,CharacterGetter,AdjectiveGetter] = await Promise.all([
		import('../getter/chances.js'),
		import('../getter/verb.js'),
		import('../getter/thing.js'),
		import('../getter/character.js'),
		import('../getter/adjective.js')
	]).then(stuff => stuff.map(imported => imported.default));

	const tasks = (lookupKeys.map(replacer => internalChunk => {
		return transformChunk(internalChunk, replacer, context, seed).then(ck => {
			return ck;
		});
	}));

	let result = Promise.resolve(chunk);
	tasks.forEach(task => {
		result = result.then(task);
	});

	return await result;

};
