import request from 'browser-request';
import env from 'env';
import random from 'lib/random';

const pagesToLoad = 4;
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

			const parameters = {
				q: [
					query,
					'gameplay',
					'screenshot',
					'-slideshow',
					'-site:youtube.com'
				].join(' '),
				safe: 'medium',
				searchType: 'image',
				imgSize: 'xxlarge',
				num: 10,
				imgType: 'photo',
				cx: env.googleSearchCx,
				key: env.googleSearchKey,
			};

			let results = [];
			let pagesLoaded = 0;
			const onResults = (localResults) => {
				pagesLoaded++;
				localResults = localResults.filter(function(item){
					return item.image.width > item.image.height;
				});
				results = results.concat(localResults);
				if(pagesLoaded >= pagesToLoad) {
					resolve([
						results[Math.floor(Math.random() * results.length)].link
					]);
				}
			}

			for(let i = 0; i < pagesToLoad; i++) {
				request({
					url: apiUrl,
					json: true,
					qs: Object.assign(
						{},
						parameters,
						{
							start: (10*i)+1
						}
					)
				},(error,response,body)=>{
					if(error || !body.items) {
						reject(error?error:'req failed');
					}
					else {
						onResults(body.items);
					}
				});
			}

		}
	});
};
