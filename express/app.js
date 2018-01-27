const express = require('express');
const path = require('path');

const googleImageSearch = require('./googleImageSearch.js');

const indexRoute = require('./route/index.js')
const testRoute = require('./route/test.js')

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.use('/test', express.static(path.resolve(__dirname, '../test')));
app.get('/test/mocha.js', (req, res, next) => res.sendFile(path.resolve(__dirname, '../node_modules/mocha/mocha.js')));

app.use('/src', express.static(path.resolve(__dirname, '../src')));
app.use('/corpus', express.static(path.resolve(__dirname, '../corpus')));

app.get('/get-image', (req, res, next) =>
	googleImageSearch(req.query.query).then(data=>res.json(data)).catch(console.error)
);

app.get('/', indexRoute);
app.get('/test', testRoute);

module.exports = app;
