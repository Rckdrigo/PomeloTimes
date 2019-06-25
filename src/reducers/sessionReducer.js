var initialState = {
    username: '',
    idToken: '',
    password: '',
    rememberMe: '',
    userId: '',
    dbName: '',
    companyName: '',
    currentPage: '',
    productRoles: '',
    productName: '',
    roleName:'',
    allUsers:''

}

function sessionReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_CREDENTIALS':
            // console.log(action);
            state = {...state, idToken: action.idToken, username: action.username, password: action.password === null ? state.password : action.password}

            return state

        case 'REMEMBER_ME':
            // console.log(action);
            return {
                ...state,
                rememberMe: action.rememberMe
            }

        case 'SET_USER_INFO':
            console.log(action)
            return {
                ...state,
                productRoles: action.productRoles,
                productName: action.productName,
                roleName: action.roleName,
                allUsers: action.allUsers,
                userInformation: action.userInformation

            }     

        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }  

        default:
            return state
    }
}

export default sessionReducer;