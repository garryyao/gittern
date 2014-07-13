#!/usr/bin/env node
require('shelljs/global');
// discard any local changes and align with the head of remote tracking branch
var ret = exec('git tr', {
  silent: 1
});
if (ret.code) {
  echo('Remote tracking branch NOT found.');
} else {
  var tracking = ret.output.trim();
  // Stash local changes first.
  exec('git stash save');
  // Discard local changes in favor of the remote.
  exec('git reset --hard ' + tracking);
}