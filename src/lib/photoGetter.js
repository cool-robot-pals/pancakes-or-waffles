import request from 'browser-request';
import env from 'env';
import random from 'lib/random';

const apiUrl = 'https://www.googleapis.com/customsearch/v1';

module.exports = function(query,params) {

	if(!params) var params = {};
	if(!params.debug) params.debug = false;

	return new Promise((resolve,reject) => {

		if(!env.googleSearchCx || params.debug === true) {
			resolve([
				'https://i.ytimg.com/vi/R45OaTeR_Gw/maxresdefault.jpg'
			]);
		}
		else {
			request({
				url: apiUrl,
				json: true,
				qs: {
					q: query
					   + ' gameplay screenshot -site:deviantart.com  -site:youtube.com',
					safe: 'medium',
					searchType: 'image',
					imgSize: 'xxlarge',
					imgType: 'photo',
					cx: env.googleSearchCx,
					key: env.googleSearchKey,
				}
			},(error,response,body)=>{

				if(error || !body.items) {
					reject(error?error:'req failed');
				}
				else {
					body.items = body.items.filter(function(item){
						return item.image.width > item.image.height;
					});

					var length = 30;
					if(body.items.length < 30) length = body.items.length;

					resolve([
						body.items[Math.floor(Math.random() * length)].link
					]);
				}
			})
		}
	});
};
