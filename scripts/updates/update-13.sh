#! /bin/bash

# source /etc/environment;
sed -i '/NODE_PATH/d' /etc/environment;
NEWPATH="NODE_PATH=$(dirname $(dirname $(dirname $(readlink -f $0))))"
# echo $NEWPATH
# echo $NODE_PATH
echo "$NEWPATH" >> /etc/environment;
