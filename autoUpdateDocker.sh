#!/bin/bash

git pull

systemctl stop nginx

docker ps
docker stop ulm-bridge
docker rm ulm-bridge

docker build -t ulm-bridge .

docker run -d \
  --name nginx-app \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  my-app-with-ssl