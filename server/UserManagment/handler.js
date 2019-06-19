'use strict';

const config = require('./db.config.json')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

const dbConfig = (context) => {
    let c = null;
    if(context.functionName.includes('-prod-'))
        c = config.prod
    else if(context.functionName.includes('-test-'))
        c = config.test
    else 
        c = config.dev

    return c
}

//npm run ms:offline UserManagment
module.exports.hello = async (event, context) => {   

    context.callbackWaitsForEmptyEventLoop = false;
    const mysql = require('serverless-mysql')(
        { 
            config : dbConfig(context) 
        })
    
    let select = 'SELECT * FROM user;';
    let response = await mysql.query(select,[])

    return {
        headers,
        statusCode: 200,
        response,   
        
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
