import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Post.css';

import photoGetter from 'lib/photoGetter';


class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bg: undefined
		};
		this.getPhotos = photoGetter(this.props.photoQuery,{
			debug: false
		});
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
		let choices = this.props.choices;
		return (
			<div
				styleName='post'
				data-layout={this.props.layout.id}
			>
				{
					[1,2].map(extra => <div key={'x'+extra} styleName={'x'+extra} /> )
				}
				{
					Object.keys(this.props.extras).map(extra => {
						return <div
							key={'x'+extra}
							data-val={this.props.extras[extra]}
							data-name={extra}
							styleName='extra'>
								{this.props.extras[extra]}
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
				<div styleName='bg' style={backgroundStyle} />
			</div>
		);
	}

}

export default CSSModules(Post,styles,{
	errorWhenNotFound: false
});
