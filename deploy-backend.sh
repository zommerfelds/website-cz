#!/bin/bash
set -ex

SLS_STAGE="${SLS_STAGE:-dev}"

npm install
npx sls deploy --stage $SLS_STAGE

URL=$(npx sls info | grep POST | awk '{ print $NF }')
# NOTE: sls seems buggy and doesn't return an error exit code
[[ -z "$URL" ]] && { echo "Deployment URL is empty" ; exit 1; }
echo -e "/* eslint-disable */\n/* THIS FILE IS AUTO-GENERATED, DO NOT EDIT */\nvar deploymentData = {contactUrl: '$URL'};" > client/src/js/2-deploymentData.js
