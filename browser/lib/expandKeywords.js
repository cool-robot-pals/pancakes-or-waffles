import {makeSeed} from '../lib/random.js';
import tensify from '/target/npm/tensify.js';

import { MASK_ALWAYS, MASK_NEVER } from '../getter/thing.js';

const matcher = /@(.*?)@/g;

let ChancesGetter, ThingGetter, CharacterGetter, AdjectiveGetter, VerbGetter;

const getReplacerMask = (lookup, replacer) => {
	if(replacer.includes(lookup)) return MASK_ALWAYS;
	else if(replacer.includes(`!${lookup}`)) return MASK_NEVER;
	else return null;
}

const getReplacement = async (replacer, context, seed) => {
	switch(replacer[0]) {
	case 'verb' : {
		if(replacer.includes('past')){
			const verb = await (new VerbGetter({seed:seed},{simple:true})).get();
			return tensify(verb).past;
		}
		else if (replacer.includes('past-participle')){
			const verb = await (new VerbGetter({seed:seed},{simple:true})).get();
			return tensify(verb).past_participle;
		}
		else {
			return await (new VerbGetter({seed:seed})).get();
		}
	}
	case 'character-or-thing' : {
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
	case 'character' : {
		return (await new CharacterGetter({
			seed: seed,
			fandom: context.fandom
		}).get()).name;
	}
	case 'adjective' : {
		return await new AdjectiveGetter({
			seed: seed
		}).get();
	}
	case 'thing' : {
		return await new ThingGetter({
			seed: seed,
			singular: replacer.includes('singular'),
			plural: replacer.includes('plural'),
			proper: replacer.includes('proper'),
			pronoun: getReplacerMask('pronoun', replacer),
			adjective: getReplacerMask('adjective', replacer),
		}).get();
	}
	}
};

const transformValue = async (value, context, seed) => {
	matcher.lastIndex = -1;
	const replacers = (value.match(matcher) || []).map(str => str.slice(1, -1).split('.'));
	const replacements = await Promise.all(replacers.map(replacer => getReplacement(replacer, context, seed)));

	let i = -1;
	matcher.lastIndex = -1;
	return value.replace(matcher, () => {
		i++;
		return replacements[i];
	});
};

export default async (chunk='', {context={},seed=makeSeed()} ) => {

	[ChancesGetter,VerbGetter,ThingGetter,CharacterGetter,AdjectiveGetter] = await Promise.all([
		import('../getter/chances.js'),
		import('../getter/verb.js'),
		import('../getter/thing.js'),
		import('../getter/character.js'),
		import('../getter/adjective.js')
	]).then(stuff => stuff.map(imported => imported.default));

	if(chunk.value) {
		return {
			...chunk,
			value: await transformValue(chunk.value, context, seed)
		};
	}
	else {
		return await transformValue(chunk, context, seed);
	}

};
