#! /bin/bash
echo "************************************"
echo "**********Getting updates***********"
echo "************************************"
sudo apt update -qq


echo "************************************"
echo "**********Installing nodejs and dependencies***********"
echo "************************************"

# install nodejs and dependencies for nvm
sudo apt install nodejs npm build-essential libssl-dev -y

# install nvm
# https://github.com/creationix/nvm
echo "************************************"
echo "**********Installing nodejs NVM***********"
echo "************************************"

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
source ~/.bashrc

# show nvm version
nvm -v
echo "*************************"
echo "**********Install node 6.3.0***********"
echo "*************************"
nvm install 6.3.0



echo "*************************"
echo "**********Install maria DB***********"
echo "*************************"
# This will turn off "frontend" (prompts) during installations
export DEBIAN_FRONTEND=noninteractive

sudo debconf-set-selections <<< 'mariadb-server-5.5 mysql-server/root_password password Calul€vErdemanancaDES'
sudo debconf-set-selections <<< 'mariadb-server-5.5 mysql-server/root_password_again password Calul€vErdemanancaDES'
sudo apt install mariadb-server-5.5 -y


echo "*************************"
echo "**********Done***********"
echo "*************************"
