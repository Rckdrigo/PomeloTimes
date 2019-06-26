export function setIDToken(idToken, username, password) { return { type: 'SET_CREDENTIALS', idToken: idToken, username: username, password: password } }

export function setRememberMe(rememberMe) { return { type: 'REMEMBER_ME', rememberMe: rememberMe } }

export function setUserInfo(productRoles, productName, roleName, allUsers, userInformation ) { return { type: 'SET_USER_INFO', productRoles: productRoles, productName:productName, roleName:roleName, allUsers: allUsers, userInformation: userInformation } }

export function changePage(currentPage) { return { type: 'CHANGE_PAGE', currentPage: currentPage } }
