#!/bin/bash
# First time you publish a local branch and setup upstream tracking.

BRANCH=`git br`
REMOTE=${1:-"origin"}
git push $REMOTE $BRANCH || { echo "Failed to push branch $BRANCH to remote $REMOTE"; exit 1; }
# Track upstream.
git branch -u $REMOTE/$BRANCH
