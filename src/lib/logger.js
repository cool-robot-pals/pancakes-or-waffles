const logger = (obj,path=[]) => {

	let rt = [];

	for(var k in obj) {
		if(typeof obj[k] === 'function') {
			continue;
		}
		if(typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
			rt = rt.concat(logger(obj[k],path.concat(k)));
		}
		else if (typeof obj[k] === 'object' && Array.isArray(obj[k])) {
			let objFromArray = obj[k].reduce(function(acc, cur, i) {
				acc[i] = cur; return acc;
			}, {});
			rt = rt.concat(logger(objFromArray,path.concat(k)));
		}
		else {
			try {
				rt.push(
					(path.length > 0?path.join('/').toUpperCase()+'/':'')
					+k.toUpperCase()
					+' - '
					+JSON.stringify(obj[k])
				);
			} catch(e){
				console.error(e);
			}
		}
	}

	return rt;

};

export default logger;
