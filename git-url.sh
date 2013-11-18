#!/bin/bash
# Generate the Git web URL that points to the specified version.
# The supported web service are currently:
# - Github
# - Atlassian Stash

COMMIT=`git rev-parse --short ${1:-'HEAD'}`
REMOTE=${2:-'origin'}
URL=`git remote show -n origin | perl -nle 'print $1 if /(?<=Fetch URL:)(.+)/'`

if [[ $URL =~ "git@github.com" ]]
then
	REPO=`echo $URL | perl -nle 'print $1 if /:(.+)\.git/'`
	echo "https://github.com/$REPO/commits/$COMMIT"
elif [[ $URL =~ "stash.englishtown.com" ]]
then
	REPO=`echo $URL | perl -nle 'print "$1/repos/$2" if /\/scm\/(.+?)\/(.+?)\.git/'`
	echo "https://stash.englishtown.com/projects/$REPO/commits/$COMMIT"
fi