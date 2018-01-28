const express = require('express');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.use('/target', express.static(path.resolve(__dirname, '../target')));

app.use('/test', express.static(path.resolve(__dirname, '../test')));
app.get('/test/mocha.js', (req, res, next) => res.sendFile(path.resolve(__dirname, '../node_modules/mocha/mocha.js')));

app.use('/app', express.static(path.resolve(__dirname, '../public')));
app.use('/corpus', express.static(path.resolve(__dirname, '../corpus')));

app.get('/', require('./route/index.js'));
app.get('/test', require('./route/test.js'));
app.get('/get-image', require('./route/get-image.js'));
app.get('/get-corpus/:item*', require('./route/get-corpus.js'));

const spdyApp = spdy.createServer({
	key: fs.readFileSync(`${__dirname}/../server.key`),
	cert: fs.readFileSync(`${__dirname}/../server.crt`)
}, app);

module.exports = spdyApp;
