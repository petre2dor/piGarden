#! /bin/bash
sudo npm install pm2 -g
sudo npm install jasmine -g
sudo su root -c "echo 'PM2_HOME=/home/$USER/.pm2/' >> /etc/environment"
pm2 list
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 startup ubuntu -u $USER --hp /home/$USER"
sudo su -c "env PATH=$PATH:/usr/bin/node pm2 logrotate -u $USER"
cd /piGarden
pm2 start app.json
pm2 save
