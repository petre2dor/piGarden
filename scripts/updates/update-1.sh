#! /bin/bash
# This will turn off "frontend" (prompts) during installations
export DEBIAN_FRONTEND=noninteractive

. /etc/environment
. "$PI_GARDEN_ROOT/scripts/localConfig.sh"

echo "************************************"
echo "**********Getting updates***********"
echo "************************************"
apt -qq update
apt -qq upgrade


echo "*************************"
echo "**********Install node 6.x***********"
echo "*************************"
wget -qO- https://deb.nodesource.com/setup_6.x | sudo bash -
apt-get -y install nodejs


echo "*************************"
echo "**********Install maria DB***********"
echo "*************************"

debconf-set-selections <<< "mariadb-server-5.5 mysql-server/root_password password $PI_GARDEN_MYSQL_ROOT_PASS"
debconf-set-selections <<< "mariadb-server-5.5 mysql-server/root_password_again password $PI_GARDEN_MYSQL_ROOT_PASS"
apt -y install mariadb-server-5.5


echo "*************************"
echo "**********Done***********"
echo "*************************"
