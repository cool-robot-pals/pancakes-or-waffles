const explodeRegex = /\[(.*?)\]/;

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

export default (chunk) => {

	while(explodeChunkVariables(chunk).length > 0) {
		chunk = explodeChunkVariables(chunk);
	}
	if(typeof chunk === 'string') {
		chunk = [chunk];
	}
	return chunk;
};
