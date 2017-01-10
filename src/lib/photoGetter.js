var env = require('../env.js');
var random = require('../lib/random.js');

var apiUrl = 'https://www.googleapis.com/customsearch/v1';

module.exports = function(query,params) {

	if(!params) var params = {};
	if(!params.debug) params.debug = false;

	var dfd = jQuery.Deferred();
	if(params.debug === true) {
		dfd.resolve([
			'https://i.ytimg.com/vi/R45OaTeR_Gw/maxresdefault.jpg'
		]);
	}
	else {
		$.ajax({
			url: apiUrl,
			dataType: 'json',
			data: {
				q: query
				   + ' gameplay screenshot -site:deviantart.com  -site:youtube.com',
				safe: 'medium',
				searchType: 'image',
				imgSize: 'xxlarge',
				imgType: 'photo',
				cx: env.googleSearchCx,
				key: env.googleSearchKey,
			}
		}).done(function(response){

			response.items = response.items.filter(function(item){
				return item.image.width > item.image.height;
			});

			var length = 15;
			if(response.items.length < 15) length = response.items.length;

			dfd.resolve([
				response.items[Math.floor(Math.random() * length)].link
			]);
		});
	}
	return dfd.promise();
}
