#!/usr/bin/env node

require('shelljs/global');
var util = require('util');
var fs = require('fs');
var open = require('open');
var path = require('path');
var cli = require('commander');

cli
  .description('create specific type of git web URL')
  .usage('[options] (<file_path> [line_number]) | (<ref>) [remote]')
  .option('-c, --clipboard', 'Send the generated URL to clipboard')
  .option('-o, --open', 'Open the URL in browser')
  .option('-b, --repo', 'Generate only the repository URL')
  .parse(process.argv);

var arg1 = cli.args[0];

// is the first argument a file?
var fstate;
var file;
var branch;
var line;
var url;

if (arg1 && fs.existsSync(arg1)) {
  fstate = fs.lstatSync(arg1);
}

var endpoint, origin, remote;

origin = cli.args[1] || exec('git origin', {silent: 1}).output.trim();
remote = exec('git remote show -n ' + origin, { silent: 1 }).output;
endpoint = remote.match(/(:?Fetch URL:)(.+)/)[2].trim();


var repo, user, project;
var ref;
var baseUrl, type;

// which type of git repository?
var host = endpoint.match(/(github).*?\.com/);
if(!host) {
  host = endpoint.match(/(stash).*?\.com/);
}

if(host) {
  baseUrl = 'https://' + host[0];
  type = host[1];
}

if (type === 'github') {
  host = endpoint.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
  user = host[2];
  repo = host[1];
}
else if (type === 'stash') {
  host = endpoint.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
  project = host[1];
  repo = host[2];
  url = util.format('projects/%s/repos/%s', project, repo);
}

// create link to the repo
if (cli.repo) {
  url = type === 'github' ?
        util.format('%s/%s', repo, user) :
        util.format('projects/%s/repos/%s/', project, repo);
}
// create link to the file (line)
else if (fstate && (fstate.isFile() || fstate.isDirectory())) {
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

url = [baseUrl, path.normalize(url)].join('/');

// open in browser
if(cli.open) {
  open(url);
}
// where to put the created url
if (cli.clipboard) {
  // TODO: cross-platform clipboard
  exec(util.format('echo "%s" | pbcopy', url.trim()));
}
else {
  echo(url);
}

