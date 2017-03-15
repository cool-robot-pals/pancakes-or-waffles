export default (unmangledExtras) => {
	let extras = [];
	Object.keys(unmangledExtras).map(extra => {
		let style = {};
		if(typeof unmangledExtras[extra] === 'object') {
			extras.push({
				style: unmangledExtras[extra].style,
				value: unmangledExtras[extra].value,
				key: extra
			});
		}
		else {
			extras.push({
				style: {},
				value: unmangledExtras[extra],
				key: extra
			});
		}
	});
	return extras;
};
