#! /bin/bash

# bootstrap installer for this project
# it clones the repo from Github and runs the initial steps

mkdir /piGarden
git clone https://github.com/petre2dor/piGarden.git /piGarden
/piGarden/script/createUser.sh
/piGarden/script/patch.sh

echo -e "run \n sudo su gradinar\n to switch the the owner account"
