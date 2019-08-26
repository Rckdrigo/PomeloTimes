var initialState = {
    topArticles : [],
    isCategory: false
}

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOP_ARTICLES':
            //console.log(action)
            return {
                ...state,
                isCategory: action.isCategory,
                topArticles: action.topArticles
            };

        case 'SELECT_ARTICLE':
            //console.log(action)
            return {
                ...state,
                article: action.article
            }

        default:
            return state;
    }
}

export default articleReducer;
