import abstractGetter from 'getter/abstract/abstract';
import layoutsTxt from 'data/layouts.txt';

export default class layoutGetter extends abstractGetter {

	constructor(defaults={}) {
		super(defaults);
		this.layouts = this.parse(layoutsTxt);

		if(defaults.layout) {
			this.layouts = this.layouts.filter(layout => layout.value === defaults.layout.name)[0];
			if(this.layout.length !== 1) {
				throw(`Wrongly defined layout (${defaults.layout})`);
			}
		}

	}


	getLayout() {
		let layout = this.random(this.layouts);
		return {
			name: layout.value,
			id: Object.keys(layout.props)[0]
		};
	}


	get values() {

		return {
			default: this.getLayout()
		};

	}
}
