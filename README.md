# Pancakes or waffles!!
Creates fake video game screenshots depicting screens with player choices

<div align="center"><img src="https://pbs.twimg.com/media/C6awIPJXQAAgOcF.jpg:orig" /></div>


## Building

    $ npm install


## Posting

    $ npm run localpost
Makes & posts a screenshot to transfer.sh (private & requires no env. for testing)

    $ npm run shitpost
Makes & posts a screenshot to Twitter

    $ npm run localpost --layout=dk64
Forces a specific post layout. Can be used with either `localpost` or `shitpost`

Dig into `package.json` to see how these commands are constructed to unlock the ability to do cool things, such as posting to twitter a really good looking `localpost` one without overriding it.


## Hey Twitter doesn't work and all posts have Gravity Rush as the background

Ah yes. You need couple of API Keys to unlock the full power of this thing, sorry about that.


### Image Search
To use Google image search you need an api key and a custom search engine key. Get those and add them as env variables. Godspeed. This project uses [dotenv](https://www.npmjs.com/package/dotenv) so you can add them to a `.env` file for local development.

- `MC_GOOGLE_CX`
- `MC_GOOGLE_KEY`

### Tweeting
To actually use `npm run shitpost` you need the following env variables.
- `MC_TWITTER_APPK` (consumer_key)
- `MC_TWITTER_APPS` (consumer_secret)
- `MC_TWITTER_AT` (access_token)
- `MC_TWITTER_S` (access_token_secret)


## Testing

    $ npm run watch
Starts the local server

The bot generates webpages. After the server is running you can visit `https://localhost:9191` to see the page the bot sees or `https://localhost:9191/wall` to see a cool dashboard.

You can ensure the code works by running `npm test`.
