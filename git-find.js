#!/usr/bin/env node
var eval = require('./eval');
var options = require('./options');
var PREFIX = /refs\/(:?remotes|tags|heads)\//;

// Search for the a commit in the git log graph, think of
// "git branch --contains" but but the equivalence
// test is based on commit "subject" sameness.

var argv = require('optimist')
    .boolean('all')
    .boolean('branches')
    .boolean('remotes')
    .boolean('tags')
    .demand(1)
    .usage(
`git find <ref>
  --not
  --all/branches/tags/remotes[=<pattern>]
  --glob/exclude=<glob-pattern>`
    ).argv;

// The commit ref and it's subject
var ref = argv._[0];
var subject = eval(`git log -1 --format="%s" ${ref}`);

// Default to search in all refs heads
if(!(argv.branches || argv.remotes || argv.tags)) {
  argv.all = true;
}

// Pass down the same options to git command
var lines = eval(`git log ${options(argv)} --source --oneline`);
if(!lines){
  echo('Not found');
  exit(1);
}

lines.split('\n').map(function (line) {
  // expect format: "sha ref subject"
  var line_parts = line.match(/^([0-9a-f]+)\s+(\S+)\s+(.+)$/);
  var sha = line_parts[1];
  var ref = line_parts[2].replace(PREFIX, '');
  var sub = line_parts[3].trim();
  if (sub == subject) {
    echo([sha, ref, sub].join(' '));
  }
});