#!/usr/bin/env node
require('shelljs/global');

// delete the local branch as well as the remote branch.

var curr_branch = exec('git br', {silent: 1}).output.trim();
var branch = process.argv[2] || curr_branch;
var tracking = exec('git tr' + branch, {silent: 1}).output.trim();

// leave the current branch for deletion, checkout a detached HEAD
if (curr_branch === branch) {
	exec('git checkout -');
}

if(exec('git branch -D ' + branch}).code){
	echo('fails to delete branch: ' + branch);
}

if(!tracking){
	echo('remote tracking branch not found');
}
else {
	if(exec('git push origin :'+ branch).code) {
		echo('fails to delete remote branch:' + branch);
	}
}

