#! /bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   echo "please run: sudo $(readlink -f $0)"
   exit 1
fi


sed -i '/PI_GARDEN_ROOT/d' /etc/environment
echo "PI_GARDEN_ROOT=/piGarden" >> /etc/environment
. /etc/environment

/piGarden/scripts/createUser.sh
/piGarden/scripts/patch.sh
