import seedrandom from 'seedrandom';


const store = {
	baseSeed: undefined,
	extend: 0
}

const randomArray = (arr,seed=makeSeed()) => {
	console.log(mangleSeed(seed));
	try {
		const random = seedrandom(mangleSeed(seed)+JSON.stringify(arr));
		return arr[Math.floor(random() * arr.length)];
	} catch(err) {
		console.error(err);
	}
};

const randomNumber = (key,seed=makeSeed()) => {
	return seedrandom(mangleSeed(seed)+JSON.stringify(key))();
}

const makeSeed = () => {
	return Date.now()*Math.random();
}

const mangleSeed = (seed) => {
	if(seed != store.seed) {
		store.extend = 0;
		store.seed = seed;
	}
	store.extend++;
	return store.seed+store.extend;
}

export {randomNumber, randomArray, makeSeed};

export default randomArray;
