#!/usr/bin/env bash
# filename: api.create.sh

echo "--Creating serverless API --"
echo -n "CAUTION: Please do not cancel this process."

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ ! -d ./server/$1 ]; then   

        PROJECT=$(grep PROJECT .env | cut -d '=' -f2)

        cd ./server
        # serverless create --template aws-nodejs --path $1 --name $1
        serverless create --template-url https://github.com/Rckdrigo/BorealisTemplate --path $1 --name $1
        cd $1
        echo '{ "project": "'$PROJECT'", "region": "ap-southeast-1", "logRetentionInDays": 90, "memorySize" : 128, "timeout" : 3 }' > config.json 
        
        cd ./test
        cp template.test.js $1.test.js
        rm template.test.js
        

    else
        echo -e "API already exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:create user-managment'"
fi

echo -e "\nFinished."