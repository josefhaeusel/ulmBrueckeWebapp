#!/bin/bash

# Check if SSL certificates exist
if [ ! -f /etc/letsencrypt/live/flachsbruecke-ulm.de/fullchain.pem ]; then
  echo "Generating SSL certificates..."
  certbot certonly --non-interactive --agree-tos --standalone \
    --email josef.haeusel@klangerfinderde \
    -d flachsbruecke-ulm.de \
    -d www.flachsbruecke-ulm.de
else
  echo "SSL certificates already exist. Skipping generation."
fi

# Start Nginx
echo "Starting Nginx..."
nginx -g "daemon off;"