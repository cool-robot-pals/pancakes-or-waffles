import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './RememberMePost.css';
import Post from './abstract/Post.jsx';


class RememberMePost extends Post {}

module.exports = CSSModules(RememberMePost,styles,{
	errorWhenNotFound: false
});
