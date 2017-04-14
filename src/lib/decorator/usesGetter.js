import {randomNumber,randomArray} from 'lib/random';

export default function(Target) {

	return class usesGetter extends Target {

		buildGetter(Getter,defaults={},options={}) {
			return new Getter({
				fandom: this.defaults.fandom,
				...defaults,
				seed: this.seed
			},
				options
			);
		}

		randomArray(arr) {
			return randomArray(arr, this.seed);
		}

		randomNumber(key) {
			return randomNumber(key, this.seed);
		}

	};

}
