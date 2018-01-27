import PostGetter from 'getter/post';
import logger from 'lib/logger';

import formatPropExtras from 'lib/formatPropExtras';
import escapeHTML from 'lib/escapeHTML';
import usesGetter from 'lib/decorator/usesGetter';
import {getRandomCss} from 'lib/getRandomCss';

class Post {

	constructor(props) {

		this.attachRandomSeed(props.seed);
		this.name = props.name;
		this.state = {};

	}

	async onReadyState() {

		const post = await this.buildGetter(PostGetter).get();
		this.defaults = post;

		const [extraProps,background] = await Promise.all([
			this.getMoreProps(post),
			fetch(`/get-image/?query=${post.query}`).then(res => res.json())
		]);

		this.state = {
			seed: this.seed,
			query: post.query,
			fandom: post.fandom,
			choices: post.choices,
			bg: background.url,
			variants: [],
			report: {},
			...extraProps,
			extras: formatPropExtras(extraProps.extras),
		};


	}

	logState() {
		return logger(this.state);
	}

	async getMoreProps(post) {
		return {};
	}

	get variant() {
		let rt = [];
		this.state.variants.map((variant,idx) => {
			rt.push(Math.ceil(Math.random()*variant));
		});
		return rt;
	}

	async getElement() {

		await this.onReadyState();

		const template =
		`
			<div
				class="post"
				data-variant="${this.variant.map((variant,idx) => `(${idx}=${variant})`)}"
			>
				${
					[1,2].map(additionalContainer =>
						`<div class="ac-${additionalContainer}"></div>`
					).join('')
				}
				${
					this.state.extras.map(extra =>
						`<div
								key="extra-${extra.key}"
								data-val="${extra.value}"
								data-name="${extra.key}"
								class="extra"
								style="${Object.keys(extra.style).map(key=>`${key}:${extra.style[key]}`).join(';')}"
							>
								<span>${escapeHTML(extra.value)}</span>
							</div>`
					).join('')
				}
				<div class="choices">
					${
						this.state.choices.map(choice =>
							`<div class="choice"><span>${escapeHTML(choice)}</span></div>`
						).join('')
					}
				</div>
				<div class="bg" data-sink="true" style="background-image: url('${this.state.bg}')" />
			</div>
		`;

		const $div = document.createElement('div');
		const $shadow = $div.attachShadow({mode: 'open'});

		$shadow.innerHTML = template;

		const $link = document.createElement('link');
		$link.href = `/src/post/${this.name}.css`;
		$link.rel = 'stylesheet';
		$shadow.appendChild($link);

		getRandomCss().forEach(variable=>{
			$shadow.children[0].style.setProperty(`--${variable.name}`, variable.value);
		});

		return $div;
	}

}

export default usesGetter(Post);
