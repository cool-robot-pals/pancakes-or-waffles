const chalk = require('chalk');

const reporter = {
	success: (message) => {
		console.log(chalk.green(`✅ ${message}`));
	},
	error: (message) => {
		console.error(chalk.red(`🔥 ${message}`));
	}

};

module.exports = reporter;
