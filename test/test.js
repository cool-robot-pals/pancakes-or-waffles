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
		var length = values.choices.reduce(function(acc,choice){return acc+choice.length;},0);
		if(length >= 10) {
			done();
		}
		else {
			done(new Error(
				[JSON.stringify(values),length]
			));
		}
	});
	it('should have 3+ layouts',function(done){
		if(window.Post.default.layouts.length > 3) {
			done();
		}
		else {
			done(new Error());
		}
	});
	it('should make all layouts without an error',function(done){
		var total = window.Post.default.layouts.length;
		var rendered = 0;
		var finishedMaybe = function() {
			rendered++;
			if(rendered >= total) {
				window.Post.default.posts.map(function(post){
					console.log(post.choices);
				});
				done();
			}
		};
		window.Post.default.layouts.map(function(layout){
			window.Post.default.makePost({
				layout: layout
			});
			finishedMaybe();
		});
	});
});
