# tough-choices-bot
Creates fake video game screenshots

<div align="center"><img src="https://pbs.twimg.com/media/C4kTNIgVMAE0SMp.jpg:orig" /></div>

## Building
To actually post a tweet you need to get all the variables on [src/env.js](https://github.com/walaura/tough-choices-bot/blob/master/src/env.js) inside your environment. Otherwise you can ignore that.

    $ npm install
    /*first time*/

    $ npm run webpack --watch
    /*for live development*/

    $ npm run shitpost
    /*for posting a final photo to twitter*/

	$ npm run localpost
	/*for posting a final photo to transfer.sh (for your eyes only)*/


## Testing
This poor thing runs on phantomJS, which is OLD, even as all js & css code (okay not that one yet) is transpiled and prefixed i like to keep a copy of firefox 10 around to see if anything crashes as it does reporting. You can also do

    $ ./node_modules/.bin/gulp webshot
    $ curl --upload-file build/choice.jpg transfer.sh

To see what screenshot comes out

## Why the fuck is this a 100MB react app
I'm using it as my personal playground okay
