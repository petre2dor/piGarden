#! /bin/bash
if [[ "$EUID" -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   echo "please run: sudo $(readlink -f $0) or sudo !!"
   exit 1
fi


sudo apt-get update
sudo apt-get -y install build-essential python-dev


cd ~
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT

sudo python setup.py install


cd ..
rm -rf Adafruit_Python_DHT/
