#!/usr/bin/env node
require('shelljs/global');

// symbolic link all scripts to bash bin path, to make it git extensions
var path = require('path');

var BIN = path.resolve(process.cwd(), process.argv[2] || '/bin');
console.log('creating git extensions...');
ls('git-*').forEach(function(file) {
	var dest = path.join(BIN, path.basename(file, path.extname(file)));
	file = path.resolve(file);
	exec(['ln -sf', file, dest].join(' '));
});
