import { render, getPostData } from './helpers.js';

import { makeSeed } from '../lib/random.js';

class PancakePost extends HTMLElement {

	static get observedAttributes() {return ['data-seed','data-layout']; }

	constructor() {
		super();
		this.$shadow = this.attachShadow({mode: 'open'});
		this.postData = null;
		this.q = 0;
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
		this.$shadow.innerHTML =
		`
		<style>
			:host {
				width: 1280px;
				height: 720px;
				background: #000;
			}
		</style>
		`
		if(!this.dataset.seed) {
			this.dataset.seed = makeSeed();
		}
		else {
			return this.fetchAndRender();
		}
	}

	/*
	this.q prevents a post being redrawn many times
	on fast data change by blocking changes if there's
	many promises racing at once, it's a bit ugly
	*/

	async fetchAndRender() {
		this.q++;
		this.postData = await getPostData(this.dataset);
		this.q--;
		this.render();
	}

	async render() {
		if(this.q == 0){
			this.$shadow.innerHTML = render(await this.postData);
			this.dispatchEvent(new CustomEvent('pancake-ready',{
				detail: {
					postData: this.postData
				}
			}));
		}
	}

}

export default PancakePost;
