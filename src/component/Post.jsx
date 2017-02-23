import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Post.css';

import photoGetter from 'lib/photoGetter';

@CSSModules(styles)
class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {likesCount : 0};
		this.state.bg = 'undefined';
		this.getPhotos = photoGetter(this.props.photoQuery,{
			debug: false
		})
	}

	componentDidMount () {
		this.getPhotos.done(photos => {
			this.setState({
				bg: photos[0]
			})
		})
	}

	render() {
		let backgroundStyle = {
			backgroundImage: `url(${this.state.bg})`
		};
		let choices = this.props.choices;
		return (
			<div
				styleName='post'
				data-layout={this.props.layout}
			>
				{
					[1,2].map(extra => <div key={'x'+extra} styleName={'x'+extra} /> )
				}
				<div styleName='choices'>
					{
						choices.map(choice => {
							return <div styleName='choice' key={choice}><span key={'wr'+choice}>{choice}</span></div>
						})
					}
				</div>
				<div styleName='bg' style={backgroundStyle} />
			</div>
		);
	}

}

export default Post;
