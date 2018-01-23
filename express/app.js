const express = require('express');
const path = require('path');

const googleImageSearch = require('./googleImageSearch.js');

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
app.get('/get-info', (req, res, next) =>
	googleImageSearch(req.query.query).then(image=>
		res.json({
			image
		})
	)
);

module.exports = app;
