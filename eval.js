#!/usr/bin/env node
require('shelljs/global');

module.exports = function(cmd) {
  var ret = exec(cmd, {silent: true});
  if (ret.code) {
    echo(ret.output.trim());
    exit(ret.code);
  }
  return ret.output.trim();
};
