#!/usr/bin/env node
require('shelljs/global');
// Issue arbitrary git command for each of the sub modules.
var path = require('path');
var _ = require('underscore.string');
var color = require('bash-color');
var TMP = '.tmp';
function divider() {
  echo(color.green(_.repeat('-', 15)));
  echo(color.green('* ' + exec('git repo', {
      silent: 1
    }).output.trim()));
}
function help() {
  echo('git each [regexp] [command]');
  echo('e.g. git each jquery- checkout develop');
}
// regexp pattern that matches against directory repo_name.
var pattern = process.argv[2];
if (!pattern) {
  help();
  exit(1);
}
var dirs = [];
var cmd = process.argv.slice(3).join(' ');
exec('find -L . -type d -iname ".git"', {
  silent: 1
}).output.to(TMP);
var pwd = process.cwd();
grep(pattern, TMP).trim().split('\n').forEach(function(file) {
  var cwd = path.dirname(file);
  // check whether this is one directory within one of the already walked throughs.
  var isSub = dirs.some(function(dir) {
    return cwd.indexOf(dir) !== -1;
  });
  // avoid walking into sub directories.
  if (!isSub) {
    dirs.push(cwd);
    cd(cwd);
    divider();
    exec(cmd);
    cd(pwd);
  }
});
rm(TMP);