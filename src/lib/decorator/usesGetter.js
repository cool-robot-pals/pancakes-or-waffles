import {randomNumber,randomArray, makeSeed} from 'lib/random';

export default function(Target) {

	return class usesGetter extends Target {

		attachRandomSeed(seed=makeSeed()) {
			this.seed = seed;
		}

		buildGetter(Getter,context={},options={}) {
			return new Getter({
				...context,
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
