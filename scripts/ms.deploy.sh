#!/usr/bin/env bash
# filename: api.deploy.sh

echo "--Deploy serverless API --"
echo -n "CAUTION: Please do not cancel this process."

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ -d ./server/$1 ]; then   
        cd server/$1

        case "$2" in
            "" | dev)
                echo "Deploying to dev stage..."
                sls deploy -v --stage dev
                sls info --stage dev > info.dev.yml
                ;;
            test)
                echo -e "\nDeploying all to test stage..."
                sls deploy -v --stage test
                sls info --stage test > info.test.yml
                ;;
            prod)
                echo -e "\nDeploying all to prod stage..."
                sls deploy -v --stage prod
                sls info --stage prod > info.prod.yml
                ;;
            *) 
                echo "Deploy function $2 to dev stage"
                sls deploy -f $2 -v --stage dev
                ;; 
        esac
        
    else
        echo -e "API does not exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."