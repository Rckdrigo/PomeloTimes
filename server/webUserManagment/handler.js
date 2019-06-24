'use strict';

const config = require('./db.config.json')
// const mysql = require('./node_modules/serverless-mysql')

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

const dbConfig = (context) => {

    if(context.awsRequestId.includes('offline'))
        return config.offline

    if (context.functionName.includes('-prod-'))
        return config.prod
    else if (context.functionName.includes('-test-'))
        return config.test
    else 
        return config.dev
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

    console.log(event)

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
            let selectAllUserInformation = 'call selectAllUserInformation(?);';
            
            response = await mysql.query(selectAllUserInformation, [username]);      
            await mysql.end().catch(e => { throw (e) });

            if(response[0].length === 0)
                throw(new Error('The user does not exists.'))

            let userInformation = {
                idUser: response[0][0].idUser,
                username: response[0][0].username,
                firstName: response[0][0].firstName,
                lastName: response[0][0].lastName,
                email: response[0][0].email
            }

            let companyInformation = {
                idCompany: response[0][0].idCompany,
                companyName: response[0][0].companyName,
            }

            let isAuroraSuperuser =  response[0].filter(e =>{ 
                delete e.idUser;
                delete e.username;
                delete e.firstName;
                delete e.lastName;
                delete e.email;
                delete e.idCompany;
                delete e.companyName;
                return e.idRole === 1 && e.idProduct === 1
            }).length > 0;

            let allUsersResponse;
            let allUsers = [];
            if(isAuroraSuperuser)
                {
                    let getAllCompanyUsers = 'call selectAllCompanyUsers(?,?);';
                    allUsersResponse = await mysql.query(getAllCompanyUsers, [userInformation.idUser, companyInformation.idCompany]);      
                    await mysql.end().catch(e => { throw (e) });

                    allUsersResponse[0].map(user => {
                        let userIndex = allUsers.findIndex(u => u.username === user.username);
                        let p = {productName: user.productName, roleName: user.roleName}

                        if(allUsers[userIndex] !== undefined){
                            allUsers[userIndex].product.push(p);
                        }
                        else{
                            let u = {username : user.username, product: [] }
                            u.product.push(p)
                            allUsers.push(u)
                        }

                    })
                }

            return {
                headers,
                statusCode: 200,
                response: {
                    userInformation,
                    companyInformation,
                    isAuroraSuperuser,
                    allUsers : isAuroraSuperuser ? allUsers : undefined,
                    productRoles: response[0] 
                }
            }

        case "POST":
            var { username, firstName, lastName, email, idCompany, superuser, productRoles } = event.body;
            var create = 'call updateWebUser(?,?,?,?,?,?,?);';
            response = await mysql.query(create, [username, firstName, lastName, email, idCompany, superuser, concatProductRoles(productRoles)])

            await mysql.end()
                .catch(e => { throw (e) })
            return {
                headers,
                // r : concatProductRoles(productRoles),
                statusCode: 200
                // response: response[0]
            };

        case "DELETE":
                var { username } = event.path;
                var create = 'call deleteWebUser(?);';
                response = await mysql.query(create, [username])
    
                await mysql.end()
                    .catch(e => { throw (e) })
                return {
                    headers,
                    statusCode: 200
                };
    }

}
