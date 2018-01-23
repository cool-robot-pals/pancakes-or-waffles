#!/usr/bin/env node
/*eslint no-console:0 */

require('dotenv').config();

const path = require('path');
const reporter = require('./tools/reporter.js');
const config = require('../bot.config.js');

const spawn = require('child_process').spawn;
const child = spawn('curl',[
  '--upload-file',
  `./${path.join(config.paths.build,`${config.filenames.base}.jpg`)}`,
  'https://transfer.sh/'
]);

child.stdout.on('data', buffer => {
  reporter.success('Posted');
  console.log(
    buffer.toString().replace('\n','')
  );
});
child.stdout.on('end', () => process.exit());
