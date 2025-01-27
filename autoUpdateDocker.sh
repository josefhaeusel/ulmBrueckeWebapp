#!/bin/bash

git pull

sudo systemctl stop nginx

sudo docker ps
sudo docker stop ulm-bridge
sudo docker rm ulm-bridge

sudo docker build -t ulm-bridge .

sudo docker run -d \
  --name ulm-bridge \
  -p 80:80 \
  -p 443:443 \
  -v /etc/nginx/sites-enabled/default:/etc/nginx/conf.d/default.conf:ro \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  ulm-bridge