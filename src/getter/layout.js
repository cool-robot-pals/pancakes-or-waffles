import abstractGetter from 'getter/abstract/abstract';
import layoutsTxt from 'json-loader!yaml-loader!data/layouts.yaml';

export default class LayoutGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.layouts = layoutsTxt;

		if(defaults.layout) {
			this.layouts = this.layouts.filter(layout => layout === defaults.layout);
			if(this.layouts.length !== 1) {
				throw(`Wrongly defined layout (${JSON.stringify(defaults.layout)})`);
			}
		}

	}


	getDefault() {
		let layout = this.random(this.layouts);
		return layout;
	}
	
}
