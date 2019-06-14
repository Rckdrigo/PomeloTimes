#!/usr/bin/env bash
# filename: api.create.sh
error_exit(){
	echo -e "\n$1"
	exit 0
}

get_project(){
    PROJECT=$(grep PROJECT .env | cut -d '=' -f2)
}

echo "--Creating serverless API --"
echo -n "CAUTION: Please do not cancel this process."

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ ! -d ./server/$1 ]; then   
        get_project

        if "$PROJECT" == ""; then
            error_exit "You need a PROJECT in the .env file."
        fi 

        cd ./server

        serverless create --template-url https://github.com/Rckdrigo/BorealisTemplate --path $1 --name $1

        cd $1

        echo '{ "project": "'$PROJECT'", "region": "ap-southeast-1", "logRetentionInDays": 90, "memorySize" : 128, "timeout" : 6 }' > config.json 
        
        cd ./test
        cp template.test.js $1.test.js
        rm template.test.js
        

    else
        error_exit "API already exists."
    fi

else
    error_exit "\nYou need to put a name to the API. Example: 'npm run api:create user-managment'"
fi

echo -e "\nFinished."