import Post from 'component/Post';
import React from 'react';


export default (params) => {
	return React.createElement(
		Post,
		{
			photoQuery: params.photoQuery,
			layout: params.layout,
			choices: params.choices,
			key: params.key
		}
	);
}
