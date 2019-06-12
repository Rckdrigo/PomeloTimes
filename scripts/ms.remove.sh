#!/usr/bin/env bash
# filename: api.remove.sh

echo "--Remove serverless API --"
echo -n "CAUTION: Please do not cancel this process."

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ -d ./server/$1 ]; then   
        cd server/$1
        case "$2" in
            "" | dev)
                echo -e "Remove to dev stage..."
                sls remove -v --stage dev
                ;;
            test)
                echo -e "Remove test stage..."
                sls remove -v --stage test
                ;;
            prod)
                echo -e "Remove prod stage..."
                sls remove -v --stage prod
                ;;
            all) 
                echo -e "Remove all..."
                sls remove -v --stage dev
                sls remove -v --stage test
                sls remove -v --stage prod
                ;;
        esac

    else
        echo -e "API does not exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."