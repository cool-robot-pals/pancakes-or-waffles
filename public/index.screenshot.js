import queryStringParser from '/target/npm/query-string.js';
import logger from './lib/logger.js';
import PancakePost from './html/pancake-post.js'

const $pancake = document.createElement('pancake-post');
const queryString = queryStringParser.parse(location.search);


customElements.define('pancake-post', PancakePost);
if (queryString.layout) {
	$pancake.dataset.layout = queryString.layout;
}

$pancake.addEventListener('pancake-ready',(ev)=>{
	logger(ev.target.postData).forEach(line => console.log(line))
})

document.getElementById('pancakes').appendChild($pancake);
