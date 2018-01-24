import React from 'react';

import PostGetter from 'getter/post';

import formatPropExtras from 'lib/formatPropExtras';
import usesGetter from 'lib/decorator/usesGetter';

class Post {

	constructor(props) {

		this.seed = props.seed;
		this.post = new PostGetter({
			seed: this.seed
		}).values;
		this.defaults = this.post;
    this.state = {};

    this.onReadyState = Promise.all([
      this.getMoreProps(),
      fetch(`/get-image/?query=${this.state.query}`).then(res => res.json())
    ]).then(([extraProps,background]) => {
    		this.state = {
    			seed: this.seed,
    			query: this.post.query,
    			fandom: this.post.fandom,
    			choices: this.post.choices,
    			bg: background.url,
    			variants: [],
    			report: {},
    			...extraProps,
          extras: formatPropExtras(extraProps.extras),
    		};
        return Promise.resolve();
    })

	}

	getMoreProps() {
		return {};
	}

  get variant() {
    let rt = [];
    this.state.variants.map((variant,idx) => {
      rt.push(Math.ceil(Math.random()*variant));
    });
    return rt;
  }

	get $element() {

		console.log(this.styles);

    const template =
    `
      <div
        class="${this.styles.post}"
        data-variant="${this.variant.map((variant,idx) => `(${idx}=${variant})`)}"
      >
        ${
          [1,2].map(additionalContainer =>
            `<div
							class="${this.styles['ac-'+additionalContainer]}"
            ></div>`
          ).join('')
        }
        ${
          this.state.extras.map(extra =>
            `<div
              key="extra-${extra.key}"
              data-val="${extra.value}"
              data-name="${extra.key}"
              class="${this.styles.extra}"
              style="${extra.style}"
            >
              <span>${extra.value}</span>
            </div>`
          ).join('')
        }
        <div class="${this.styles.choices}">
          ${
            this.state.choices.map(choice =>
              `<div class="${this.styles.choice}"><span>${choice}</span></div>`
            ).join('')
          }
        </div>
        <div class="${this.styles.bg}" data-sink="true" style="background-image: url('${this.state.bg}')" />
      </div>
    `

		const $div = document.createElement('div');
		$div.innerHTML = template;

		return $div;
	}

}

export default usesGetter(Post);
