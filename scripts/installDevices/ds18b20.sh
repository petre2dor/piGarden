#! /bin/bash
if [[ "$EUID" -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   echo "please run: sudo $(readlink -f $0) or sudo !!"
   exit 1
fi
echo 'w1-gpio' >> /etc/modules
echo 'w1-therm' >> /etc/modules
echo 'dtoverlay=w1-gpio' >> /boot/config.txt

. /etc/environment
cd $PI_GARDEN_ROOT
npm install ds18b20-raspi

# ls -al /sys/bus/w1/devices/
echo "w1 devices list:"
ls -al /sys/bus/w1/devices/ | grep "28" | awk '{print $9;}'
