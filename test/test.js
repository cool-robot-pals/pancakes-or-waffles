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
		var values = new window.Post.mocha.PostGetter().values;
		if(values.choices.length === 2) {
			done();
		}
		else done(new Error());
	});
	it('should generate 2 choices with stuff on them',function(done){
		var values = new window.Post.mocha.PostGetter().values;
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
		if(window.Post.mocha.layouts.length > 3) {
			done();
		}
		else {
			done(new Error());
		}
	});
	it('should make all layouts without an error',function(done){
		var total = window.Post.mocha.layouts.length;
		var rendered = 0;
		var finishedMaybe = function() {
			rendered++;
			if(rendered >= total) {
				var checker = setInterval(function(){
					if(window.Post.posts.length > 3 && document.querySelector('#tough-choices-bot div').childNodes.length === window.Post.posts.length) {
						clearInterval(checker);
						clearTimeout(fail);
						done();
					}
				},50);
				var fail = setTimeout(function(){
					done('wrong post number ('+document.querySelector('#tough-choices-bot div').childNodes.length+'/'+window.Post.posts.length+')');
				},1500);
			}
		};
		window.Post.mocha.layouts.map(function(layout){
			try{
				window.Post.makePost({
					layout: layout
				});
			} catch(err) {
				done(err);
			}
			finishedMaybe();
		});
	});
});
