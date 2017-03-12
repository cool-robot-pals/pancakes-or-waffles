import abstractGetter from 'getter/abstract/abstract';
import layoutsTxt from 'data/layouts.txt';

export default class LayoutGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.layouts = this.parse(layoutsTxt);

		if(defaults.layout) {
			this.layouts = this.layouts.filter(layout => layout.value === defaults.layout.value);
			if(this.layouts.length !== 1) {
				throw(`Wrongly defined layout (${JSON.stringify(defaults.layout)})`);
			}
		}

	}


	getLayout() {
		let layout = this.random(this.layouts);
		return layout.value;
	}


	get values() {

		return {
			default: this.getLayout()
		};

	}
}
