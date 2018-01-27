#!/usr/bin/env node
/*eslint no-console:0 */
require('dotenv').config();
const server = require('../express/app.js');


server.listen(9191, (err) => {
	if (err) {
		throw new Error(err);
	}
	console.log('Listening on port: 9191.');
});
