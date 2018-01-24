const random = function(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};


module.exports = function(source) {

	var alignments = ['left','right'];
	var alignmentsWithCenter = ['left','right','center'];
	var verticalAlignments = ['top','bottom'];

	var alignment = random(alignments);
	var verticalAlignment = random(verticalAlignments);

	source = source
		.replace(new RegExp('-@align-vertical-alt-', 'g'),verticalAlignment)
		.replace(new RegExp('-@align-vertical-', 'g'),verticalAlignment === verticalAlignments[0]?verticalAlignments[1]:verticalAlignments[0])
		.replace(new RegExp('-@align-with-center-', 'g'),random(alignmentsWithCenter))
		.replace(new RegExp('-@align-alt-', 'g'),alignment)
		.replace(new RegExp('-@align-', 'g'),alignment === alignments[0]?alignments[1]:alignments[0])
		.replace(new RegExp('-@negaposi-alt-', 'g'),random(['-','']))
		.replace(new RegExp('-@negaposi-', 'g'),random(['-','']));

	source = source
		.replace(/-@-maybe-\{([\s\S]+?)\}/mg,function(match,m1){
			return Math.random()>.5?m1:'';
		});

	this.value = source;
	return source;

};
