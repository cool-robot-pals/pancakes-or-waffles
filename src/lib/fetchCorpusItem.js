import {parse as parseTxt} from './parser/txt';

const fetchCache = [];
const cachedTextFetch = rq => {
	if(!fetchCache[rq]) {
		fetchCache[rq] = fetch(rq).then(response=>response.text());
	}
	return fetchCache[rq];
}

export const fetchTxt = async (path) =>
	cachedTextFetch(`/corpus/${path}.txt`).then(parseTxt);

export const fetchYaml = async (path) =>
	cachedTextFetch(`/corpus/${path}.yaml`);
