#!/usr/bin/env node
var eval = require('./eval');

// Determine the commits that are not "ported" from <head>
// to <upstream>, it's like `git cherry` but the equivalence
// test is based on commit "subject" sameness.

var args = process.argv.slice(2).join(' ');
var argv = require('optimist')
    .demand(2)
    .usage('git cherries <upstream> <head>')
    .argv;

var upstream = argv._[0];
var head = argv._[1];
var cherry_cmd = 'git cherry -v ';

var list = eval(cherry_cmd + args);

// Revert the <head> and <upstream> to catch commits
// that are already ported
var rev_res = eval([
  cherry_cmd,
  head,
  upstream
].join(' '));

// Build the hash to check for ported commit messages
var rev_list = commits(rev_res)
    .reduce(function (hash, commit) {
      hash[commit.msg] = 1;
      return hash;
    }, {});

// Filter down the list of commits to only those that
// are not ported
echo(commits(list).filter(function (commit) {
  return !(commit.msg in rev_list);
}).map(function (commit) {
  return [
    '+',
    commit.ref,
    commit.msg
  ].join(' ');
}).join('\n'));


function commits(list) {
  return list.split('\n').map(function (line) {
    var match = line.match(/^\+\s+([0-9a-f]+)\s+(.+)$/);
    return match && {ref: match[1], msg: match[2]};
  }).filter(function (commit) {
    return commit !== null;
  });
}