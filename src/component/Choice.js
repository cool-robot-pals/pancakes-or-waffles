import React from 'react';
import CSSModules from 'react-css-modules';

import photoGetter from 'lib/photoGetter';

class Choice extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className={this.props.className}
			>
				<span>
					{this.props.name}
				</span>
			</div>
		);
	}

}

export default Choice;
