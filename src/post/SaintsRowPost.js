import styles from './SaintsRowPost.css';
import Post from './abstract/Post.js';
import addStyles from 'lib/decorator/addStyles';

class CustomPost extends Post {}

export default addStyles(CustomPost,styles);
