#!/bin/sh

# Install all git extensions to bash bin path.

BIN=${1:-"/bin"}
PWD=`pwd`
for i in git-*
do
 	ln -sf "$PWD/$i" "$BIN/${i%.sh}"
done
exit 0;
