var ColorScheme = require('color-scheme');

module.exports = function() {

	var colors = {};

	var allColors = (new ColorScheme)
		.from_hue(Math.floor(Math.random()*256))
		.scheme('triade')
		.variation('pastel')
		.colors();
	colors.pastel = [
		allColors[0],allColors[4],allColors[8]
	];
	var allColors = (new ColorScheme)
		.from_hue(Math.floor(Math.random()*256))
		.scheme('triade')
		.variation('soft')
		.colors();
	colors.soft = [
		allColors[0],allColors[4],allColors[8]
	];
	var allColors = (new ColorScheme)
		.from_hue(Math.floor(Math.random()*256))
		.scheme('triade')
		.variation('hard')
		.colors();
	colors.hard = [
		allColors[0],allColors[4],allColors[8]
	];
	var allColors = (new ColorScheme)
		.from_hue(Math.floor(Math.random()*256))
		.scheme('triade')
		.variation('pale')
		.colors();
	colors.pale = [
		allColors[0],allColors[4],allColors[8]
	];

	return colors;
}
