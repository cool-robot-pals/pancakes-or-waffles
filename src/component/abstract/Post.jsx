import React from 'react';

import photoGetter from 'lib/photoGetter';


class Post extends React.Component {

	constructor(props) {
		super(props);
		let initialState = {
			bg: undefined
		};
		this.state = Object.assign(
			{},
			initialState,
			this.props,
			this.getMoreProps()
		);
		this.getPhotos = photoGetter(this.state.photoQuery,{
			debug: false
		});
	}

	getMoreProps() {
		return {}
	}

	componentDidMount() {
		this.getPhotos
		.then(photos => {
			this.setState({
				bg: photos[0]
			});
		})
		.catch(e => {
			console.error(e);
		});
	}

	render() {
		let backgroundStyle = {
			backgroundImage: `url(${this.state.bg})`
		};
		let choices = this.state.choices;
		return (
			<div
				styleName={'post'}
				data-layout={this.state.layout.id}
				data-variant=
				{
					this.state.variants.map((variant,idx) => {
						return `(${idx}=${Math.ceil(Math.random()*variant)})`;
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
					Object.keys(this.state.extras).map(extra => {
						return <div
							key={'extra-'+extra}
							data-val={this.state.extras[extra]}
							data-name={extra}
							styleName='extra'>
								<span>{this.state.extras[extra]}</span>
						</div>;
					})
				}
				<div styleName='choices'>
					{
						choices.map(choice => {
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
