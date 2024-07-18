#!/bin/bash
set -ex

npm install
npx sls deploy
URL=$(npx sls info | grep POST | awk '{ print $NF }')
echo -e "/* eslint-disable */\n/* THIS FILE IS AUTO-GENERATED, DO NOT EDIT */\nvar deploymentData = {contactUrl: '$URL'};" > client/src/js/2-deploymentData.js
