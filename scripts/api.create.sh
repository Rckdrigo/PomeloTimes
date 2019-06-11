#!/usr/bin/env bash

# filename: api.create.sh
echo "--Creating serverless API --"

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ ! -d ./server/$1 ]; then   

        cd ./server
        serverless create --template aws-nodejs --path $1
        
        cd $1
        mkdir test

        touch config.json
        touch config.test.json
        touch config.prod.json

    else
        echo -e "API already exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run create:api user-managment'"
fi

echo -e "\nFinished."