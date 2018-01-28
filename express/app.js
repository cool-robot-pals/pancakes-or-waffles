const express = require('express');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const app = express();

app.use('/target', express.static(path.resolve(__dirname, '../target')));
app.use('/view', express.static(path.resolve(__dirname, './view')));

app.use('/app', express.static(path.resolve(__dirname, '../browser')));
app.use('/corpus', express.static(path.resolve(__dirname, '../corpus')));

app.get('/', require('./route/screenshot.js'));
app.get('/test', require('./route/test.js'));
app.get('/wall', require('./route/wall.js'));

app.get('/get-image', require('./route/get-image.js'));
app.get('/get-corpus/:item*', require('./route/get-corpus.js'));

const spdyApp = spdy.createServer({
	key: fs.readFileSync(`${__dirname}/../server.key`),
	cert: fs.readFileSync(`${__dirname}/../server.crt`)
}, app);

module.exports = spdyApp;
