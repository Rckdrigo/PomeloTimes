#!/bin/sh

ENV="$1"
if [ "$ENV" == "" ]; then
    ENV="dev"
fi

echo -e "\nGetting ALL apis of $ENV environment"
if [ -f ./src/api/api.$ENV.yml ]; then
    rm ./src/api/api.$ENV.yml
    echo -e "$ENV:" >> ./src/api/api.$ENV.yml
fi

for dir in server/*; do
    if [ -f ./$dir/info.$ENV.yml ]; then   
        while read line; do    
            if [[ $line =~ "GET" ]] || [[ $line =~ "POST" ]] || [[ $line =~ "DELETE" ]] || [[ $line =~ "PUT" ]]; then
                echo -e "\t$line" >> ./src/api/api.$ENV.yml
            fi
        done < ./$dir/info.$ENV.yml
    else
        echo -e "\n- info.$ENV.yml information does not exist in $dir. Please deploy that microservice in $ENV."
    fi
    echo -e "\n" >> ./src/api/api.$ENV.yml
done

# echo -e "\nDone."