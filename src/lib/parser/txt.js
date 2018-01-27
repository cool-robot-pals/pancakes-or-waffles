const expandBracketWords = require('./txt/expandBracketWords.js');

const propsRegex = /\((.*?)\)/;

export const parse = (str) => {

	console.info('DEPRECATED use async fetch()->get() like LayoutGetter');

	let array = str.split('\n');

	array = array
		.map(chunk => chunk.trim())
		.filter(chunk => chunk.charAt(0) !== '#')
		.filter(chunk => chunk.length > 0)
		.map(chunk => chunk === '_empty_'?'':chunk)
		.map(chunk => expandBracketWords(chunk));

	array = [].concat.apply([], array);

	const arrayWithProps = array
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
