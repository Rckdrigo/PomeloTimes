# filename: api.deploy.sh
echo "--Deploy serverless API --"

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ -d ./server/$1 ]; then   
        cd server/$1
        echo "Deploying to dev stage..."
        if [ "$2" == "" ]; then
            sls deploy -v 
        else
            echo "Deploy function $2"
            sls deploy -f $2 -v
        fi

    else
        echo -e "API does not exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."