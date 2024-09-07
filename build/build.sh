#!/bin/bash

cd /media/benoti/Ubuntu-Disk/Github/ui-library/build

echo "Building ..."

bun index.ts

if [ $? -ne 0 ]; then
    echo "Build Failed!"
    exit 1
else
    echo "Build Succeded!"
fi

cd /media/benoti/Ubuntu-Disk/Github/ui-library

rm -f /media/benoti/Ubuntu-Disk/Github/ui-library/dist/react/components/*.ts

cp -R /media/benoti/Ubuntu-Disk/Github/ui-library/types/d.ts/components/react/* \
    /media/benoti/Ubuntu-Disk/Github/ui-library/dist/react/components/

git add .
git commit -m "Build Update"
git push
git checkout latest
git merge main
git push
git checkout main
