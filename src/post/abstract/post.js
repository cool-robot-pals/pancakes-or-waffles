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
        return Promise.success();
    })

	}

	async getMoreProps() {
		return {};
	}

  get variant() {
    let rt = [];
    this.state.variants.map((variant,idx) => {
      rt.push(Math.ceil(Math.random()*variant));
    });
    return rt;
  }

	render() {
    return
    `
      <div
        styleName="post"
        data-variant="${this.variant.map((variant,idx) => `(${idx}=${variant})`)}"
      >
        ${
          [1,2].map(additionalContainer =>
            `<div
              styleName="ac-${additionalContainer}""
            ></div>`
          )
        }
        ${
          this.state.extras.map(extra =>
            `<div
              key="extra-${extra.key}"
              data-val="${extra.value}"
              data-name="${extra.key}"
              styleName="extra"
              style="${extra.style}"
            >
              <span>${extra.value}</span>
            </div>`
          )
        }
        <div styleName="choices">
          ${
            this.state.choices.map(choice =>
              `<div styleName="choice"><span>${choice}</span></div>`
            )
          }
        </div>
        <div styleName="bg" data-sink="true" style="url('${this.state.bg}')" />
      </div>
    `
	}

}

export default usesGetter(Post);
