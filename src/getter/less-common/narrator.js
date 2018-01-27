import abstractGetter from 'getter/abstract/abstract';

import narratorTxt from 'corpus/less-common/narrator.txt';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';


export default class extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'less-common/narrator';
	}

	async narrate(sentence) {
		return capitalizeFirstLetter(await this.get()).replace('$1',decapitalizeFirstLetter(sentence));
	}

	async get() {
		return await this.expandKeywords(
			await super.get()
		);
	}

}
