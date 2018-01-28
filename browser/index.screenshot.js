import queryStringParser from '/target/npm/query-string.js';
import logger from './lib/logger.js';
import PancakePost from './html/pancake-post.js'

customElements.define('pancake-post', PancakePost);

const $pancake = document.createElement('pancake-post');
const queryString = queryStringParser.parse(location.search);

if (queryString.layout) {
	$pancake.dataset.layout = queryString.layout;
}

$pancake.addEventListener('pancake-ready',(ev)=>{
	logger(ev.detail.postData).forEach(line => console.log(line))
})

document.getElementById('pancakes').appendChild($pancake);
