#! /bin/bash

apt -y install curl build-essential g++

. /etc/environment


echo "************************************"
echo "*************Setup PM2**************"
echo "************************************"

sudo su $PI_GARDEN_USER_NAME -c 'pm2 list'
chmod -R go+w "/home/$PI_GARDEN_USER_NAME/.pm2/"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 startup ubuntu -u $PI_GARDEN_USER_NAME --hp /home/$PI_GARDEN_USER_NAME"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 logrotate -u $PI_GARDEN_USER_NAME"
cd /piGarden
sudo su $PI_GARDEN_USER_NAME -c "pm2 start $PI_GARDEN_ROOT/app.json"
sudo su $PI_GARDEN_USER_NAME -c 'pm2 save'

. /etc/environment;
sed -i '/NODE_PATH/d' /etc/environment
sed -i '/PI_GARDEN_ENV/d' /etc/environment

sudo su $PI_GARDEN_USER_NAME -c 'pm2 kill'
sudo su $PI_GARDEN_USER_NAME -c "pm2 start $PI_GARDEN_ROOT/app.json"
sudo su $PI_GARDEN_USER_NAME -c 'pm2 save'

apt-get install python3 python3-pip -y
