'use strict';

const config = require('./db.config.json')
// const mysql = require('./node_modules/serverless-mysql')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

const dbConfig = (context) => {
    let c = null;
    if (context.functionName.includes('-prod-'))
        c = config.prod
    else if (context.functionName.includes('-test-'))
        c = config.test
    else
        c = config.dev

    return c;
}

const concatProductRoles = (productRoles) => { 
    var productsString = "";
    productRoles.map((p,i) => {
        productsString += p.idProductRole;
        if(i < productRoles.length - 1)
            productsString += ",";
    })

    return productsString;
}

module.exports.createSuperUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let db = dbConfig(context);
    let mysql = require('serverless-mysql')({ config: db })

    switch(event.triggerSource){
        case 'PostConfirmation_ConfirmForgotPassword':
            console.log('PostConfirmation_ConfirmForgotPassword')
            callback (null ,event)
            break;

        case 'PreSignUp_AdminCreateUser':
            console.log('PreSignUp_AdminCreateUser')

            let { userName } = event
            let { email } = event.request.userAttributes

            //Run your query
            var create = 'call createWebUser(?,?,?,?,?,?,?);';
            await mysql.query(create, [userName, "", "", email, null, 0, "1"])

            // Run clean up function
            await mysql.end()

            callback(null, event)
            break;
        default:
            console.log('default')
            callback(null, event)
            break
    }
}

module.exports.webUser = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let db = dbConfig(context);
    let mysql = require('serverless-mysql')({ config: db })

    let response = null;
    switch (event.method) {
        case "GET":
            var { username } = event.path;
            let select = 'call selectAllUserInformation(?);';
            

            response = await mysql.query(select, [username]);      
                // .catch(e => { throw (e) })

            await mysql.end().catch(e => { throw (e) });

            return {
                headers,
                statusCode: 200,
                response: response[0],  
                username,
                db
            }

        case "POST":
            var { username, firstName, lastName, email, idCompany, superuser, productRoles } = event.body;
            var create = 'call createWebUser(?,?,?,?,?,?,?);';
            response = await mysql.query(create, [username, firstName, lastName, email, idCompany, superuser, concatProductRoles(productRoles)])

            await mysql.end()
                .catch(e => { throw (e) })
            return {
                headers,
                // r : concatProductRoles(productRoles),
                statusCode: 200
                // response: response[0]
            };
    }
    


}
