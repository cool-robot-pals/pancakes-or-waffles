import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './FalloutPost.css';
import Post from './abstract/Post.jsx';


class FalloutPost extends Post {}

module.exports = CSSModules(FalloutPost,styles,{
	errorWhenNotFound: false
});
