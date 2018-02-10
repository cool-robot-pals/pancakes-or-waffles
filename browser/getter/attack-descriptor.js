import abstractGetter from './abstract/abstract.js';
import {capitalizeFirstLetter} from '../lib/stringies.js';

export default class Getter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'attack-descriptor';
	}

	async reduce(list) {
		return capitalizeFirstLetter(await this.expandKeywordHelper(
			this.randomArray(list)
		));
	}

}
