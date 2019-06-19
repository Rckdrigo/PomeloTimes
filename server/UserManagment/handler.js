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

const lastAction = () => {
    return ((new Date().getTime() * 10000) + 621355968000000000);

}

module.exports.getUsers = async (event, context) => {

    context.callbackWaitsForEmptyEventLoop = false;

    // var { username } = event

    // const mysql = require('serverless-mysql')(
    //     {
    //         config: dbConfig(context)
    //     })

    // let getUsers = 'call getUsers(?);';
    // let response = await mysql.query(getUsers, [username]);

    return {
        headers,
        statusCode: 200,
        "text": "hello 35646554"
    };
}


exports.getUserId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const mysql = require('serverless-mysql')(
        {
            config: dbConfig(context)
        })

    var { username } = event.path

    //Run your query
    let query = 'SELECT user.idUser, group.dbName, group.name, user.inUse, user.isApprover FROM user JOIN `group` ON user.idGroup = group.idGroup WHERE user.username=?;'
    let result = await mysql.query(query, [username])

    await mysql.end()
        .catch(e => { throw (e) })

    var idUser = result[0].idUser
    var dbName = result[0].dbName
    var groupName = result[0].name
    var inUse = result[0].inUse
    var isApprover = result[0].isApprover

    response = { ...response, idUser, dbName, groupName, inUse, isApprover }

    let updateUserData = 'UPDATE user SET lastAction=?, inUse = 1 where idUser = ? ;'

    await mysql.query(updateUserData, [lastAction, idUser])

    await mysql.end()
        .catch(e => { throw (e) })

    return {
        headers,
        statusCode: 200,
        response
    };
}

// exports.createUser = async (event, context, callback) => {

//     console.log("EVENT: ", event);

//     switch (event.triggerSource) {
//         case 'PostConfirmation_ConfirmForgotPassword':
//             console.log('PostConfirmation_ConfirmForgotPassword')
//             callback(null, event)
//             break;
//         case 'PreSignUp_AdminCreateUser':
//             console.log('PreSignUp_AdminCreateUser')

//             let { userName } = event
//             let { email } = event.request.userAttributes

//             context.callbackWaitsForEmptyEventLoop = false

//             //Run your query
//             let query = 'INSERT INTO user (username,email,idGroup) VALUES (?,?,1);'
//             let r = await mysql.query(query, [userName, email])
//                 .catch(e => { throw (e) })

//             // Run clean up function
//             // await mysql.end()

//             callback(null, event)
//             break;
//         default:
//             console.log('default')
//             callback(null, event)
//             break
//     }

// }

// exports.signout = async (event, context, callback) => {
//     context.callbackWaitsForEmptyEventLoop = false

//     let { idUser } = event.body

//     var response = "";

//     let signOutUser = 'UPDATE user SET inUse = 0 WHERE idUser = ?';

//     response = await mysql.query(signOutUser, [idUser])
//     await mysql.end()

//     console.log(event.path, response)

//     //Callback
//     callback(null, { statusCode: 200, body: response })
// }
