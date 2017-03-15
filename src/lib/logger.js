const logger = (obj,path=[]) => {

	let rt = [];

	for(var k in obj) {
		if(typeof obj[k] === 'function') {
			continue;
		}
		if(typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
			rt = rt.concat(logger(obj[k],path.concat(obj[k])));
		}
		else {
			try {
				rt.push(
					path.join('/')
					+k.toUpperCase()
					+' - '
					+JSON.stringify(obj[k])
				);
			} catch(e){
				console.error(e);
			}
		}
	}

	return rt.join('\n');

};

export default logger;
