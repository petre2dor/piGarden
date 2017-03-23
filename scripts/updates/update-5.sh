#! /bin/bash

# installs Grafana; it does a arch check to determine the proper .deb file to be used
echo "************************************"
echo "*******Installing Grafana***********"
echo "************************************"
. /etc/environment
LOCAL_DEB=''
case `uname -m` in
    x86_64)
        echo 'x86_64'
        LOCAL_DEB="$PI_GARDEN_ROOT/installers/grafana/grafana_4.1.2-1486989747_amd64.deb"
        ;;
    armv7l)
        echo 'armv7 (raspberry)'
        LOCAL_DEB="$PI_GARDEN_ROOT/installers/grafana/grafana_4.1.2-1487023783_armhf.deb"
        ;;
    *)
        echo 'Unknown architecture. Installer available only for x86_64 and armv7 (raspberry)'
        exit 1
        ;;
esac

dpkg -i $LOCAL_DEB
apt-get update
apt-get -fy install

sed -i "s/;http_port = 3000/http_port = 3002/g" /etc/grafana/grafana.ini
systemctl daemon-reload
systemctl start grafana-server
systemctl enable grafana-server.service
