const render = (options={}) =>
`
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>🐙</title>
		<style>
			${fs.readFileSync(`./index.css`, 'utf8'})}
		</style>
		<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500i|Gentium+Book+Basic:700|Patrick+Hand|Poiret+One|Roboto+Mono:500|Oswald:600|Lato:700,400|Tulpen+One">
	</head>
	<body>
		<div id="pancakes"></div>
	</body>
	${!options.test?
		'<script type="module" src="/app/index.screenshot.js"></script>':''
	}
	${options.test===true?
		`
		<script src="/test/mocha.js"></script>
		<script>mocha.setup('bdd');</script>
		<script type="module" src="/app/index.board.js"></script>
		<div id="mocha"></div>
		<link href="/test/test.css" rel="stylesheet"></head>
		`:''
	}
</html>
`;

module.exports = render;
