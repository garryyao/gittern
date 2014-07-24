#!/usr/bin/env node
// Get the current branch.
require('shelljs/global');
var util = require('util');
var ret = exec('git describe --tags', {
  silent: 1
});

if (ret.code) {
  echo("current tip is not on a tag");
  exit(1);
}
else {
  // the first matched tag name
  var current = ret.output.trim();
  var criteria = current.match(/(.+?)(\d+)/);
  var base;
  var seq;
  var next;
  if (criteria) {
    base = criteria[1];
    seq = criteria[2];
    var tags = exec('git tag', {
      silent: 1
    }).output.split('\n');
    tags.some(function(tag) {
      var match;
      // start with the base tag
      if ((tag.indexOf(base)) === 0) {
        if ((match = tag.match(/\d+/)) && +match[0] === +seq + 1) {
          next = tag;
          return true;
        }
      }
    });
  }

  if (!next) {
    echo("no more tag to proceed");
    exit(1);
  }

  // checkout to the tag if the a next tag is found
  echo(util.format('forwarding %s -> %s', current, next));
  exec('git checkout ' + next, {silent: 1});

}
