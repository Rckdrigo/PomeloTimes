#!/usr/bin/env bash

# filename: web.deploy.sh

usage () {
    echo -e "\nYou need to put a name to the envorinment. Example: 'npm run web:deploy [test | prod]'"
}

update () {
    npm i -f
    npm update
    npm audit fix
}

publish() {
    DOMAIN=$(grep DOMAIN .env | cut -d '=' -f2)
}


if [ "$1" != "" ]; then
    case "$1" in
        test)
            echo -e "--Deploying web to $1--"
            # update
            publish
            react-scripts build
            # echo "$1.$DOMAIN"
            aws s3 cp --recursive ./build s3://$1.$DOMAIN > logs/build.test
            echo "Deployed to: http://test.aurora-media.net.s3-website-ap-southeast-1.amazonaws.com/"
            ;;

        prod)
            echo -e "--Deploying web to $1--"
            # update
            publish
            react-scripts build
            # echo "$1.$DOMAIN"
            aws s3 cp --recursive ./build s3://$1.$DOMAIN > logs/build.prod
            echo "Deployed to: http://prod.aurora-media.net.s3-website-ap-southeast-1.amazonaws.com/"
            ;;

        *)
            usage
            exit
            ;;
    esac

else
    usage
fi

echo -e "\nFinished."




# echo -e "\n\nInstalling and updating node libraries... \n"
# npm i -f
# npm update
# npm audit fix

# echo "Replacing config & API file..."
# cp src/config/config.json src/config/config.dev.json 
# cp src/config/config.test.json src/config/config.json

# cp src/api/api.json src/api/api.dev.json 
# cp src/api/api.test.json src/api/api.json

# echo -e "\nBuilding react app.."
# react-scripts build

# echo -e "\nUploading to s3 bucket.."
# aws s3 cp --recursive ./build s3://android-imedia-frontend-test

# echo -e "\nUploaded to: http://android-imedia-frontend-test.s3-website-ap-southeast-1.amazonaws.com/"

# echo -e "\n\nRollback to dev..."
# cp src/config/config.dev.json src/config/config.json 
# cp src/api/api.dev.json src/api/api.json 

# echo -e "\nTest version uploaded."
