#!/usr/bin/env bash
# filename: ms.offline.sh

echo "--Offline serverless API --"

if [ "$1" != "" ]; then
    echo -e "\n"
    
    if [ -d ./server/$1 ]; then    
        cd ./server/$1
        if [ $2 = ""]; then
            sls offline
        else
            sls offline --port $2
        fi

    else
        echo -e "API does not exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."