import {randomNumber,randomArray, makeSeed} from 'lib/random';

export default function(Target) {

	return class usesGetter extends Target {

		attachRandomSeed(seed=makeSeed()) {
			this.seed = seed;
		}

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
