#!/usr/bin/env node
require('shelljs/global');

// Try to cherry-pick ref as a single commit, but if the ref is a merge commit, pick the
// whole seq of merged commits
var args = process.argv.slice(2);
var ret = exec('git cherry-pick ' + args, {silent: 1});
var base_ref;
var ref_match;
var ref;

if(ret.code && (ref_match = /Commit ([0-9a-f]+) is a merge but/.exec(ret.output))) {
  ref = ref_match[1];
  base_ref = exec(`git merge-base ${ref}^ ${ref}^2`).output.trim();
  exec(`git cherry-pick ${base_ref}..${ref}^2`);
} else {
  echo(ret.output);
}
