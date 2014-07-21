#!/usr/bin/env node
require('shelljs/global');
// get the remote name of the specified branch, defaults to the current branch
var branch = process.argv[2] || exec('git br', {
  silent: 1
}).output.trim();
var ret = exec('git rev-parse --abbrev-ref --symbolic-full-name ' + branch + '@{u}', {
  silent: 1
});
// no tracking branch on remote
if (ret.code) {
  // use the first remote listed
  echo(exec('git remote', {
    silent: 1
  }).output.split('\n')[0]);
} else {
  echo(/[^\s]+?(?=\/)/.exec(ret.output)[0]);
}
