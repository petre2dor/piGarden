#! /bin/bash

# install bcm2835 C library on system
# source: http://www.airspayce.com/mikem/bcm2835/

. /etc/environment
echo "******** Installing bcm2835 C library*********"
cd $PI_GARDEN_ROOT/scripts/updates
tar zxf update-14.tar.gz
cd bcm2835-1.50
./configure
make
sudo make check
sudo make install
cd ..
rm -rf bcm2835-1.50

usermod -aG 997 $PI_GARDEN_USER_NAME
