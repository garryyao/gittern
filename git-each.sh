#!/bin/bash
# Issue arbitrary git command for each of the sub modules.

function line
{
	printf '%.0s-' {1..15} && echo
}

function help
{
	echo "git each [regexp] [command]"
	echo 'e.g. git each "jquery-" checkout develop'
}

function git_cmd
{
	repo=$1
	shift
	cmd=$@
	git --git-dir=$repo/.git --work-tree=$PWD/$repo $cmd
}

# regexp pattern that matches against directory name.
PATTERN=$1
if [[ -z $PATTERN ]]; then help; fi

shift
# The rest of params as git command.
REST=$@
if [ -z "$REST" ]
then
	help
fi

find . -type d -iname ".git" | grep -e "$PATTERN" | while read dir; do
	repo=${dir%.git}
	line
	echo "* `git_cmd $repo "repo-name"`"
	git_cmd $repo $REST

done
exit 0;
