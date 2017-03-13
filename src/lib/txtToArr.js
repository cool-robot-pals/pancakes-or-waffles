const propsregex = /\((.*?)\)/;
const exploderegex = /\[(.*?)\]/;

const explodeChunkVariables = (chunk) => {
	let rt = [];
	let exploded;
	if(typeof chunk === 'object') {
		chunk.map(innerChunk => {
			rt = rt.concat(explodeChunkVariables(innerChunk));
		});
		return rt;
	}
	else {
		try {
			exploded = exploderegex.exec(chunk)[1].split(',');
		}
		catch(err){
			return rt;
		}
		if(exploded){
			rt = [];
			exploded.map(word => {
				rt.push(
					chunk.replace(exploderegex,word.trim())
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
			while(explodeChunkVariables(chunk).length > 0) {
				chunk = explodeChunkVariables(chunk);
			}
			return chunk;
		});

	array = [].concat.apply([], array);

	let arrayWithProps = array
		.map(chunk => {
			let props = {};
			let propArray = [];
			try {
				propArray = propsregex.exec(chunk)[1].split(',');
				chunk = chunk.replace(propsregex,'').trim();
			} catch(e){
				true;
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
