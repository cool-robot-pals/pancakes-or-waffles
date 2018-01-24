import {randomNumber,randomArray} from 'lib/random';

export default function(Target,styles) {

	return class addStyles extends Target {

			constructor(...args) {
				super(...args)
				this.styles = styles;
			}

	};

}
