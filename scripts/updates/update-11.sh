#! /bin/bash

pm2 stop all
pm2 delete all
pm2 start ../app.json
pm2 save
