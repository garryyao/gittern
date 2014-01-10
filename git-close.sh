#!/bin/bash
# Delete the local branch and the corresponding tracking branch from remote.

CURR=`git br`
BRANCH=${1:-$CURR}
REMOTE=`git tr $BRANCH`

# Leave that working branch
if [ "$CURR" == "$BRANCH" ]
then
	git checkout -m develop >/dev/null
	if [ $? -ne 0 ]
	then
		git checkout -m master >/dev/null
	fi
fi

# Delete the local branch.
git branch -D $BRANCH || { echo "fails to delete the local branch"; }

# Check if remote branch exists.
if [ -z $REMOTE ]
then
	echo "Remote tracking branch not found."
else
	git push origin :${REMOTE#origin/} || { echo "fails to delete the remote branch"; }
fi


