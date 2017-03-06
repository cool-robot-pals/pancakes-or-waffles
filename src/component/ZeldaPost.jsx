import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './ZeldaPost.css';
import Post from './abstract/Post.jsx';


class ZeldaPost extends Post {}

module.exports = CSSModules(ZeldaPost,styles,{
	errorWhenNotFound: false
});
