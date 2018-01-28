import PancakePost from './html/pancake-post.js'
import __ from '/target/npm/mocha/mocha.js'
import tests from './etc/mocha.js'

window.mocha.setup('bdd');

customElements.define('pancake-post', PancakePost);
tests();
