import addStyles from 'lib/decorator/addStyles';


import styles from './RememberMePost.css';
import Post from './abstract/Post.js';


class CustomPost extends Post {}

export default addStyles(CustomPost,styles);
