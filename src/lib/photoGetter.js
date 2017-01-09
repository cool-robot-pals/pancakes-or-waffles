var env = require('../env.js');
var random = require('../lib/random.js');

var apiUrl = 'https://www.googleapis.com/customsearch/v1';

module.exports = function(query,params) {

	if(!params) var params = {};
	if(!params.debug) params.debug = false;

	var dfd = jQuery.Deferred();
	if(params.debug === true) {
		dfd.resolve([
			'https://i.ytimg.com/vi/R45OaTeR_Gw/maxresdefault.jpg',
			'https://i.ytimg.com/vi/R45OaTeR_Gw/maxresdefault.jpg'
		]);
	}
	else {
		$.ajax({
			url: apiUrl,
			dataType: 'json',
			data: {
				q: query
				   + ' screenshot -site:deviantart.com  -site:youtube.com',
				safe: 'medium',
				searchType: 'image',
				imgSize: 'xlarge',
				imgType: random(['photo','face']),
				cx: env.googleSearchCx,
				key: env.googleSearchKey,
			}
		}).done(function(response){
			dfd.resolve([
				response.items[Math.floor(Math.random() * response.items.length)].link,
				response.items[Math.floor(Math.random() * response.items.length)].link
			]);
		});
	}
	return dfd.promise();
}
