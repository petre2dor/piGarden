#! /bin/bash

# source /etc/environment;
sed -i '/NODE_PATH/d' /etc/environment
sed -i '/PI_GARDEN_ENV/d' /etc/environment
pm2 kill
pm2 start /piGarden/app.json
