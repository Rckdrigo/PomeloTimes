export function setIDToken(idToken, username, password) { return { type: 'SET_CREDENTIALS', idToken: idToken, username: username, password: password } }

export function setRememberMe(rememberMe) { return { type: 'REMEMBER_ME', rememberMe: rememberMe } }

export function setUserInfo(userInfo) { return { type: 'SET_USER_INFO', userInfo: userInfo } }

export function changePage(currentPage) { return { type: 'CHANGE_PAGE', currentPage: currentPage } }