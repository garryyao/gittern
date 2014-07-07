#!/usr/bin/env node
require('shelljs/global');
var util = require('util');

// rename branch on both local and remote
var branch = process.argv[2] || exec('git br', {silent: 1}).output.trim();
// the renamed branch
var new_branch = process.argv[3];
// the remote name
var remote = exec('git origin', {silent: 1}).output.trim();

if(branch && new_branch){
	exec(util.format('git branch -m %s %s', branch, new_branch));
	exec(util.format('git push %s :%s', remote, branch));
	exec(util.format('git push origin -u %s', new_branch));
}
else {
	echo('usage: git ');
	exit(1);
}
