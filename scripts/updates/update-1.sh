echo "************************************"
echo "**********Getting updates***********"
echo "************************************"
sudo apt update

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
# to finish this
sudo apt install mariadb-server -y -qq #not sure this is right



echo "*************************"
echo "**********Done***********"
echo "*************************"
