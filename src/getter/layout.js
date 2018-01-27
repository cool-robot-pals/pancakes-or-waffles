import abstractGetter from 'getter/abstract/abstract';


export default class LayoutGetter extends abstractGetter {

	constructor(...props) {
		super(...props);
		this.remote = 'data/layouts';
	}

	async fetch() {
		const layouts = await super.fetch();
		if(this.defaults.layout) {
			return layouts.filter(layout => layout === this.defaults.layout);
		}
		else {
			return layouts;
		}
	}

	async get() {
		return this.randomArray(await this.fetch());
	}

}
