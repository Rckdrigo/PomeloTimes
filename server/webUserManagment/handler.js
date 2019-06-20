'use strict';

const config = require('./db.config.json')

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

    return c
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

module.exports.webUser = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const mysql = require('serverless-mysql')({ config: dbConfig(context) })

    switch (event.method) {
        case "GET":
            var { username } = event.path;
            var select = 'call selectAllUserInformation(?);';
            var response = await mysql.query(select, [username])

            await mysql.end()
                .catch(e => { throw (e) })

            return {
                headers,
                statusCode: 200,
                response: response[0]   
            };

        case "POST":
            var { username, firstName, lastName, email, idCompany, superuser, productRoles } = event.body;
            var create = 'call createWebUser(?,?,?,?,?,?,?);';
            var response = await mysql.query(create, [username, firstName, lastName, email, idCompany, superuser, concatProductRoles(productRoles)])

            await mysql.end()
                .catch(e => { throw (e) })
            return {
                headers,
                r : concatProductRoles(productRoles),
                statusCode: 200,
                response: response[0]
            };

    }


}
