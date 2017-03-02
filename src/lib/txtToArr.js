export default (str) => {
	const propsregex = /\((.*)?\)/;
	return str
		.split('\n')
		.map(chunk => chunk.trim())
		.filter(chunk => chunk.charAt(0) !== '#')
		.filter(chunk => chunk.length > 0)
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
};
