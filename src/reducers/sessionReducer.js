var initialState = {
    username: '',
    idToken: '',
    password: '',
    rememberMe: '',
    userId: '',
    dbName: '',
    companyName: '',
    currentPage: ''
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

        case 'SET_ID_USER':
            console.log(action)
            return {
                ...state,
                idUser: action.idUser,
                dbName: action.dbName,
                companyName: action.companyName
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