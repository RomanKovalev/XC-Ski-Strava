const initialState = {
    totalStats: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOTAL_STATS_LOADED':
            return {
                totalStats: action.payload
            }
        default:
            return state
    }

}

export default reducer