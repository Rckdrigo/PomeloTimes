#!/usr/bin/env bash

# filename: api.init.sh
for opt in $@
    do
        case "$opt" in
            h | help)
                echo -e "--Initializes amazon web services and installs the libraries. 

Be sure to have aws-cli(https://aws.amazon.com/cli/) installed in your computer. You need to have python and pip installed to in order for aws-cli to work.

Have your access key and secret key nearby as you will need them for this process. If ypu dont have them, please contact the admin.

Type down ap-southeast-1 as the default region."
                exit 0
                ;;
        esac
    done

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