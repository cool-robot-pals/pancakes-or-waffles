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
	${!options.test?
		'<script type="module" src="/app/index.js"></script>':''
	}
	${options.test===true?
		`
		<script src="/test/mocha.js"></script>
		<script>mocha.setup('bdd');</script>
		<script type="module">
			import * as Pancake from "/app/index.js";
			window.Pancakes = Pancake;

			(async () => {
				const $script = document.createElement("script");
				$script.src = '/test/test.js'
				document.getElementsByTagName("head")[0].appendChild($script);
			})()
		</script>
		<script>

		</script>
		<div id="mocha"></div>
		<link href="/test/test.css" rel="stylesheet"></head>
		`:''
	}
</html>
`;

module.exports = render;
