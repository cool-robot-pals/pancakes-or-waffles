import React from 'react';

import photoGetter from 'lib/photoGetter';
import formatPropExtras from 'lib/formatPropExtras';


class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			report: {
				photoQuery: props.photoQuery
			},
			variants: [],
			variant: [],
			extras: [],
			bg: undefined,
			fandom: props.fandom,
			choices: props.choices,
			...this.getMoreProps()
		};
		this.state.extras = formatPropExtras(this.state.extras);
		this.state.variants.map((variant,idx) => {
			this.state.variant.push(Math.ceil(Math.random()*variant));
		});
		this.props.onUpdate(this.state);
	}

	getMoreProps() {
		return {};
	}

	componentDidUpdate() {
		this.props.onUpdate(this.state);
	}

	componentDidMount() {
		photoGetter(this.props.photoQuery)
		.then(photos => {
			this.setState({
				bg: photos.url,
				report: {
					...this.state.report,
					photoQuery: photos
				}
			});
		})
		.catch(e => {
			console.error(e);
		});
	}

	render() {
		this.props.onUpdate(this.state);
		let backgroundStyle = {
			backgroundImage: `url(${this.state.bg})`
		};
		return (
			<div
				styleName={'post'}
				data-variant=
				{
					this.state.variant.map((variant,idx) => {
						return `(${idx}=${variant})`;
					})
				}
			>
				{
					[1,2].map(additionalContainer => {
						return <div
							key={'additionalContainer-'+additionalContainer}
							styleName={'ac-'+additionalContainer}
						/>;
					})
				}
				{
					this.state.extras.map(extra => {
						return <div
							key={'extra-'+extra.key}
							data-val={extra.value}
							data-name={extra.key}
							styleName='extra'
							style={extra.style}
						>
								<span>{extra.value}</span>
						</div>;
					})
				}
				<div styleName='choices'>
					{
						this.state.choices.map(choice => {
							return <div styleName='choice' key={choice}><span key={'wr'+choice}>{choice}</span></div>;
						})
					}
				</div>
				<div styleName='bg' data-sink="true" style={backgroundStyle} />
			</div>
		);
	}

}

export default Post;
