#!/bin/bash

BACKEND_URL=${BACKEND_URL}
envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf

if [ $# = 0 ]
then
    exec nginx -g 'daemon off;'
else
    exec "$@"
fi
