import abstractGetter from 'getter/abstract/abstract';
import {fetchTxt} from 'lib/fetchCorpusItem';


export default class VerbGetter extends abstractGetter {

	async fetch () {
		return await fetchTxt('verbs');
	}

	async get() {
		return await this.expand(this.randomArray(await this.fetch()).value);
	}

}
