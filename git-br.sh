#!/bin/bash
# Get the current branch.

git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'
