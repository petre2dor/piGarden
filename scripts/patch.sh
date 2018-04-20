#! /bin/bash
#
# this file is run by cronjob
#
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as sudo" 1>&2
   echo "please run: sudo $(readlink -f $0)"
   exit 1
fi

. /etc/environment
. "$PI_GARDEN_ROOT/scripts/localConfig.sh"

cd "$PI_GARDEN_ROOT/scripts"

# local versions are stored here
VERSION_CURRENT_FILE="./patch.version"
VERSION_TARGET_FILE="./patch.target"

# get current version
if [ ! -f "$VERSION_CURRENT_FILE" ]; then
	echo "VERSION_CURRENT=0" > ${VERSION_CURRENT_FILE}
fi

. "$VERSION_CURRENT_FILE"
echo "Current version is $VERSION_CURRENT"

# get target version
. "$VERSION_TARGET_FILE"
echo "Target version is $VERSION_TARGET"

# while we are behind VERSION_TARGET
while [ $VERSION_CURRENT -lt $VERSION_TARGET ]
do
	# go to the next version
	VERSION_CURRENT=$((VERSION_CURRENT+1))

	# increment version
   	if [ ! -f "./updates/update-$VERSION_CURRENT.sh" ]; then
		echo "Update $VERSION_CURRENT not available."
		exit 1
   	fi
	echo "Running updates update-$VERSION_CURRENT.sh"
	chmod +x "./updates/update-$VERSION_CURRENT.sh"
	"./updates/update-$VERSION_CURRENT.sh"

	# is there any point in this?
	chmod -x "./updates/update-$VERSION_CURRENT.sh"

	# save the last version
	echo "VERSION_CURRENT=$VERSION_CURRENT" > $VERSION_CURRENT_FILE
done

cd "$PI_GARDEN_ROOT"
npm install

echo "DONE"
exit 0;
