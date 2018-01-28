const fs = require('fs');
const path = require('path');

const render = (options={}) =>
`
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>🐙</title>
		<link href="/view/index.css" rel="stylesheet">
		<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500i|Gentium+Book+Basic:700|Patrick+Hand|Poiret+One|Roboto+Mono:500|Oswald:600|Lato:700,400|Tulpen+One">
	</head>
	<body>
		<div id="pancakes"></div>
	</body>
	${options.mode==='screenshot'?
		'<script type="module" src="/app/index.screenshot.js"></script>':''
	}
	${options.mode==='wall'?
		`
		<script type="module" src="/app/index.wall.js"></script>
		<link href="/view/wall.css" rel="stylesheet"></head>
		`:''
	}
	${options.mode==='test'?
		`
		<script type="module" src="/app/index.mocha.js"></script>
		<div id="mocha"></div>
		`:''
	}
</html>
`;

module.exports = render;
