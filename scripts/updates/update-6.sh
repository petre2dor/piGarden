#! /bin/bash

# installs Grafana; it does a arch check to determine the proper .deb file to be used
. /etc/environment
LOCAL_DEB=''
case `uname -m` in
    x86_64)
        echo 'x86_64'
        LOCAL_DEB="$PI_GARDEN_ROOT/installers/influxdb/influxdb_1.2.0_amd64.deb"
        dpkg -i $LOCAL_DEB
        ;;
    armv7l)
        echo 'armv7 (raspberry)'
        LOCAL_DEB="$PI_GARDEN_ROOTinstallers/influxdb/influxdb-1.2.0_linux_armhf.tar.gz"
        tar xvfz influxdb-1.2.0_linux_armhf.tar.gz --transform="s|./influxdb-1.2.0-1||" --show-transformed-names
        ;;
    *)
        echo 'wtf?!'
        exit 1
        ;;
esac

apt-get update
apt-get -fy install
