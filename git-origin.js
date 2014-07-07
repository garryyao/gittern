#!/usr/bin/env node
require('shelljs/global');
// get the remote name of the specified branch, defaults to the current branch
var branch = process.argv[2] || exec('git br', {silent: 1}).output.trim();
var tracking = exec('git rev-parse --abbrev-ref --symbolic-full-name ' + branch + '@{u}', {silent: 1}).output;
echo(/[^\s]+?(?=\/)/.exec(tracking)[0]);
