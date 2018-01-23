#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();
const server = require('../express/app.js');

server.listen(9191, () => console.log('Example app listening on port 9191!'));
