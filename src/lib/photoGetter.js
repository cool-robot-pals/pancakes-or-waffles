import request from 'browser-request';
import env from 'env';
import random from 'lib/random';

const apiUrl = 'https://www.googleapis.com/customsearch/v1';

module.exports = function(query,params) {

	if(!params) params = {};
	if(!params.debug) params.debug = false;

	return new Promise((resolve,reject) => {

		if(!env.googleSearchCx || params.debug === true) {
			resolve([
				'http://cdn3.dualshockers.com/wp-content/uploads/2015/09/GravityRushRemastered-6.jpg'
			]);
		}
		else {
			request({
				url: apiUrl,
				json: true,
				qs: {
					q: query
						+ ' gameplay screenshot -slideshow -site:deviantart.com  -site:youtube.com',
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

					var length = 40;
					if(body.items.length < lenght) length = body.items.length;

					resolve([
						body.items[Math.floor(Math.random() * length)].link
					]);
				}
			});
		}
	});
};
