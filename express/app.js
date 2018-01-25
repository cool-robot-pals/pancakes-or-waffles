const express = require('express');
const path = require('path');

const googleImageSearch = require('./googleImageSearch.js');

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
app.get('/get-image', (req, res, next) =>
	googleImageSearch(req.query.query).then(data=>res.json(data)).catch(console.error)
);

app.use('/test', express.static(path.resolve(__dirname, '../test')));
app.get('/test.html', (req, res, next) => res.sendFile(path.resolve(__dirname, '../build/test.html')));
app.get('/test/mocha.js', (req, res, next) => res.sendFile(path.resolve(__dirname, '../node_modules/mocha/mocha.js')));

app.use('/src', express.static(path.resolve(__dirname, '../src')));

module.exports = app;
