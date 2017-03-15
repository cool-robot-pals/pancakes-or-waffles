const logger = (obj,path='') => {

	let rt = [];

	for(var k in obj) {
		if(typeof obj[k] === 'function') {
			continue;
		}
		if(typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
			rt = rt.concat(logger(obj[k],k));
		}
		else {
			try {
				rt.push(
					(path?path.toUpperCase()+'/':'')
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
