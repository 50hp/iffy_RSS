const feed = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEED':
            return [...state, ...action.payload];
        default:
            return state;
    }
}; 

export default feed;
