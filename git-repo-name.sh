#!/bin/bash
# Print the git repository name figured out from the REMOTE URL.

COMMIT=`git rev-parse --short ${1:-'HEAD'}`
REMOTE=${2:-'origin'}
REPO=`git remote show -n origin | perl -nle 'print $1 if /(?<=Fetch URL:).*\/(.+?)(?=\.git)/'`
echo $REPO
