#! /bin/bash

# install bcm2835 C library on system
# source: http://www.airspayce.com/mikem/bcm2835/

. /etc/environment
echo "******** Installing bcm2835 C library*********"
cd $PI_GARDEN_ROOT/scripts/installers/bcm2835
tar zxf bcm2835-1.50.tar.gz
cd bcm2835-1.50
./configure
make
sudo make check
sudo make install
cd ..
rm -rf bcm2835-1.50
echo "done" > ./INSTALLED
