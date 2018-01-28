import abstractGetter from '../abstract/abstract.js';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from '../../lib/stringies.js';


export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/narrator';
	}

	async narrate(sentence) {
		return capitalizeFirstLetter(await this.get()).replace('$1',decapitalizeFirstLetter(sentence));
	}

	async reduce(list) {
		return await this.expandKeywordHelper(
			this.randomArray(list)
		);
	}

}
