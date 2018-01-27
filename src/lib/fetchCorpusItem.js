const fetchCache = [];

const cachedTextFetch = rq => {
	if(!fetchCache[rq]) {
		fetchCache[rq] = fetch(rq).then(response => response.text());
	}
	return fetchCache[rq];
};

const fetchItem = async (path) =>
	cachedTextFetch(`/get-corpus/${path}`).then(JSON.parse);

export { fetchItem };
