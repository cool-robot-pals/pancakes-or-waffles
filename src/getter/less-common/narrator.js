import abstractGetter from 'getter/abstract/abstract';

import narratorTxt from 'corpus/less-common/narrator.txt';
import {capitalizeFirstLetter,decapitalizeFirstLetter} from 'lib/stringies';


export default class extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.narrator = this.parse(narratorTxt);
	}

	narrate(sentence) {
		return capitalizeFirstLetter(this.values.narration).replace('$1',decapitalizeFirstLetter(sentence));
	}

	get values() {
		return {
			narration: this.expand(this.randomArray(this.narrator).value)
		};
	}
}
