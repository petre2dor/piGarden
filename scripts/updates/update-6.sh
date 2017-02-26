#! /bin/bash

# installs InfluxDB; it does a arch check to determine the proper .deb file to be used
. /etc/environment
LOCAL_DEB=''
case `uname -m` in
    x86_64)
        echo 'x86_64'
        LOCAL_DEB="$PI_GARDEN_ROOT/installers/influxdb/influxdb_1.2.0_amd64.deb"
        dpkg -i $LOCAL_DEB
        apt-get update
        apt-get -fy install
        ;;
    armv7l)
        echo 'armv7 (raspberry)'
        LOCAL_TAR="$PI_GARDEN_ROOT/installers/influxdb/influxdb-1.2.0_linux_armhf.tar.gz"
        tar xvfzP $LOCAL_TAR --transform="s|./influxdb-1.2.0-1||" --show-transformed-names
        cp /usr/lib/influxdb/scripts/influxdb.service /etc/systemd/system/influxdb.service
        useradd influxdb -s /bin/false -m
        chown -R influxdb /var/lib/influxdb/
        ;;
    *)
        echo 'wtf?!'
        exit 1
        ;;
esac
# security stuff
sed -i 's/# bind-address = ":8086"/bind-address = "127.0.0.1:8086"/g' /etc/influxdb/influxdb.conf
sed -i 's/# hostname = "localhost"/# hostname = "localhost"\nbind-address = "127.0.0.1:8088"/g' /etc/influxdb/influxdb.conf




systemctl daemon-reload
systemctl enable influxdb
systemctl start influxdb

curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE piGarden"
