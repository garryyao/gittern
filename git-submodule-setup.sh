#!/bin/sh
# Auto add all git sub module defined in the .gitmodules file.
set -e

git config -f .gitmodules --get-regexp '^submodule\..*\.path$' |
while read path_key path
do
	url_key=$(echo $path_key | sed 's/\.path/.url/')
	url=$(git config -f .gitmodules --get "$url_key")
	git rm --cached $path
	rm -rf ".git/modules/$path"
	rm -rf $path
	git submodule add -f $url $path
done
