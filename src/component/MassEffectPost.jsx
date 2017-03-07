import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './MassEffectPost.css';
import Post from './abstract/Post.jsx';


class MassEffectPost extends Post {}

module.exports = CSSModules(MassEffectPost,styles,{
	errorWhenNotFound: false
});
