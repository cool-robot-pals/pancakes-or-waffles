import abstractGetter from './abstract/abstract.js';


export default class LayoutGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'data/layouts';
	}

	async fetchOnce() {
		const layouts = await super.fetchOnce();
		if(this.defaults.layout) {
			return [this.defaults.layout];
		}
		else {
			return layouts;
		}
	}

}
