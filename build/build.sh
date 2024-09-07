#!/bin/bash

cd /media/benoti/Ubuntu-Disk/Github/ui-library

bun index.ts

git add .
git commit -m "Build Update"
git push
git checkout latest
git merge main
git push
git checkout main