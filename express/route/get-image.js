const googleImageSearch = require('../lib/googleImageSearch.js');

const route = (req, res, next) => googleImageSearch(req.query.query).then(data=>res.json(data)).catch(console.error);

module.exports = route;
