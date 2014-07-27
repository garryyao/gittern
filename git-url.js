#!/usr/bin/env node

require('shelljs/global');
var util = require('util');
var fs = require('fs');
var path = require('path');
var cli = require('commander');

cli
  .description('create specific type of git web URL')
  .usage('[options] (<file_path> [line_number]) | (<ref>)')
  .option('-c, --clipboard', 'Send the generated URL to clipboard')
  .parse(process.argv);

var arg1 = cli.args[0];

// is the first argument a file?
var fstate;
var file;
var branch;
var line;
var url;

if (arg1) {
  fstate = fs.lstatSync(arg1);
}

// remote infos
var origin = exec('git origin', {silent: 1}).output.trim();
var remote = exec('git remote show -n ' + origin, { silent: 1 }).output;
var endpoint = remote.match(/(:?Fetch URL:)(.+)/)[2].trim();
var repo, user, project;
var match;
var ref;

// base href
var base = {
  'github': 'https://github.com/',
  'stash': 'https://stash.englishtown.com/'
};

// which type of git repository?
var type = /github\.com/.exec(endpoint) ? 'github' : /stash\.englishtown\.com/.exec(endpoint) ? 'stash' : 'unsupported';

if (type === 'github') {
  match = endpoint.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
  user = match[2];
  repo = match[1];
}
else if (type === 'stash') {
  match = endpoint.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
  project = match[1];
  repo = match[2];
  url = util.format('projects/%s/repos/%s', project, repo);
}

// create link to the file (line)
if (fstate && (fstate.isFile() || fstate.isDirectory())) {
  file = arg1;
  line = cli.args[1];
  branch = exec('git br', { silent: 1 }).output.trim();
  if (type === 'github') {
    url = util.format('/%s/%s', repo, user);
    url = path.join(url, 'blob', branch, file);
    if (line) {
      url += '#L' + line;
    }
  }
  else if (type === 'stash') {
    url = util.format('projects/%s/repos/%s', project, repo);
    url = path.join(url, 'browse', file + '?at=refs/heads/' + branch);
    if (line) {
      url += '#' + line;
    }
  }
}
// create link to the commit
else {
  ref = exec([ 'git rev-parse --short', arg1 || 'HEAD' ].join(' '), { silent: 1 }).output;

  if (type === 'github') {
    url = util.format('%s/%s/commit/%s', repo, user, ref);
  }
  else if (type === 'stash') {
    url = util.format('projects/%s/repos/%s/commits/%s', project, repo, ref);
  }
}

// unrecognized repository type
if (!url) {
  echo('sorry, unsupported git endpoint:' + endpoint);
  exit(1);
}

url = base[type] + url;
// where to put the created url
if (cli.clipboard) {
  // TODO: cross-platform clipboard
  exec(util.format('echo "%s" | pbcopy', url.trim()));
}
else {
  echo(url);
}

