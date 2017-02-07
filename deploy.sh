#!/bin/bash
set -e

sls deploy
URL=$(sls info | grep POST | awk '{ print $NF }')
echo "var deploymentData = {contactUrl: \"$URL\"};" > client/src/js/2-deploymentData.js
node client/build.js
sls client deploy
