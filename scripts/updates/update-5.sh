#! /bin/bash
sudo npm install pm2 -g
sudo npm install jasmine -g
sudo su root -c 'echo "PM2_HOME=/home/vagrant/.pm2/" >> /etc/environment'
cd ~
. ~/.profile
pm2 list
sudo su -c "env PATH=$PATH:/home/vagrant/.nvm/versions/node/v6.3.0/bin pm2 startup ubuntu -u vagrant --hp /home/vagrant"
sudo env PATH=$PATH:/home/vagrant/.nvm/versions/node/v6.3.0/bin pm2 logrotate -u vagrant
cd /piGarden
pm2 start app.json
pm2 save
