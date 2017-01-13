#! /bin/bash
if [[ "$EUID" -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   echo "please run: sudo $(readlink -f $0) or sudo !!"
   exit 1
fi

. /etc/environment
. "$PI_GARDEN_ROOT/scripts/localConfig.sh"

if getent passwd $PI_GARDEN_USER_NAME; then
    echo "User $PI_GARDEN_USER_NAME exists, skipping."
else
    useradd $PI_GARDEN_USER_NAME -s /bin/bash -m
    echo "$PI_GARDEN_USER_NAME:$PI_GARDEN_USER_PASS" | chpasswd

    usermod -aG sudo $PI_GARDEN_USER_NAME
    # this adds the current running user to PI_GARDEN_USER_NAME's group; might be helpful in using PM2
    usermod -aG $PI_GARDEN_USER_NAME `logname`
    chown -R $PI_GARDEN_USER_NAME:$PI_GARDEN_USER_NAME $PI_GARDEN_ROOT

    # add PI_GARDEN_USER_NAME to spi group
    egrep -i "^spi" /etc/group;
    if [ $? -eq 0 ]; then
        usermod -a -G spi $PI_GARDEN_USER_NAME
    fi

    # add PI_GARDEN_USER_NAME to gpio group
    egrep -i "^gpio" /etc/group;
    if [ $? -eq 0 ]; then
        usermod -a -G gpio $PI_GARDEN_USER_NAME
    fi

    sed -i '/PI_GARDEN_USER_NAME/d' /etc/environment
    echo "PI_GARDEN_USER_NAME=$PI_GARDEN_USER_NAME" >> /etc/environment
    . /etc/environment
    echo "created user $PI_GARDEN_USER_NAME"
fi
