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

# regexp pattern that matches against directory repo_name.
PATTERN=$1
if [[ -z $PATTERN ]]; then help; fi

shift
# The CMD of params as git command.
CMD=$@
if [ -z "$CMD" ]; then help; exit 1; fi

cwd=$(pwd)
find -L . -type d -iname ".git" | grep -e "$PATTERN" | while read dir; do
	repo=${dir%.git}
	# step into the sub module as working dir.
	cd $cwd/$repo
	line
	echo "* `git repo-name`"
	$CMD
done
# Restored current dir.
cd $cwd
exit 0;
