import queryStringParser from '/target/npm/query-string.js';
import PancakePost from './html/pancake-post.js'


customElements.define('pancake-post', PancakePost);

$pancake.addEventListener('pancake-ready',(ev)=>{
	logger(ev.target.postData).forEach(line => console.log(line))
})
const $pancake = document.createElement('pancake-post');
document.getElementById('pancakes').appendChild($pancake);

(async () => {
	const $script = document.createElement("script");
	$script.src = '/test/test.js'
	document.getElementsByTagName("head")[0].appendChild($script);
})()
