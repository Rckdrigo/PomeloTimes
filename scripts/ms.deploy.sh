#!/usr/bin/env bash
# filename: api.deploy.sh

error_exit(){
	echo -e "\n$1"
	exit 0
}

deploy () {  
    if jest server/$1 --passWithNoTests; then
        echo "Test passed."

        sls deploy -v --stage $2
        sls info --stage $2 > info.$2.yml
        
    else 
        error_exit "Test failed. Canceling build."
    fi
}

echo "--Deploy serverless API --"
echo -n "CAUTION: Please do not cancel this process."

if [ "$1" != "" ]; then
    
   if [ -d ./server/$1 ]; then   
        cd server/$1

        case "$2" in
            "" | dev)
                echo -e "\nDeploying to dev stage..."
                sls deploy -v --stage dev
                sls info --stage dev > info.dev.yml
                ;;
            test | prod)
                echo -e "\nDeploying all to $2 stage..."

                for opt in $@
                do
                    case "$opt" in
                        u | update)
                            echo "Updating libraries."
                            npm i -f
                            npm update
                            npm audit fix
                            ;;
                    esac
                done

                deploy $1 $2
                ;;
            *) 
                echo -e "\nDeploy function $2 to dev stage"
                sls deploy -f $2 -v --stage dev
                ;; 
        esac
        
    else
        error_exit "\nAPI does not exists."
    fi

else
    error_exit "\nYou need to put a name to the API. Example: 'npm run api:pack user-managment'"
fi

echo -e "\nFinished."