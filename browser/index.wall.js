import LayoutGetter from './getter/layout.js';
import PancakePost from './html/pancake-post.js';

customElements.define('pancake-post', PancakePost);

const $pancake = document.createElement('pancake-post');

new LayoutGetter().fetch().then(fetchedLayouts => {
	const layoutsTriple = [...fetchedLayouts,...fetchedLayouts,...fetchedLayouts];

	layoutsTriple.forEach(layout => {
		const $pancake = document.createElement('pancake-post');
		$pancake.dataset.layout = layout;
		document.getElementById('pancakes').appendChild($pancake);
	});

	document.getElementById('pancakes').classList.add('huge');
});
