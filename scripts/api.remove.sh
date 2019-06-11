# filename: api.remove.sh
echo "--Remove serverless API --"

if [ "$1" != "" ]; then
    echo -e "\n"
    
   if [ -d ./server/$1 ]; then   
        cd server/$1
        echo "Deploying to dev stage..."
        if [ "$2" == "" ]; then
            sls remove -v 
        else
            echo "Deploy function $2"
            sls remove -v
        fi

    else
        echo -e "API does not exists."
    fi

else
    echo -e "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."