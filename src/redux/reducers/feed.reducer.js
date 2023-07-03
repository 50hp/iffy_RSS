const feed = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEED':
            return [...state, ...action.payload];
        case 'RESET':
            return [];
        default:
            return state;
    }
}; 

export default feed;
