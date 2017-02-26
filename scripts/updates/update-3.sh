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



# update 5
apt -y install curl build-essential g++

. /etc/environment

sudo su $PI_GARDEN_USER_NAME -c 'pm2 list'
chmod -R go+w "/home/$PI_GARDEN_USER_NAME/.pm2/"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 startup ubuntu -u $PI_GARDEN_USER_NAME --hp /home/$PI_GARDEN_USER_NAME"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 logrotate -u $PI_GARDEN_USER_NAME"
cd /piGarden
sudo su $PI_GARDEN_USER_NAME -c "pm2 start $PI_GARDEN_ROOT/app.json"
sudo su $PI_GARDEN_USER_NAME -c 'pm2 save'

# update 13
. /etc/environment;
sed -i '/NODE_PATH/d' /etc/environment
sed -i '/PI_GARDEN_ENV/d' /etc/environment

sudo su $PI_GARDEN_USER_NAME -c 'pm2 kill'
sudo su $PI_GARDEN_USER_NAME -c "pm2 start $PI_GARDEN_ROOT/app.json"
sudo su $PI_GARDEN_USER_NAME -c 'pm2 save'
