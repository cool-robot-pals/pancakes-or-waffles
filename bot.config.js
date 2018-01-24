const path = require('path');

export default {
	'paths': {
		'build': 'build',
		'dll': path.join('etc','dll'),
		'tools': path.join('etc','tools'),
		'test': 'test'
	},
	'filenames': {
		'base': 'index',
		'test': 'test'
	}
};
