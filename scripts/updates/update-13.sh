#! /bin/bash

source /etc/environment;
sed -i '/NODE_PATH/d' /etc/environment
sed -i '/PI_GARDEN_ENV/d' /etc/environment

sudo su $PI_GARDEN_USER_NAME -c 'pm2 kill'
sudo su $PI_GARDEN_USER_NAME -c "pm2 start $PI_GARDEN_ROOT/app.json"
