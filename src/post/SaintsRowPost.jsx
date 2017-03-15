import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './SaintsRowPost.css';
import Post from './abstract/Post.jsx';


class SaintsRowPost extends Post {}

module.exports = CSSModules(SaintsRowPost,styles,{
	errorWhenNotFound: false
});
