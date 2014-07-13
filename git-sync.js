#!/usr/bin/env node
require('shelljs/global');
var util = require('util');
// Update the specified local branch with latest upstream changes, attempt to rebase local changes
var curr_branch = exec('git br', {
  silent: 1
}).output.trim();
var branch = process.argv[2] || curr_branch;
var remote = exec('git origin', {
  silent: 1
}).output.trim();
// fetch all remote changes
exec('git fetch ' + remote);
exec('git remote prune ' + remote);
var tracking = exec('git tr ' + branch, {
  silent: 1
}).output.trim();
if (!tracking) {
  echo(util.format('No remote tracking branch found for %s', branch));
  exit(1);
}
// checkout to the target branch
if (curr_branch !== branch) {
  exec('git checkout ' + branch);
}
// try first to fast forward.
if (exec('git merge ' + tracking + ' --ff-only').code !== 0) {
  echo('Unable to fast-forward local branch, trying to rebase...');
  // resort to rebase if fast forward fails.
  if (exec('git rebase ' + tracking).code !== 0) {
    echo('Unable to rebase local changes, aborted.');
    exit(1);
  }
}
// restore the original branch
if (curr_branch !== branch) {
  exec('git checkout -');
}