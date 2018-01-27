const fetchCache = [];
const cachedTextFetch = rq => {
	if(!fetchCache[rq]) {
		fetchCache[rq] = fetch(rq).then(response=>response.json());
	}
	return fetchCache[rq];
};

export const fetchItem = async (path) =>
	cachedTextFetch(`/get-corpus/${path}`);
