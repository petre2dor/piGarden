#! /bin/bash
. /etc/environment
. "$PI_GARDEN_ROOT/scripts/localConfig.sh"

mysql -uroot -p$PI_GARDEN_MYSQL_ROOT_PASS < updates/update-2.sql
