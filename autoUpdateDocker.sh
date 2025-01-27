#!/bin/bash

git pull

sudo systemctl stop nginx

sudo docker ps
sudo docker stop ulm-bridge
sudo docker rm ulm-bridge

sudo docker build -t ulm-bridge .

sudo docker run -d -p 80:80 -p 443:443 -v ./nginx.conf:/etc/nginx/nginx.conf:ro -v /etc/letsencrypt:/etc/letsencrypt:ro --name ulm-bridge ulm-bridge
