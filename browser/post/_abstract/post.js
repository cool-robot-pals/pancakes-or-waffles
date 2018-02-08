import PostGetter from '../../getter/post.js';

import { extras as formatExtras, variant as formatVariant } from '../../lib/formatPostProps.js';
import usesSeededGetter from '../../lib/decorator/usesSeededGetter.js';

class Post {

	constructor(props) {

		this.attachRandomSeed(props.seed);
		this.layout = props.layout;
		this.context = {};

		this.postGetter = this.buildGetter(PostGetter).get().then(post =>
			Promise.all([
				post,
				()=>{this.context = post;},
				this.buildGetters()
			])
		).then(([post]) => post)

	}

	async getPostData() {

		const post = await this.postGetter;

		const [extraProps, background] = await Promise.all([
			this.getMoreProps(post),
			fetch(`/get-image/?query=${post.query}`).then(res => res.json())
		]);

		return {
			seed: this._seed,
			layout: this.layout,
			query: post.query,
			fandom: post.fandom,
			choices: post.choices,
			bg: background.url,
			variants: [],
			report: {},
			css: {},
			...extraProps,
			extras: formatExtras(extraProps.extras),
			variant: formatVariant(extraProps.variants),
		};

	}

	async buildGetters() {}

	async getMoreProps(post) {
		return {};
	}

}

export default usesSeededGetter(Post);
