#!/bin/bash
set -ex

npm install
env | grep SERVERLESS_ACCESS_KEY

npx sls --debug deploy
URL=$(npx sls info | grep POST | awk '{ print $NF }')
echo -e "/* eslint-disable */\n/* THIS FILE IS AUTO-GENERATED, DO NOT EDIT */\nvar deploymentData = {contactUrl: '$URL'};" > client/src/js/2-deploymentData.js
