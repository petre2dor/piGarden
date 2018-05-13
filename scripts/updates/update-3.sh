#! /bin/bash

mysql -udb_gardener -pKTgdXz3SSMCY pi_garden < updates/update-3.sql


. /etc/environment

echo "************************************"
echo "**********Installing PM2************"
echo "************************************"
npm install pm2 -g
npm install jasmine -g

sed -i '/PM2_HOME/d' /etc/environment
echo "PM2_HOME=/home/$PI_GARDEN_USER_NAME/.pm2/" >> /etc/environment


echo "***************************"
echo "***save current version****"
echo "***************************"
echo "VERSION_CURRENT=3" > $PI_GARDEN_ROOT/scripts/patch.version

echo "************************************"
echo "***shuting down. please restart and run: cd /piGarden/scripts && sudo ./initialSetup.sh***************"
echo "************************************"
shutdown now
