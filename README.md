Aurora framework 

## Available Scripts

### `npm run aws:init`
Initializes amazon web services and installs the libraries. 

Be sure to have [aws-cli](https://aws.amazon.com/cli/) installed in your computer. You need to have python and pip installed to in order for aws-cli to work.

Have your access key and secret key nearby as you will need them for this process. If ypu dont have them, please contact the admin.

Type down `ap-southeast-1` as the default region.

### `npm run ms:create [ name of microservice ]`
Creates a micro-service (ms). This will create a serverless configuration file, a test folder with a template and a configuration file.


### `npm run ms:deploy [ name of microservice ] [ dev | test | prod | function name ] [ u ]`
Deploys a micro-service (ms) to the desired environment (default: dev). 

If you don't write down the environment name, it will deploy the specific function. For production and test all the unit tests have to pass.

U is for updating the libraries.


### `npm run ms:remove [ name of microservice ] [ dev | test | prod ]`


### `npm run ms:offline [ name of microservice ] [ PORT ]`
Deploys a micro-service (ms) in the localserver. 

If you don't write down the environment name, it will deploy the specific function. For production and test all the unit tests have to pass.

U is for updating the libraries.


### `npm run web:deploy [ name of microservice ] [ test | prod ] [ u ]`
