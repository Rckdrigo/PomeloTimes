import AWS from 'aws-sdk'

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import poolData from '../config/config.json'

// import 'bootstrap/dist/css/bootstrap.min.css';

const userPool = new CognitoUserPool(poolData)

export const createUser = (username, email, password, phone_number, callback) => {
    var attributeList = [];

    var dataUsername = {
        Name: 'preferred_username',
        Value: username
    };

    var dataEmail = {
        Name: 'email',
        Value: email
    };

    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone_number
    };

    var attributeUsername = new CognitoUserAttribute(dataUsername);
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeUsername);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    // Username must be unique in a pool, and cant be a valid email format
    // To log in with email, make sure it is set as an alias attribute in Cognito
    // More info: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-usernames

    userPool.signUp(username, password, attributeList, null, callback)
}

export const verifyUser = (username, verifyCode, callback) => {
    const userData = {
        Username: username,
        Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(verifyCode, true, callback)
}

export const resendVerifyCode = (username, callback) => {
    const userData = {
        Username: username,
        Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode(callback)
}

export const authenticateUser = (username, password, callback) => {
    const authData = {
        Username: username,
        Password: password,
    }
    const authDetails = new AuthenticationDetails(authData)
    const userData = {
        Username: username,
        Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
            //   console.log('access token + ' + result.getAccessToken().getJwtToken())
            //   console.log('id token + ' + result.getIdToken().getJwtToken())
            callback(null, result)
        },
        onFailure: err => {
            callback(err)
        },
        newPasswordRequired: (userAttributes) => {
            console.log(cognitoUser)
            console.log("U:",userAttributes)
            callback(null,null,userAttributes,cognitoUser)
        }

    })
}

export const newPwd = (username,password,newPassword,userAttributes,cognitoUser,callback) => {
    console.log("userAttributes: ",userAttributes)

            console.log(userAttributes)
            delete userAttributes.email_verified;

            userAttributes.name = username;
            userAttributes.preferred_username = username;

            // userAttributes = { ...userAttributes, status: 'newPasswordRequired' }
            console.log(cognitoUser)
            console.log("username", username);
            console.log("password", password);
            console.log("newPassword", newPassword);
            console.log("userAttributes", userAttributes);

                cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
                    onSuccess: result => {
                        AWS.config.credentials.refresh(err => {
                            if (err) {
                                throw err
                            } else {
                                // do something
                                console.log("Success change password." , result)
                                callback(null,result)
                                
                            }
                        })
                    },
                    onFailure: err => {
                        console.log(err)
                        callback(null);
                        // throw err
                    }
                })
    }



// export const newPasswordRequired = (username, newPassword, userAttributes, callback) => {
//     const userData = {
//         Username: username,
//         Pool: userPool,
//     }
//     const cognitoUser = new CognitoUser(userData)

//     cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
//         onSuccess: result => {
//             AWS.config.credentials.refresh(err => {
//                 if (err) {
//                     throw err
//                 } else {
//                     // do something
//                     console.log(result)
//                 }
//             })
//         },
//         newPasswordRequired: (userAttributes, requiredAttributes) => {
//             delete userAttributes.email_verified
//             // phone number as well
//             cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this.newPasswordRequired)
//         },
//         onFailure: err => {
//             console.log(err)
//             // throw err
//         }
//     })
// }


export const forgotpassword = (username, callback) => {
    var userData = {
        Username: username,
        Pool: userPool,
    };
    var r = "";
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
        onSuccess: result => {
            console.log(result)
            r = result;
            callback(null, result,cognitoUser)
        },
        onFailure: err => {
            console.log(err)
            callback(err, null,cognitoUser)
        },
        inputVerificationCode() {
            callback(null, r,cognitoUser,this)
            // var verificationCode = prompt('Please input verification code ', '');
            // var newPassword = prompt('Enter new password ', '');

            // console.log("Checking:")
            // cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
}

export const requiredVerificationCode = (verificationCode,newPassword,cognitoUser,sth) =>{
    cognitoUser.confirmPassword(verificationCode, newPassword, sth);
}

export const signOut = () => {
    userPool.getCurrentUser().signOut()
    // window.location.reload()
}

export const getCurrentUser = (callback) => {
    const cognitoUser = userPool.getCurrentUser()
    if (!cognitoUser) return false;


    cognitoUser.getSession((err, session) => {
        if (err) {
            console.log(err)
            return
        }

        cognitoUser.getUserAttributes((err, attributes) => {
            if (err) return console.log(err);
            callback(attributes)
        })
    })
}
