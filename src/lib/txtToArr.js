const propsRegex = /\((.*?)\)/;
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

export default (str) => {
	let array = str
		.split('\n')
		.map(chunk => chunk.trim())
		.filter(chunk => chunk.charAt(0) !== '#')
		.filter(chunk => chunk.length > 0)
		.map(chunk => {
			if(chunk === '_empty_') return '';
			return chunk;
		})
		.map(chunk => {
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
					chunk = chunk.replace(thingRegex[name],new ThingGetter.default({},options).value);
					console.log(chunk);
				}
			});
			return chunk;
		})
		.map(chunk => {
			while(explodeChunkVariables(chunk).length > 0) {
				chunk = explodeChunkVariables(chunk);
			}
			return chunk;
		});

	array = [].concat.apply([], array);

	let arrayWithProps = array
		.map(chunk => {
			let props = {};
			let propArray = propsRegex.exec(chunk);
			if(propArray) {
				propArray = propArray[1].split(',');
				chunk = chunk.replace(propsRegex,'').trim();
			}
			else {
				propArray = [];
			}
			if(propArray.length > 0) {
				propArray.map(prop => {
					prop = prop.split('=');
					props[prop[0]] = prop[1]?prop[1]:true;
				});
			}
			return {
				value: chunk,
				props: props
			};
		});
	return arrayWithProps;
};
