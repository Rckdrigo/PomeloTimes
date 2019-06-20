export function setIDToken(idToken, username, password) { return { type: 'SET_CREDENTIALS', idToken: idToken, username: username, password: password } }

export function setRememberMe(rememberMe) { return { type: 'REMEMBER_ME', rememberMe: rememberMe } }

export function setIDUser(idUser, dbName, companyName) { return { type: 'SET_ID_USER', idUser: idUser, dbName: dbName, companyName: companyName } }

export function changePage(currentPage) { return { type: 'CHANGE_PAGE', currentPage: currentPage } }