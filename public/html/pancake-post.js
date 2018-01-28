import { render, getPostData } from './helpers.js';

import { makeSeed } from '../lib/random.js';

class PancakePost extends HTMLElement {

	static get observedAttributes() {return ['data-seed','data-layout']; }

	constructor() {
		super();
		this.$shadow = this.attachShadow({mode: 'open'});
		this.postData = null;
	}

	async attributeChangedCallback(name, oldValue, newValue) {
		if(name === 'data-seed' && newValue !== oldValue) {
			return this.fetchAndRender();
		}
		if(name === 'data-layout' && newValue !== oldValue) {
			return this.fetchAndRender();
		}
	}

	async connectedCallback() {
		if(!this.dataset.seed) {
			this.dataset.seed = makeSeed();
		}
		else {
			return this.fetchAndRender();
		}
	}

	async fetchAndRender() {
		this.postData = await getPostData(this.dataset);
		this.render();
	}

	async render() {
		this.$shadow.innerHTML = render(this.postData);
		this.dispatchEvent(new CustomEvent('pancake-ready'));
	}

}

export default PancakePost;
