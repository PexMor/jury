#!/bin/bash

N=jury-nginx
IP=127.0.0.1
WEBROOT="$PWD/web"

docker kill $N
docker run -d \
    --rm \
    --hostname $N \
    --name $N \
    -v $WEBROOT:/usr/share/nginx/html \
    -p $IP:8008:80 \
    nginx:alpine
