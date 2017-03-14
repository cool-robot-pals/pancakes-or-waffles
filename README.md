# Pancakes or waffles!!
Creates fake video game screenshots decipting player choices

<div align="center"><img src="https://pbs.twimg.com/media/C6awIPJXQAAgOcF.jpg:orig" /></div>

## Building
To actually post a tweet you need to get all the variables on [src/env.js](https://github.com/walaura/tough-choices-bot/blob/master/src/env.js) inside your environment. Otherwise you can ignore that.

    $ npm install
    /*first time*/

    $ npm run webpack --watch
    /*for live development*/

    $ npm run shitpost
    /*for posting a final photo to twitter*/

	$ npm run localpost
	/*for posting a final photo to transfer.sh (private & requires no env. for testing)*/


## Testing
The bot generates webpages, after doing an initial `webpack` you can just head to  `test/index.html` to open the test page ( or `build/index.html` to see the final result)

When it comes to turning them into images, this poor thing runs on phantomJS, which is OLD, even as all js & css code (okay not that one yet) is transpiled and prefixed via babel i like to keep a copy of firefox 10 around to see if anything crashes as it does reporting.

You can ensure code works by running `npm test` which will run the mocha test suite inside the same phantom instance, this tests for some code coverage but even more importantly it ensures the code runs AT ALL inside phantom, which is the most common bug here.
