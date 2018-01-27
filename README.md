# Pancakes or waffles!!
Creates fake video game screenshots decipting player choices

<div align="center"><img src="https://pbs.twimg.com/media/C6awIPJXQAAgOcF.jpg:orig" /></div>


## Building

    $ npm install
    /*first time*/

    $ npm run watch
    /*for live development, on localhost:9191*/

    $ npm run localpost
    /*for posting a final photo to transfer.sh (private & requires no env. for testing)*/

    $ npm run shitpost
    /*for posting a final photo to twitter*/


## Image Search
To use Google image search you need an api key and a custom search engine. Get those and add them as env variables. Godspeed. We use [dotenv](https://www.npmjs.com/package/dotenv) so you can add them to a `.env` file for local dev.

- MC_GOOGLE_CX
-	MC_GOOGLE_KEY


## Tweeting
To actually use `npm run shitpost` you need the following env variables.
- MC_TWITTER_APPK (consumer_key)
- MC_TWITTER_APPS (consumer_secret)
- MC_TWITTER_AT (access_token)
- MC_TWITTER_S (access_token_secret)


## Testing
The bot generates webpages, after the server is running you can visit `https://localhost:9191` to see the page the bot sees or `https://localhost:9191/test` to see a cool dashboard.

You can ensure the code works by running `npm test`.
