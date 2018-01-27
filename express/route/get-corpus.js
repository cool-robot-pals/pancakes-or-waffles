const fs = require('fs');

const txtParser = require('../lib/parser/txt');
const yamlParser = require('js-yaml');

const route = (req, res, next) => {

	const path = __dirname+`/../../corpus/${req.params.item}${req.param(0)?'/'+req.param(0):''}`;

	try {
		fs.accessSync(`${path}.txt`, fs.constants.R_OK);
		fs.readFile(`${path}.txt`, 'utf8', function(err, contents) {
			res.json(txtParser(contents));
		});
	} catch(err) {
		fs.accessSync(`${path}.yaml`, fs.constants.R_OK);
		fs.readFile(`${path}.yaml`, 'utf8', function(err, contents) {
			res.json(yamlParser.safeLoad(contents));
		});
	}

};

module.exports = route;
