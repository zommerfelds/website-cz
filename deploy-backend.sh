#!/bin/bash
set -ex

sls=$(npm bin)/sls
npm install
$sls deploy
URL=$($sls info | grep POST | awk '{ print $NF }')
echo "var deploymentData = {contactUrl: \"$URL\"};" > client/src/js/2-deploymentData.js

