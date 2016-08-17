#! /bin/bash
pm2 stop all
source ~/.nvm/nvm.sh
pm2 start all
pm2 list
