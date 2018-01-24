import styles from './SaintsRowPost.css';
import Post from './abstract/Post.js';

import addStyles from 'lib/decorator/addStyles';

class SaintsRowPost extends Post {}

module.exports = addStyles(SaintsRowPost,styles);
