module.exports = {
	twitterConsumerKey: process.env.MC_TWITTER_APPK,
	twitterConsumerSecret: process.env.MC_TWITTER_APPS,
	twitterAccess: process.env.MC_TWITTER_AT,
	twitterSecret: process.env.MC_TWITTER_S,
	googleSearchCx: process.env.MC_GOOGLE_CX,
	googleSearchKey: process.env.MC_GOOGLE_KEY
};

/*
	You can get all the Twitter keys by 
	creating an app on https://apps.twitter.com
	Create it from your bot's account and use its own
	access token and secret key to bypass logging in.
	
	Google requires you to make a custom search engine @
	https://cse.google.com/cse/create/new, you can set it up
	to search any random site, then go to its config and
	delete that site so it searches the whole web.
	You can get the cx code from 'Get code' or 
	'Get search engine ID'
	
	AFTER that you need to make an API key (this is different
	for some reason) at https://console.cloud.google.com/apis
	make sure it can use Custom Search API and just generate 
	your key and you are golden
*/
