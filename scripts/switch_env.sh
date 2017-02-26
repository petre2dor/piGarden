#! /bin/bash

allowed_envs="dev devpi production"
if [[ -z ${1+x} || ! $allowed_envs =~ $1 ]]
    then echo -e "\n Please provide environment: dev | devpi | production \n"; exit 2
fi

echo -e "\n"
echo "Setting PI_GARDEN_ENV to $1"
echo -e "\n"
if hash pm2 2>/dev/null; then
    pm2 stop app.json
    pm2 delete app.json
    cp app.json_tpl app.json
    sed -i "s/\"DEV\"/\"$1\"/g" app.json
    pm2 start app.json
    pm2 save
else
    echo "pm2 not installed yet"
fi
