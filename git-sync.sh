#!/bin/bash
# Update the specified local branch with latest upstream changes, attempt to rebase local changes
# if it's not able to perform fast-forward.

CURR=`git br`
BRANCH=${1:-$CURR}

git fetch --all
git remote prune origin

CURR=`git br`
BRANCH=${1:-$CURR}
TRACKING=`git tr $BRANCH`

if [ -z $TRACKING ]
then
	echo "No remote tracking branch found: $BRANCH"
	exit 0
fi

# Checkout that branch
if [ "$CURR" != "$BRANCH" ]
then
	git checkout $BRANCH >/dev/null
fi

if ! git merge $TRACKING --ff-only; then
	echo "Unable to fast-forward local branch, try rebaseing..."
	if ! git rebase $TRACKING; then
		echo "Unable to rebase local changes, aborted."
	fi
fi

# Restore working branch.
if [ "$CURR" != "$BRANCH" ]; then
	git checkout -
fi
