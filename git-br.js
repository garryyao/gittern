#!/usr/bin/env node

// Get the current branch.
require('shelljs/global');
echo(exec('git branch', {silent: 1}).output.match(/\*\s+(.+)/)[1].trim());
