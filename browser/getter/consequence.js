import abstractGetter from './abstract/abstract.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../lib/stringies.js';

export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'consequence';
	}

	async reduce(list) {
		return capitalizeFirstLetter(await this.expandKeywordHelper(
			this.randomArray(list)
		));
	}

}
