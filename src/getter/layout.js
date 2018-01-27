import abstractGetter from 'getter/abstract/abstract';
import {fetchTxt} from 'lib/fetchCorpusItem';

export default class LayoutGetter extends abstractGetter {

	async fetch() {
		const layouts = (await fetchTxt('data/layouts')).map(layoutTxt=>layoutTxt.value);
		if(this.defaults.layout) {
			return layouts.filter(layout => layout === this.defaults.layout);
		}
		else {
			return layouts;
		}
	}

	async get() {
		let layout = this.randomArray(await this.fetch());
		return layout;
	}

}
