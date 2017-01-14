#! /bin/bash
if [[ "$EUID" -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   echo "please run: sudo $(readlink -f $0) or sudo !!"
   exit 1
fi


install npm install --save ds18b20-raspi
