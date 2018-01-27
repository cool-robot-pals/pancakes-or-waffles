const render = (options={}) =>
`
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>😭</title>
		<style>
		body {
			background: #222;
			-webkit-font-smoothing: antialiased;
			font-size: 35px;
		}

		body, body * {
			display: block;
			margin: 0;
			padding: 0;
			line-height: 1;
		}

		script {
			display: none;
		}
		</style>
	</head>
	<body>
	</body>
	<script src="/post.js"></script>
	${options.test===true?
		`
		<script src="/test/mocha.js"></script>
		<script>mocha.setup('bdd');</script>
		<script src="/test/test.js"></script>
		<div id="mocha"></div>
		<link href="/test/test.css" rel="stylesheet"></head>
		<script>mocha.reporter('spec').run((failures)=>{if(failures > 0){throw 0}else{console.log('done')}});</script>
		`:''
	}
</html>
`

module.exports = render;
