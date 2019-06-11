#!/usr/bin/env bash

# filename: api.init.sh
echo "--Init serverless framework--"
npm install -g serverless@latest

echo -e "\n"
if [ ! -d "./server" ]; then
    mkdir server
else
    ls server -R
fi

echo -e "\nSetup AWS credentials"
aws configure

echo -e "\nFinished"