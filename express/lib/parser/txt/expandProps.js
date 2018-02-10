const propsRegex = /\((.*?)\)/;

module.exports = (chunk) => {

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
	
};
