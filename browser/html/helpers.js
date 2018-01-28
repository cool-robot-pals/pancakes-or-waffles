import LayoutGetter from '../getter/layout.js';
import PostGetter from '../getter/post.js';

import escapeHTML from '../lib/escapeHTML.js';


const fonts = [
	'Roboto:400,500i',
	'Gentium+Book+Basic:700',
	'Patrick+Hand',
	'Poiret+One',
	'Roboto+Mono:500',
	'Oswald:600',
	'Lato:700,400',
	'Tulpen+One',
];


const getPostData = async defaults => {

	const layout = await new LayoutGetter({
		...defaults
	}).get();
	const postJs = await import('../post/'+layout+'/post.js')
	const postInstance = new postJs.default({
		layout: layout,
		...defaults
	});

	return postInstance.getPostData();

}


const render = postData => {

	const template =
	`
		<div
			class="post"
			data-variant="${postData.variant.map((variant,idx) => `(${idx}=${variant})`)}"
		>
			<div class="content">
				${
					[1,2].map(additionalContainer =>
						`<div class="ac-${additionalContainer}"></div>`
					).join('')
				}
				${
					postData.extras.map(extra =>
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
						postData.choices.map(choice =>
							`<div class="choice"><span>${escapeHTML(choice)}</span></div>`
						).join('')
					}
				</div>
			</div>
			<div class="bg" data-sink="true" style="background-image: url('${postData.bg}')"></div>
			<link rel="stylesheet" href="/app/post/${postData.layout}/post.css" />
		</div>
	`;

	const $div = document.createElement('div');
	$div.innerHTML = template;
	for(let key in postData.css) {
		$div.children[0].style.setProperty(key, postData.css[key]);
	}
	return $div.innerHTML;

}

export { render, getPostData }
