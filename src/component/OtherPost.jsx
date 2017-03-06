import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './OtherPost.css';
import Post from './abstract/Post.jsx';


/*TODO: 1 react class per layout*/

class OtherPost extends Post {}
export default CSSModules(OtherPost,styles,{
	errorWhenNotFound: false
});
