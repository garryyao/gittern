#!/usr/bin/env node
require('shelljs/global');

// Print the git repository repo_name figured out from the REMOTE URL.
var remote = process.argv[2] || exec('git remote', {silent: 1}).output.trim();
var ret = exec('git remote show -n ' + remote, {silent: 1}).output;
echo(ret.match(/Fetch URL:.*\/(.+?)(?=\.git)/)[1]);
