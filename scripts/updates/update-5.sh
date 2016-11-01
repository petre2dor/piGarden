#! /bin/bash
. /etc/environment

echo "************************************"
echo "**********Installing PM2************"
echo "************************************"
npm install pm2 -g
npm install jasmine -g

sed -i '/PM2_HOME/d' /etc/environment
echo "PM2_HOME=/home/$PI_GARDEN_USER_NAME/.pm2/" >> /etc/environment
. /etc/environment

sudo su $PI_GARDEN_USER_NAME -c 'pm2 list'
chmod -R go+w "/home/$PI_GARDEN_USER_NAME/.pm2/"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 startup ubuntu -u $PI_GARDEN_USER_NAME --hp /home/$PI_GARDEN_USER_NAME"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 logrotate -u $PI_GARDEN_USER_NAME"
cd /piGarden
sudo su $PI_GARDEN_USER_NAME -c 'pm2 start app.json'
sudo su $PI_GARDEN_USER_NAME -c 'pm2 save'
