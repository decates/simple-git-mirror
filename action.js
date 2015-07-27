var shell = require("shelljs");
var config = require('./config.js');
shell.config.fatal = true; // Die on fatal errors, to avoid doing something we shouldn't

if (!shell.which('git')) {
  echo('Sorry, we need to git');
  exit(1);
}

// Check whether the local git repository is present or not
// Do this before we are ready to 'run'
if (!shell.test('-d', config.directoryName)) {
	// If not, initialize it
	console.log('Creating git clone');
	if (shell.exec('git clone --bare --depth=2 --single-branch --branch "' + (config.branchName || 'master') + '" "' + config.sourceUrl + '" "' + config.directoryName + '"').code !== 0) {
		echo('Error: Git clone failed');
		exit(1);
	}
	
	console.log('Finished creating git clone');
} else {
	console.log('Git repository is present');
}

// Ensure the correct push URL is set
shell.cd(config.directoryName);
if (shell.exec('git remote set-url --push origin ' + config.destinationUrl).code !== 0) {
	echo('Error: Git set push remote failed');
	exit(2);
}

var Action = function () {
	var self = this;
	
	self.run = function () {
		console.log("Updating git mirror.");
		
		// If so, fetch changes from the source repository
		console.log('Fetching changes from source');
		
		if (shell.exec('git fetch origin ' + (config.branchName || 'master') + ':' + (config.branchName || 'master')).code !== 0) {
			echo('Error: Git fetch failed');
			exit(3);
		}
		
		// Now push any changes to the remote repository
		console.log('Pushing changes to destination repository');
		if (shell.exec('git push --mirror').code !== 0) {
			echo('Error: Git push failed');
			exit(4);
		}
		
		console.log('Finished.');
	};
};

module.exports = new Action();