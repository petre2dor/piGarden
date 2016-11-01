#! /bin/bash

echo "creating user gradinar"

sudo useradd gradinar -s /bin/bash -m
sudo chpasswd << 'END'
gradinar:paroladegradinar
END

sudo usermod -a -G sudo gradinar
sudo chown -R gradinar:gradinar /piGarden
sudo usermod -aG gradinar `logname`
