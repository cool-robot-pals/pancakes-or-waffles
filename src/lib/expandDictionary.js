import {makeSeed} from 'lib/random';

const explodeRegex = /\[(.*?)\]/;
const thingRegex = {
	plural: /\@thing\.s/g,
	any: /\@thing\.any/g,
	singular: /\@thing/g
};

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

export default (chunk,seed=makeSeed()) => {
	Object.keys(thingRegex).map(name => {
		if(thingRegex[name].test(chunk) !== false) {
			let options = {};
			if(name === 'singular') {
				options.singular = true;
			}
			if(name === 'plural') {
				options.plural = true;
			}
			const ThingGetter = require('getter/thing');
			chunk = chunk.replace(thingRegex[name],new ThingGetter.default({
					seed: seed
				},
				options
			).value);
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
