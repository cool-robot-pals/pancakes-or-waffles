const escapeHTML = unsafeText => {
	const $div = document.createElement('div');
	$div.innerText = unsafeText;
	return $div.innerHTML;
};

export default escapeHTML;
