import {randomArray} from '../lib/random.js';

const getRandomCssBase = () =>
	[
		{
			name: 'flex',
			value: randomArray(['flex-start','flex-end']),
		},
		{
			name: 'flex-with-center',
			value: randomArray(['flex-start','center','flex-end']),
		}
	];

export const getRandomCss = () => [
	...getRandomCssBase(),
	...getRandomCssBase().map(key => {key.name += '-alt'; return key;})
];
