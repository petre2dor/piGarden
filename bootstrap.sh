#! /bin/bash

# bootstrap installer for this project
# it clones the repo from Github and runs the initial steps

if [ ! -d /piGarden ]; then
    mkdir /piGarden
    apt -y install git
    git clone https://github.com/petre2dor/piGarden.git /piGarden
    sleep 1
    echo -e "Bootstrap complete! Running initial setup now."
    /piGarden/scripts/initialSetup.sh
    echo -e "Initial setup complete! Run \n           su gradinar\nto switch the the owner account and do your stuff"
else
    echo -e "/piGarden exists, maybe you should try running \n           su gradinar; cd /piGarden; git pull\n to update it"
fi
