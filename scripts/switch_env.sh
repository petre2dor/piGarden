#! /bin/bash



allowed_envs="dev devpi production"
if [[ -z ${1+x} || ! $allowed_envs =~ $1 ]]
then echo -e "\n Please provide environment: dev | devpi | production \n"; exit 2
fi

echo -e "\n"
echo "Setting PI_GARDEN_ENV to $1"
echo -e "\n"
if hash pm2 2>/dev/null; then
    pm2 restart app.json --env $1
else
    echo "pm2 not installed yet"
fi
