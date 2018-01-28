window.describe('Initialization', function() {
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
		new window.Pancakes.mocha.PostGetter().get().then(values=>{
			if(values.choices.length === 2) {
				done();
			}
			else done(new Error());
		});
	});
	it('should generate 2 choices with stuff on them',function(done){
		new window.Pancakes.mocha.PostGetter().get().then(values=>{
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
	});
	it('should have 3+ layouts', async function(){
		if((await window.Pancakes.mocha.layouts).length > 3) {
			return true;
		}
		else {
			return Promise.reject(new Error());
		}
	});
	it('should make all layouts twice without an error', function(done){
		window.Pancakes.mocha.layouts.then(fetchedLayouts=>{
			var layouts = [...fetchedLayouts,...fetchedLayouts];
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
					},2000);
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
	}).timeout(5000);
});

mocha.reporter('spec').run((failures)=>{if(failures > 0){throw 0;}else{console.log('done');}});
