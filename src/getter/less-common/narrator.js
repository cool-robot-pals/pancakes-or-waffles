import abstractGetter from 'getter/abstract/abstract';

import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';


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
