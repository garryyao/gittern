#!/usr/bin/env node
require('shelljs/global');
var util = require('util');

/*
 Generate the Git web URL that points to the specified version.
 currently support the following GIT web sites:
  - Github
  - Atlassian Stash
*/

var ref = process.argv[2] || 'HEAD';
var hash = exec(['git rev-parse --short', ref].join(' '), {silent:1}).output;
var remotes = exec('git remote show -n origin', {silent:1}).output;
var repo_url = remotes.match(/(:?Fetch URL:)(.+)/)[2].trim();

var link, repo_name, user, project;
var match;
if (/github\.com/.exec(repo_url)){
	match = repo_url.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
	user = match[1];
	repo_name = match[2];
	link = util.format('https://github.com/%s/%s/commit/%s', repo_name, user, hash);
}
else if (/stash\.englishtown\.com/.exec(repo_url)){
	match = repo_url.match(/([^:.\/]+?)\/([^:.\/]+?)\.git/);
	project = match[1];
	repo_name = match[2];
	link = util.format('https://stash.englishtown.com/projects/%s/repos/%s/commits/%s', project, repo_name, hash);
}
else {
	exit(1);
}

echo(link.trim());




