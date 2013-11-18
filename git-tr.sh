#!/bin/bash
# Get the remote tracking branch of the current branch.

BRANCH=${1:-`git br`}
TRACKING="$BRANCH@{u}"
git rev-parse --abbrev-ref --symbolic-full-name $TRACKING 2>/dev/null