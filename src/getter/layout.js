import abstractGetter from 'getter/abstract/abstract';


export default class LayoutGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'data/layouts';
	}

	async fetchOnce() {
		const layouts = await super.fetchOnce();
		if(this.defaults.layout) {
			return layouts.filter(layout => layout === this.defaults.layout);
		}
		else {
			return layouts;
		}
	}

	async get () {
		return 'oblivion'
	}

}
