const expandBracketWords = require('./txt/expandBracketWords.js');
const expandProps = require('./txt/expandProps.js');



const parse = (str) => {

	return str.split('\n')

		/*
		basic mangling
		*/
		.map(chunk => chunk.trim())
		.filter(chunk => chunk.charAt(0) !== '#')
		.filter(chunk => chunk.length > 0)
		.map(chunk => chunk === '_empty_'?'':chunk)

		/*
		expand [the words, the things] between
		brackets into all possibilities, then
		expand all to fix the probabilities biasing
		towards the bracketed ones
		*/
		.map(expandBracketWords)
		.map((item, index, original) => {
			const max = original
				.map(_ => _.length)
				.reduce((acc,item) =>
					item > acc
						? item
						: acc
					, 0 );
			while(item.length < max) {
				item = [...item, ...item];
			}
			return item;
		})
		.reduce((acc,chunk)=>[...acc,...chunk],[])

		/*
		grab the props specified at the end
		*/
		.map(expandProps)
		.map((chunk,i,original) => {
			const propCount = original.reduce((acc,current) =>
				acc + Object.keys(current.props).length
				, 0);
			return propCount < 1
				? chunk.value
				: chunk;
		});

};




module.exports = parse;
