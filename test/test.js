describe('Initialization', function() {
	it('window.post should exist',function(done){
		if(window.Post) {
			done();
		}
		else {
			done(new Error());
		}
	});
	it('should generate 2 choices',function(done){
		var values = window.Post.default.getValues();
		if(values.choices.length === 2) {
			done();
		}
		else done(new Error());
	});
	it('should generate 2 choices with stuff on them',function(done){
		var values = window.Post.default.getValues();
		if(values.choices.reduce(function(choice){return choice.length;}) > 10) {
			done();
		}
		else done(new Error());
	});
});
