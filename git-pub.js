#!/usr/bin/env node
require('shelljs/global');
var util = require('util');
// push local changes to remote and setup upstream tracking for the first time.
var branch = exec('git br', {
  silent: 1
}).output.trim();
var remote = exec('git origin', {
  silent: 1
}).output.trim();
var ret = exec(util.format('git push %s %s', remote, branch));
if (ret.code) {
  echo(util.format('Failed to push branch %sto remote %s', branch, remote));
  exit(1);
}
// track remote branch if not yet done
if (exec('git tr', {
    silent: 1
  }).code) {
  exec(util.format('git branch -u %s/%s', remote, branch));
}