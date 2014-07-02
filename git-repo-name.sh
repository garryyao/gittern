#!/bin/bash
# Print the git repository repo_name figured out from the REMOTE URL.

REMOTE=${2:-'origin'}
REPO=`git remote show -n origin | perl -nle 'print $1 if /(?<=Fetch URL:).*\/(.+?)(?=\.git)/'`
echo $REPO
