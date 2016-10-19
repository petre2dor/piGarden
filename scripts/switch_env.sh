#! /bin/bash



allowed_envs="DEV DEVPI PRODUCTION"
if [[ -z ${1+x} || ! $allowed_envs =~ $1 ]]
then echo -e "\n Please provide environment: DEV | DEVPI | PRODUCTION \n"; exit 2
fi

echo -e "\n"
echo "Setting PI_GARDEN_ENV to $1"
echo -e "\n"

sed -i '/PI_GARDEN_ENV/d' /etc/environment;
echo PI_GARDEN_ENV="$1" >> /etc/environment;
source /etc/environment;
