describe('Initialization', function() {
	it('window.Pancakes should exist',function(done){
		if(window.Pancakes) {
			done();
		}
		else {
			done(new Error());
		}
	});
	it('should expose logState',function(done){
		window.Pancakes.makePost().then(()=>{
			var values = window.Pancakes.posts[0].logState();
			if(values.length > 3) {
				done();
			}
			else done(new Error());
		});
	});
	it('should generate 2 choices',function(done){
		var values = new window.Pancakes.mocha.PostGetter().values;
		if(values.choices.length === 2) {
			done();
		}
		else done(new Error());
	});
	it('should generate 2 choices with stuff on them',function(done){
		var values = new window.Pancakes.mocha.PostGetter().values;
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
		if(window.Pancakes.mocha.layouts.length > 3) {
			done();
		}
		else {
			done(new Error());
		}
	});
	it('should make all layouts thrice ('+(window.Pancakes.mocha.layouts.length*3)+') without an error',function(done){
		var layouts = [].concat(window.Pancakes.mocha.layouts,window.Pancakes.mocha.layouts,window.Pancakes.mocha.layouts);
		var total = layouts.length;
		var rendered = 0;
		var finishedMaybe = function() {
			rendered++;
			if(rendered >= total) {
				var checker = setInterval(function(){
					if(window.Pancakes.posts.length > 3 && document.querySelector('#tough-choices-bot').childNodes.length === window.Pancakes.posts.length) {
						clearInterval(checker);
						clearTimeout(fail);
						done();
					}
				},50);
				var fail = setTimeout(function(){
					done('wrong post number ('+document.querySelector('#tough-choices-bot').childNodes.length+'/'+window.Pancakes.posts.length+')');
				},1500);
			}
		};
		layouts.map(function(layout){
			try{
				window.Pancakes.makePost(undefined,{
					layout: layout
				});
			} catch(err) {
				done(err);
			}
			finishedMaybe();
		});
	});
});
