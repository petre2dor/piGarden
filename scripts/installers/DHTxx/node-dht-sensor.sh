#! /bin/bash

if [[ "$EUID" -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    echo "please run: sudo $(readlink -f $0)"
    exit 1
fi
. /etc/environment

CPUID=$(cat /proc/cpuinfo | awk '/Hardware/{print $3}')
if [[ $CPUID == 'BCM2709' || $CPUID == 'BCM2708' ]]; then
    echo "****** Installing node-dht-sensor module *****"
    if [[ $(cat "$PI_GARDEN_ROOT/scripts/patch.version") -lt 14 ]]; then
        echo "This installer has dependecies(bcm2835) installed at patch version 14. Please update and run again"
        exit
    fi
    su $PI_GARDEN_USER_NAME -c "cd $PI_GARDEN_ROOT; npm install node-dht-sensor"
else
    echo "This isn't a Pi, cannot install node-dht-sensor (failing build caused by bcm2835)"
fi
