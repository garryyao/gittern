#!/bin/sh
# Simply discard any local changes and align head with the remote tracking branch.

TRACKING=`git tr`

# Check tracking branch exists.
if [ -z $TRACKING ]
then
	echo "Remote tracking branch NOT found."
	exit 0;
fi

# Stash local changes first.
git stash save >/dev/null
# Discard local changes in favor of the remote.
git reset --hard $TRACKING