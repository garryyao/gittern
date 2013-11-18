#!/bin/sh
CURRENT=t/$1
NEW=t/$2

git branch -m $CURRENT $NEW
git push origin  :$CURRENT
git checkout $NEW
cke-push origin
