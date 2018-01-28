const render = require('../view/index.html.js');

const route = (req, res, next) => res.send(render({
	mode: 'screenshot'
}));

module.exports = route;
