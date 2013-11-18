#!/bin/sh

# Install all git extensions to bash bin path.

BIN=${1:-"/usr/local/bin"}
PWD=`pwd`
for i in git-*
do
	sudo ln -sf $PWD/$i $BIN/${i%.sh}
done
exit 0;
