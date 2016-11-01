#! /bin/bash

# bootstrap installer for this project
# it clones the repo from Github and runs the initial steps

if [ ! -d /piGarden ]; then
    mkdir /piGarden
    apt -y install git
    git clone https://github.com/petre2dor/piGarden.git /piGarden
    /piGarden/script/createUser.sh
    /piGarden/script/patch.sh

    echo -e "run \nsu gradinar\n to switch the the owner account"
else
    echo -e "/piGarden exists, maybe you should try running \nsu gradinar && cd /piGarden && git pull\n to update it"
fi
