#! /bin/bash
sed -i '/dtoverlay=w1-gpio/d' /boot/config.txt
echo 'dtoverlay=w1-gpio' >> /boot/config.txt
reboot
