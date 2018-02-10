import LayoutGetter from '../getter/layout.js';

let $wrapper;

export default () => {

	window.describe('Pancakes', function() {


		window.beforeEach( () => {
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
		});


		window.afterEach(() => {
			$wrapper.remove();
		});


		window.it('should export 1+ choices', done => {
			const $pancake = document.createElement('pancake-post');
			$pancake.addEventListener('pancake-ready',(ev,extra)=>{
				if(ev.detail.postData.choices.length > 1) {
					done();
				}
				else done(new Error());
			});
			$wrapper.appendChild($pancake);
		});

		window.it('should expose a log', done => {
			const $pancake = document.createElement('pancake-post');
			$pancake.addEventListener('pancake-ready',(ev,extra)=>{
				if(Object.keys(ev.detail.postData).length > 6) {
					done();
				}
				else done(new Error());
			});
			$wrapper.appendChild($pancake);
		});


		window.it('should render some html',done => {
			const $pancake = document.createElement('pancake-post');
			$pancake.addEventListener('pancake-ready',(ev)=>{
				if(ev.target.shadowRoot.innerHTML.length > 400) {
					done();
				}
				else done(new Error(ev.target.innerHTML.length));
			});
			$wrapper.appendChild($pancake);
		});


		window.it('should respect seed parameters', done => {
			const $pancake = document.createElement('pancake-post');
			$pancake.dataset.layout = 'forza';
			$pancake.dataset.seed = '1234';
			$pancake.addEventListener('pancake-ready',(ev)=>{
				if(ev.detail.postData.layout === 'forza' && ev.detail.postData.seed === '1234') {
					done();
				}
				else done(new Error(ev.detail.postData));
			});
			$wrapper.appendChild($pancake);
		});


		window.it('should make all layouts 3x without an error', done => {
			new LayoutGetter().fetch().then(fetchedLayouts => {

				const layouts = [...fetchedLayouts,...fetchedLayouts,...fetchedLayouts];
				const total = layouts.length;

				let rendered = 0;

				const finishedMaybe = () => {
					rendered++;
					if(rendered >= total) {
						const checker = setInterval(() => {
							if($wrapper.childNodes.length == rendered) {
								clearInterval(checker);
								clearTimeout(fail);
								done();
							}
						},50);
						const fail = setTimeout(() => {
							done(new Error('wrong post number ('+$wrapper.childNodes.length+'/'+rendered+')'));
						},2000);
					}
				};

				layouts.forEach(function(layout){
					try{
						const $pancake = document.createElement('pancake-post');
						$pancake.dataset.layout = layout;
						$pancake.addEventListener('pancake-ready',(ev)=>{
							finishedMaybe();
						});
						$wrapper.appendChild($pancake);
					} catch(err) {
						done(err);
					}
				});
			});
		}).timeout(5000);
	});

	window.mocha.reporter('spec').run( failures => {
		if (failures > 0) {
			console.error(failures);
			throw 0;
		}
		console.log('done');
	});

};
