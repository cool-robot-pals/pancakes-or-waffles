import {parse as parseTxt} from './parser/txt';

export const fetchTxt = async (path) =>
	fetch(`/corpus/${path}.txt`).then(response=>response.text()).then(parseTxt);

export const fetchYaml = async (path) =>
	fetch(`/corpus/${path}.yaml`).then(response=>response.text());
