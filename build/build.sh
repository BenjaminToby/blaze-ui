#!/bin/bash

root_dir=$BLAZE_UI_PATH

if [ -z "$1" ]; then
    msg="Updates"
else
    msg="$1"
fi

cd $root_dir/build

echo "Building ..."

bun index.ts

if [ $? -ne 0 ]; then
    echo "Build Failed!"
    exit 1
else
    echo "Build Succeded!"
fi

cd $root_dir

rm -f $root_dir/dist/components/*.ts

cp -R $root_dir/types/d.ts/components/* \
    $root_dir/dist/components/

git add .
git commit -m "$msg"
git push
git checkout latest
git merge main
git push
git checkout main
